import { NextRequest, NextResponse } from "next/server";

const authPages = ["/login", "/reset-password", "/forgot-password", "/signup"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLogged = true;

  const isAuthRoute = authPages.includes(pathname);

  if (isLogged && (pathname === "/" || isAuthRoute)) {
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  if (!isLogged && pathname.startsWith("/dashboard")) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
};
