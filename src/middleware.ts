import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getCurrentUser } from "./service/authServices";
import { protectedRoutes } from "./constant";

const authRoutes = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = await getCurrentUser(); // Fetch the current user
  
  // If no user is authenticated
  if (!user) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next(); // Allow access to login and register
    }
    // Redirect unauthenticated users to register, preserving their intended path
    return NextResponse.redirect(
      new URL(`/register?redirect=${pathname}`, request.url),
    );
  }

  // If the user is authenticated and has a role of 'admin'
  if (user.role === "admin") {
    // Admin can access all routes
    return NextResponse.next();
  } else {
    // If the user is not an admin (i.e., has a 'user' or other role), restrict access to admin pages
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/", request.url)); // Redirect non-admin users away from admin pages
    }

    // Allow non-admin users to access other protected routes
    if (protectedRoutes.includes(pathname)) {
      return NextResponse.next(); // Let authenticated non-admins access protected routes like /profile or /mypost
    }
  }

  // Default behavior for all other cases
  return NextResponse.next();
}

// See "Matching Paths" below
export const config = {
  matcher: [
    "/admin/:path*", // Match admin paths
    "/profile",
    "/",
    "/mypost",
    "/login",
    "/register",
    "/add-friends",
    "/my-favorite-posts",
  ],
};
