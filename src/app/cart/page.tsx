import { Pizza } from "@/src/types/pizza";

async function getCart() {
  const res = await fetch("http://localhost:3000/api/cart");

  if (!res.ok) {
    throw new Error("Failed to fetch cart!");
  }

  const json = await res.json();
  return json.data;
}

export default async function Cart({}: {}) {
  const cart: Pizza[] = await getCart();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cart.map((pizza) => (
        <div
          key={pizza.name}
          className="border border-slate-200 rounded-lg p-5 shadow-sm hover:shadow-md transition"
        >
          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            {pizza.name}
          </h3>

          <div className="flex flex-wrap gap-2">
            {pizza.ingredients.map((ingredient) => (
              <span
                key={ingredient}
                className="bg-slate-100 text-slate-700 text-sm px-3 py-1 rounded-full"
              >
                {ingredient}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
