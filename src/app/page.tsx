import PizzaMenu from "./pizza-menu";
import CartButton from "../app/cart-button";

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
        <h1 className="text-2xl mb-20">Tara's Pizzas</h1>
      </div>
      <div className="flex w-full items-center justify-between">
        <h2 className="text-2xl mb-6 text-slate-800">Menu</h2>
      </div>
      <div className="flex w-full items-center justify-between">
        <CartButton />
      </div>
      <PizzaMenu pizzaData={pizzaData} />
    </main>
  );
}
