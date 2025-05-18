import NextAuth from "next-auth";
import authOptions from "./auth.options";
import { authRoutes, DEFAULT_URL_REDIRECT, setupRoutes } from "./routes";
import { checkConfig } from "./helpers/checkconfig";
import { getToken } from "./helpers/getToken";

const { auth } = NextAuth(authOptions);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth
  const isAuthRoutes = authRoutes.includes(nextUrl.pathname);
  const isSetupRoutes = setupRoutes.includes(nextUrl.pathname);
  
  if (isSetupRoutes) {
    return null;
  }

  if (isAuthRoutes) {
    if (isLoggedIn)
      return Response.redirect(new URL(DEFAULT_URL_REDIRECT, nextUrl));
    return null;
  }

  if (!isLoggedIn) return Response.redirect(new URL("/auth/login", nextUrl));


  return null;

});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};


