import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { toast } from "react-toastify";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/resume/:path*"],
};
