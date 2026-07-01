import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    const session = req.cookies.get("admin_session")?.value;
    if (session !== "1") {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/admin";
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
