import { pizzaData } from "../../../../db/pizzas";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { name: string } },
) {
  const reqParams = await params;
  const name = reqParams.name.toLowerCase();
  let filtered = pizzaData.pizzas;

  if (name) {
    filtered = filtered.filter((pizza) => pizza.name.toLowerCase() === name);
  }

  return NextResponse.json({
    data: {
      pizzas: filtered,
      pizzaSizes: pizzaData.pizzaSizes,
      pizzaToppings: pizzaData.pizzaToppings,
    },
  });
}
