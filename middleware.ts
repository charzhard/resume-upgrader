import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    /*
     * Protect all routes except the ones listed below:
     */
    "/((?!.*\\..*|_next).*)",
    "/",
    "/api/upgrade",
    "/sign-in",
    "/sign-up",
    "/about",
    "/features",
    "/pricing",
    "/contact",
    "/grievance",
  ],
};
