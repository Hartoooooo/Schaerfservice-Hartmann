import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isEnglishPath = pathname === "/en" || pathname.startsWith("/en/");

  if (isEnglishPath) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
    const response = NextResponse.rewrite(url);
    response.headers.set("Content-Language", "en");
    response.headers.set("X-Robots-Tag", "noindex, follow");
    return response;
  }

  const response = NextResponse.next();
  response.headers.set("Content-Language", "de");
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
