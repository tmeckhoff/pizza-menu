import { pizzaData } from "../../../db/pizzas";
import { NextResponse } from "next/server";

export async function GET() {
  const data = pizzaData;

  return NextResponse.json({ data });
}
