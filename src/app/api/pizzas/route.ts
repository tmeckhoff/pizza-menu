import { pizzaData } from "../../../db/pizzas";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const search = searchParams.get("search")?.toLowerCase() || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = Math.min(
    parseInt(searchParams.get("pageSize") || "3", 10),
    20,
  );

  let filtered = pizzaData.pizzas;

  if (search) {
    filtered = filtered.filter(
      (pizza) =>
        pizza.name.toLowerCase().includes(search) ||
        pizza.ingredients.some((i) => i.toLowerCase().includes(search)),
    );
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / pageSize);

  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const paginated = filtered.slice(start, end);

  return Response.json({
    data: {
      pizzas: paginated,
      pizzaSizes: pizzaData.pizzaSizes,
      pizzaToppings: pizzaData.pizzaToppings,
    },
    pagination: {
      page,
      pageSize,
      total,
      totalPages,
    },
  });
}
