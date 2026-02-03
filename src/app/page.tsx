import PizzaMenu from "./pizza-menu";
import { Suspense } from "react";

async function getPizzas() {
  const res = await fetch("http://localhost:3000/api/pizzas");

  if (!res.ok) {
    throw new Error("Failed to fetch pizzas!");
  }

  const json = await res.json();
  return json.data;
}

function Loading() {
  return (
    <div className="w-full text-center mt-20 text-lg text-slate-600">
      Loading pizzas…
    </div>
  );
}

async function PizzasSection() {
  const pizzaData = await getPizzas();
  return <PizzaMenu pizzaData={pizzaData} />;
}

export default async function Home() {
  return (
    <main className="m-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl mb-20">My Pizzas</h1>
      </div>
      <Suspense fallback={<Loading />}>
        <PizzasSection />
      </Suspense>
    </main>
  );
}
