import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const userRole = request.cookies.get('userRole')?.value;

  if (userRole === "Admin") {
    // If the user is an admin, allow access to the "/dashboard" route
    return NextResponse.next();
  } else {
    // If the user is not an admin, redirect to the "/auth/login" route
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  // Apply the middleware to all routes under "/dashboard"
  matcher: ["/dashboard/:path*"],
};
