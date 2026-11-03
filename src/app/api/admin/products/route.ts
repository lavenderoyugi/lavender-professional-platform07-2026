import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import * as cookie from "cookie";
import { isValidAdminToken } from "@/lib/adminAuth";

export async function GET(request: NextRequest) {
  const cookies = cookie.parse(request.headers.get("cookie") || "");
  if (!isValidAdminToken(cookies.authToken)) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ message: "Missing server database configuration" }, { status: 500 });
  const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await db.from("products").select("*").order("created_at", { ascending: false });
  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json({ products: data || [] }, { headers: { "Cache-Control": "no-store" } });
}