"use client";
import { Pizza } from "@/src/types/pizza";

// button that displays next to pizzas in the pizza menu, when clicked calls api/cart to add the pizza to the cart

async function addToCart(pizza: Pizza) {
  const pizzaJson = JSON.stringify(pizza);
  const res = await fetch("http://localhost:3000/api/cart", {
    method: "POST",
    body: pizzaJson,
  });

  if (!res.ok) {
    throw new Error("Failed to add to cart!");
  }

  const json = await res.json();
  return json.data;
}

export default function AddToCart({ pizza }: { pizza: Pizza }) {
  async function handleClick() {
    await addToCart(pizza);
  }
  return (
    <div>
      <button onClick={handleClick}>Add To Cart</button>
    </div>
  );
}
