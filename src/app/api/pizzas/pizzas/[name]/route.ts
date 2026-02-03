import { pizzaData } from "../../../../../db/pizzas";

export async function GET(context: {
  params: {
    name: string;
  };
}) {
  const name = context.params.name;
  let filtered = pizzaData.pizzas;

  if (name) {
    filtered = filtered.filter((pizza) => pizza.name.toLowerCase() === name);
  }
  const data = { ...pizzaData, pizzas: filtered };

  return Response.json({ data });
}
