"use client";

import { Pizza } from "../types/pizza";
import { PizzaSize } from "../types/pizza-size";

interface PizzaData {
  pizzas: Pizza[];
  pizzaSizes: PizzaSize[];
  pizzaToppings: string[];
}

export default function PizzaMenu({ pizzaData }: { pizzaData: PizzaData }) {
  return (
    <div className="w-full h-full overflow-y-auto bg-white shadow-md rounded-lg border border-slate-300 p-8 space-y-12">
      <section>
        <h2 className="text-2xl font-bold mb-6 text-slate-800">Pizza Menu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pizzaData.pizzas.map((pizza) => (
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
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-6 text-slate-800">
          Available Sizes
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {pizzaData.pizzaSizes.map((size) => (
            <div
              key={size.name}
              className="border border-slate-200 rounded-lg p-4 text-center bg-slate-50"
            >
              <div className="font-semibold text-slate-950">{size.name}</div>
              <div className="text-sm text-slate-800">
                Serves {size.servings}
              </div>
              <div>
                {size.prices.map((p) => (
                  <div key={p.name} className="text-sm text-slate-600">
                    {p.name}: {`$${p.price}`}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-6 text-slate-800">
          Extra Toppings
        </h2>

        <div className="flex flex-wrap gap-3">
          {pizzaData.pizzaToppings.map((topping) => (
            <span
              key={topping}
              className="bg-green-100 text-green-800 text-sm px-4 py-2 rounded-full font-medium"
            >
              {topping}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
