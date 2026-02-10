import { NextResponse, NextRequest } from "next/server";
import { cart } from "../../../db/cart";

export async function POST(request: NextRequest) {
  const json = await request.json();
  cart.push(json);
  return NextResponse.json({ status: "ok" });
}

export async function GET() {
  return NextResponse.json({ data: cart });
}
