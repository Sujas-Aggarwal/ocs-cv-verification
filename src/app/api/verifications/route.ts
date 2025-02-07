import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { cookies } from "next/headers";
import { sendVerificationEmail } from "@/utils/mailsender";

export async function GET() {
  try {
    prisma.$connect();
    let user = "";
    try {
      const cookieStore = await cookies();
      user = cookieStore.get("user_cookie")?.value || "";
      if (!user) {
        return NextResponse.json(
          {
            message: "User Not Logged In",
          },
          { status: 404 }
        );
      }
    } catch (e) {
      console.log(e);
      return NextResponse.json(
        {
          message: "Internal Server Error",
        },
        { status: 500 }
      );
    }
    const requester = await prisma.user.findFirst({
      where: { name: user },
    });
    if (!requester) {
      return NextResponse.json(
        { message: "Requester not found" },
        { status: 404 }
      );
    }
    const requests = await prisma.verification.findMany({
      where: {
        requesterId: requester.id,
      },
    });
    return NextResponse.json(requests);
  } finally {
    prisma.$disconnect();
  }
}

export async function POST(req: NextRequest) {
  try {
    // Connect to the database
    await prisma.$connect();
    const cookieStore = await cookies();
    // Extract user identifier from cookies
    const userCookie = cookieStore.get("user_cookie");
    if (!userCookie) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Fetch the requester user based on cookie (assuming name is unique)
    const requester = await prisma.user.findFirst({
      where: { name: userCookie.value },
    });

    if (!requester) {
      return NextResponse.json(
        { message: "Requester not found" },
        { status: 404 }
      );
    }

    // Parse request body
    const { requestedTo, request } = await req.json();

    if (!requestedTo || !request) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create verification request
    const verification = await prisma.verification.create({
      data: {
        requesterId: requester.id,
        requestedTo,
        request,
      },
    });
    sendVerificationEmail(
      requestedTo,
      userCookie.value,
      request,
      verification.id
    );
    return NextResponse.json({ message: "Success", verification });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Some error occurred" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
