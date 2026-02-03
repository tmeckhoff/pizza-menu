import PizzaMenu from "./pizza-menu";

async function getPizzas() {
  const res = await fetch("http://localhost:3000/api/pizzas");

  if (!res.ok) {
    throw new Error("Failed to fetch pizzas!");
  }

  const json = await res.json();
  return json.data;
}

export default async function Home() {
  const pizzaData = await getPizzas();
  return (
    <main className="m-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl mb-20">My Pizzas</h1>
      </div>
      <PizzaMenu pizzaData={pizzaData} />
    </main>
  );
}
