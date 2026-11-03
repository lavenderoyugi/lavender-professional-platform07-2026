import { NextRequest, NextResponse } from "next/server";
import * as cookie from "cookie";
import { createAdminToken } from "@/lib/adminAuth";

export async function POST(request: NextRequest) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ message: "Invalid request" }, { status: 415 });
  }
  const length = Number(request.headers.get("content-length") || 0);
  if (length > 2048) return NextResponse.json({ message: "Request too large" }, { status: 413 });
  let body: { password?: unknown };
  try { body = await request.json(); } catch { return NextResponse.json({ message: "Invalid request" }, { status: 400 }); }
  const correctPassword = process.env.PAGE_ACCESS_PASSWORD;
  if (!correctPassword) return NextResponse.json({ message: "Admin login is not configured" }, { status: 500 });
  if (typeof body.password !== "string" || body.password.length > 256 || body.password !== correctPassword) {
    return NextResponse.json({ message: "Incorrect password" }, { status: 401 });
  }
  const response = NextResponse.json({ success: true });
  response.headers.set("Set-Cookie", cookie.serialize("authToken", createAdminToken(), {
    httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 3600, sameSite: "strict", path: "/",
  }));
  response.headers.set("Cache-Control", "no-store");
  return response;
}
