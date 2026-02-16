"use client";
import { Pizza } from "@/src/types/pizza";
import { useState } from "react";

// button that displays next to pizzas in the pizza menu, when clicked calls api/cart to add the pizza to the cart

async function addToCart(pizza: Pizza) {
  const res = await fetch("/api/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pizza,
      quantity: 1,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to add to cart!");
  }

  const json = await res.json();
  return json.data;
}

export default function AddToCart({ pizza }: { pizza: Pizza }) {
  const [isAdding, setIsAdding] = useState(false);
  const [didAdd, setDidAdd] = useState(false);

  async function handleClick() {
    try {
      setIsAdding(true);
      setDidAdd(false);
      await addToCart(pizza);
      window.dispatchEvent(new Event("cart-updated"));
      setDidAdd(true);
      setTimeout(() => setDidAdd(false), 1200);
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <div className="mt-4">
      <button
        onClick={handleClick}
        disabled={isAdding}
        className="rounded bg-slate-800 px-3 py-2 text-sm text-white disabled:opacity-50"
      >
        {isAdding ? "Adding..." : "Add To Cart"}
      </button>
      {didAdd && <span className="ml-2 text-sm text-green-700">Added</span>}
    </div>
  );
}
