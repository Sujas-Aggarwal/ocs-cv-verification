import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { cookies } from "next/headers";
export async function POST(req: NextRequest) {
  prisma.$connect();
  try {
    let user = { name: "", password: "" };
    try {
      user = await req.json();
      const matchedUser = await prisma.user.findFirst({
        where: {
          name: user.name,
          password: user.password,
        },
      });
      console.log(matchedUser);
      if (!matchedUser) {
        return NextResponse.json(
          { message: "Invalid Credential or User don't Exist" },
          { status: 401 }
        );
      }
    } catch (e) {
      console.error(e);
      return NextResponse.json(
        { message: "Some Error Occured" },
        { status: 500 }
      );
    }
    const cookieStore = await cookies();
    cookieStore.set("user_cookie", user.name);
    return NextResponse.json({
      message: "Success",
    });
  } finally {
    await prisma.$disconnect();
  }
}
