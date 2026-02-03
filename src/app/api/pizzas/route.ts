import { pizzaData } from "../../../db/pizzas";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  let filtered = pizzaData.pizzas;

  if (name) {
    filtered = filtered.filter((pizza) => pizza.name.toLowerCase() === name);
  }
  const data = filtered;

  return Response.json({ data });
}
