import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
export async function POST(req: NextRequest) {
  prisma.$connect();
  try {
    let user = { name: "", password: "", contactInfo: "" };
    try {
      user = await req.json();
      const alreadyUser = await prisma.user.findFirst({
        where: {
          name: user.name,
        },
      });
      if (alreadyUser) {
        return NextResponse.json(
          { message: "User name Already Exists" },
          { status: 400 }
        );
      }
      const matchedUser = await prisma.user.create({
        data: user,
      });
      if (matchedUser) {
        console.log(matchedUser);
      }
    } catch (e) {
      console.error(e);
      return NextResponse.json(
        { message: "Some Error Occured" },
        { status: 500 }
      );
    }
    return NextResponse.json({
      message: "Success",
    });
  } finally {
    await prisma.$disconnect();
  }
}
