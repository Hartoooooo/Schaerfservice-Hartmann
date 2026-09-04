import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isEnglishPath = pathname === "/en" || pathname.startsWith("/en/");

  if (isEnglishPath) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
    const response = NextResponse.rewrite(url);
    response.cookies.set("site-language", "en", { path: "/", sameSite: "lax" });
    return response;
  }

  const languagePreference = request.cookies.get("site-language")?.value;
  if (languagePreference === "de") return NextResponse.next();

  const country =
    request.headers.get("x-vercel-ip-country") ??
    request.headers.get("cf-ipcountry");
  const hasForeignCountry = country !== null && country !== "DE" && country !== "XX";
  const useEnglish = languagePreference === "en" || hasForeignCountry;
  if (!useEnglish) return NextResponse.next();

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = pathname === "/" ? "/en" : `/en${pathname}`;
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
