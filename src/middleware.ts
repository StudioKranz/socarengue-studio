import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const studioHosts = new Set(["socarengue.studio", "www.socarengue.studio"]);

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0].toLowerCase();

  if (request.nextUrl.pathname === "/" && host && studioHosts.has(host)) {
    const url = request.nextUrl.clone();
    url.pathname = "/studio";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
