import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("artisan_token")?.value
  const { pathname } = request.nextUrl

  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  if (!token && pathname.startsWith("/artisan/")) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  if (!token && pathname.startsWith("/bookings/")) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/artisan/dashboard",
    "/artisan/:path*",
    "/bookings/:path*",
  ],
}
