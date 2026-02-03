import { pizzaData } from "../../../../../db/pizzas";
import { PizzaData } from "../../../../../types/pizza-data";

export async function GET(request, { params }) {
  const name = params.name;
  let filtered = pizzaData;

  if (name) {
    filtered = pizzaData.filter((x: PizzaData) =>
      x.pizzas.map((p) => {
        p.name.toLowerCase() === name;
      }),
    );
  }

  const data = pizzaData;

  return Response.json({ data });
}
