import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const publicPaths = ["/", "/auth/signin", "/auth/signup"];
  const isPublicPath = publicPaths.includes(path);

  // Get the session token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Redirect logic
  if (!token && !isPublicPath) {
    // Redirect to signin if trying to access a protected route without being authenticated
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  if (token && (path === "/auth/signin" || path === "/auth/signup")) {
    // Redirect to home if already authenticated and trying to access auth pages
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: ["/", "/todos/:path*", "/auth/:path*"],
};
