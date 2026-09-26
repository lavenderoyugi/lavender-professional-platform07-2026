import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const privateRoutes = [
  "/finds",
  "/cart",
  "/checkout",
  "/payment",
  "/order-success",
];

export default function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Remove the locale prefix:
  // /en/finds → /finds
  // /fr/cart → /cart
  const pathnameWithoutLocale = pathname.replace(
    new RegExp(`^/(${routing.locales.join("|")})(?=/|$)`),
    ""
  ) || "/";

  // Keep the LavenderFinds code in the repository,
  // but make its public routes unavailable.
  const isPrivateRoute = privateRoutes.some(
    (route) =>
      pathnameWithoutLocale === route ||
      pathnameWithoutLocale.startsWith(`${route}/`)
  );

  if (isPrivateRoute) {
    return new NextResponse(null, { status: 404 });
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/((?!api|_next|_vercel|.*\\..*).*)"],
};