import Link from "next/link";
import PizzaMenu from "./pizza-menu";

async function getPizzas(searchParams: {
  [key: string]: string | string[] | undefined;
}) {
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (typeof value === "string") {
      params.set(key, value);
    }
  });

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
  searchParams: { search?: string; page?: string };
}) {
  const resolvedSearchParams = await searchParams;

  const result = await getPizzas(resolvedSearchParams);

  const currentPage = Number(resolvedSearchParams.page || 1);
  const search = resolvedSearchParams.search || "";

  return (
    <main className="m-6 space-y-8">
      <h1 className="text-2xl">My Pizzas</h1>
      <form className="flex gap-2">
        <input
          type="text"
          name="search"
          defaultValue={search}
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

      <PizzaMenu pizzaData={result.data} />
      <div className="flex gap-4 items-center">
        {currentPage > 1 && (
          <Link
            href={`?search=${search}&page=${currentPage - 1}`}
            className="text-blue-600"
          >
            Previous
          </Link>
        )}

        <span>
          Page {result.pagination.page} of {result.pagination.totalPages}
        </span>

        {currentPage < result.pagination.totalPages && (
          <Link
            href={`?search=${search}&page=${currentPage + 1}`}
            className="text-blue-600"
          >
            Next
          </Link>
        )}
      </div>
    </main>
  );
}
