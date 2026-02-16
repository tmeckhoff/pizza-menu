import PizzaMenu from "./pizza-menu";
import CartButton from "../app/cart-button";

async function getPizzas(searchParams: { search?: string }) {
  const params = new URLSearchParams();

  if (typeof searchParams.search === "string") {
    params.set("search", searchParams.search);
  }

  const res = await fetch(
    `http://localhost:3000/api/pizzas?${params.toString()}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch pizzas!");
  }

  return res.json();
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search } = await searchParams;
  const result = await getPizzas({ search });

  return (
    <main className="m-6 space-y-8">
      <h1 className="text-2xl">Tara&apos;s Pizzas</h1>
      <form className="flex gap-2">
        <input
          type="text"
          name="search"
          defaultValue={search || ""}
          placeholder="Search pizzas..."
          className="border px-3 py-2 rounded w-64"
        />
        <button
          type="submit"
          className="bg-slate-800 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </form>
      <div className="flex w-full items-center justify-between">
        <h2 className="text-2xl mb-6 text-slate-800">Menu</h2>
      </div>
      <div className="flex w-full items-center justify-between">
        <CartButton />
      </div>
      <PizzaMenu pizzaData={result.data} />
    </main>
  );
}
