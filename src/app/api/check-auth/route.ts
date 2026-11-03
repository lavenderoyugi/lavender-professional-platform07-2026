import { NextRequest, NextResponse } from "next/server";
import * as cookie from "cookie";
import { isValidAdminToken } from "@/lib/adminAuth";

export async function GET(request: NextRequest) {
  const cookies = cookie.parse(request.headers.get("cookie") || "");
  const authenticated = isValidAdminToken(cookies.authToken);
  return NextResponse.json({ authenticated }, { status: authenticated ? 200 : 401, headers: { "Cache-Control": "no-store" } });
}
