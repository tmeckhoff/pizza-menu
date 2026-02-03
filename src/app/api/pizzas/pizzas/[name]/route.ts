import { pizzaData } from "../../../../../db/pizzas";

export async function GET(context: {
  params: {
    name: string;
  };
}) {
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
