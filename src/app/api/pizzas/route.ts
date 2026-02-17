import { pizzaData } from "../../../db/pizzas";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.toLowerCase() || "";

  let filtered = pizzaData.pizzas;

  if (search) {
    filtered = filtered.filter(
      (pizza) =>
        pizza.name.toLowerCase().includes(search) ||
        pizza.ingredients.some((i) => i.toLowerCase().includes(search)),
    );
  }

  return NextResponse.json({
    data: {
      pizzas: filtered,
      pizzaSizes: pizzaData.pizzaSizes,
      pizzaToppings: pizzaData.pizzaToppings,
    },
  });
}
