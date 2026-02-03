import { pizzaData } from "../../../../../db/pizzas";

interface RouteContext {
  params: {
    name: string;
  };
}

export async function GET(context: RouteContext) {
  const name = context.params.name;
  let filtered = pizzaData.pizzas;

  if (name) {
    filtered = filtered.filter((pizza) =>
      pizza.name.toLowerCase().includes(name),
    );
  }

  const data = pizzaData;

  return Response.json({ data });
}
