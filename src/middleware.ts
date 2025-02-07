import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

function _getUserName(user: string) {
  // let i = 0;
  // for (; i < user.length; i++) {
  //   if (user[i] == "&") break;
  // }
  // let userLength = parseInt(user.substring(0, i)) ?? 0;
  // let userName = user.substring(i + 1, i + userLength + 1);
  // return userName;
  return user;
}

export async function middleware(request: NextRequest) {
  // const cookies = request.headers.get("cookie");
  const url = request.nextUrl.clone();
  if (url.pathname=="/" || url.pathname.includes("auth") || url.pathname.includes("static") ){
    return NextResponse.next();
  }
  const cookieStore = await cookies();
  const user_cookie = cookieStore.get("user_cookie");
  if (!user_cookie || !user_cookie.value) {
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }
  const user_name = _getUserName(user_cookie.value);
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!^$|^auth/|^api/auth/).*)"],
};
