import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

// Ensure middleware runs for api routes and pages needing authentication

export const config = {
  matcher: [
    "/api/(.*)",
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
