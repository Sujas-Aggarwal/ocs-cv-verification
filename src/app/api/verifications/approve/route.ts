import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(req: NextRequest) {
  try {
    // Connect to the database
    await prisma.$connect();

    // Extract the verification ID from query parameters
    const url = new URL(req.url);
    const id = url.searchParams.get("verificationId");

    if (!id) {
      return NextResponse.json(
        { message: "No verification ID found" },
        { status: 400 }
      );
    }

    const verificationId = parseInt(id, 10);
    if (isNaN(verificationId)) {
      return NextResponse.json(
        { message: "Invalid verification ID" },
        { status: 400 }
      );
    }

    // Update verification status to 'ACCEPTED'
    const verification = await prisma.verification.update({
      where: { id: verificationId },
      data: { status: "ACCEPTED" },
    });

    return NextResponse.json({ message: "Verification approved successfully", verification });
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
