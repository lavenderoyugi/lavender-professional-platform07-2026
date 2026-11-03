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
  const { data, error } = await db.from("products").select("*");
  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  const rows = data || [];
  const stats = {
    products: rows.length,
    draft: rows.filter(p => p.status === "Draft").length,
    available: rows.reduce((s,p) => s + Number(p.stock ?? 0), 0),
    reserved: rows.reduce((s,p) => s + Number(p.reserved_quantity ?? 0), 0),
    sold: rows.reduce((s,p) => s + Number(p.sold_quantity ?? 0), 0),
    inventoryInvestment: rows.filter(p => ["Draft","Available","Reserved"].includes(p.status)).reduce((s,p) => s + (Number(p.stock ?? 0)-Number(p.reserved_quantity ?? 0))*Number(p.purchase_price ?? 0),0),
    unsoldInventory: rows.filter(p => ["Draft","Available","Reserved"].includes(p.status)).reduce((s,p) => s + (Number(p.stock ?? 0)-Number(p.reserved_quantity ?? 0))*Number(p.purchase_price ?? 0),0),
    potentialRevenue: rows.filter(p => ["Available","Reserved"].includes(p.status)).reduce((s,p) => s + (Number(p.stock ?? 0)-Number(p.reserved_quantity ?? 0))*Number(p.listing_price ?? 0),0),
    actualRevenue: rows.filter(p => p.status === "Sold").reduce((s,p) => s + Number(p.selling_price || 0),0),
    netProfit: rows.filter(p => p.status === "Sold").reduce((s,p) => s + Number(p.selling_price || 0)-Number(p.purchase_price || 0),0),
  };
  return NextResponse.json({ stats }, { headers: { "Cache-Control": "no-store" } });
}