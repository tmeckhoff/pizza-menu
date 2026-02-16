"use client";

import { CartItem } from "@/src/types/cart-item";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

interface CartResponse {
  data: CartItem[];
  subtotal: number;
  itemCount: number;
}

async function fetchCart() {
  const response = await fetch("/api/cart");
  if (!response.ok) {
    throw new Error("Failed to fetch cart.");
  }

  return (await response.json()) as CartResponse;
}

async function updateQuantity(pizzaName: string, quantity: number) {
  const response = await fetch("/api/cart", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pizzaName, quantity }),
  });

  if (!response.ok) {
    throw new Error("Failed to update cart item.");
  }

  return (await response.json()) as CartResponse;
}

async function removeItem(pizzaName: string) {
  const response = await fetch("/api/cart", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pizzaName }),
  });

  if (!response.ok) {
    throw new Error("Failed to remove cart item.");
  }

  return (await response.json()) as CartResponse;
}

async function clearCart() {
  const response = await fetch("/api/cart", {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to clear cart.");
  }

  return (await response.json()) as CartResponse;
}

export default function CartClient() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [itemCount, setItemCount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  function applyCart(response: CartResponse) {
    setItems(response.data);
    setItemCount(response.itemCount);
    setSubtotal(response.subtotal);
    window.dispatchEvent(new Event("cart-updated"));
  }

  async function runUpdate(
    updater: () => Promise<CartResponse>,
  ): Promise<void> {
    setIsUpdating(true);
    try {
      applyCart(await updater());
    } finally {
      setIsUpdating(false);
    }
  }

  useEffect(() => {
    let mounted = true;
    fetchCart()
      .then((response) => {
        if (mounted) {
          applyCart(response);
        }
      })
      .finally(() => {
        if (mounted) {
          setIsLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const tax = useMemo(() => subtotal * 0.08, [subtotal]);
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);

  if (isLoading) {
    return <div className="m-6 text-slate-700">Loading cart...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="m-6 space-y-4">
        <h1 className="text-2xl font-semibold text-slate-900">Your Cart</h1>
        <p className="text-slate-700">Your cart is empty.</p>
        <Link href="/" className="text-blue-700 underline">
          Back to menu
        </Link>
      </div>
    );
  }

  return (
    <main className="m-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Your Cart</h1>
        <button
          onClick={() => runUpdate(() => clearCart())}
          disabled={isUpdating}
          className="rounded border border-slate-300 px-3 py-2 text-sm text-slate-700"
        >
          Clear cart
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.pizza.name}
            className="rounded-lg border border-slate-200 p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-slate-900">
                  {item.pizza.name}
                </h2>
                <p className="text-sm text-slate-700">
                  ${item.pizza.price.toFixed(2)} each
                </p>
              </div>
              <button
                onClick={() => runUpdate(() => removeItem(item.pizza.name))}
                disabled={isUpdating}
                className="text-sm text-red-700 underline"
              >
                Remove
              </button>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    runUpdate(() =>
                      updateQuantity(item.pizza.name, item.quantity - 1),
                    )
                  }
                  disabled={isUpdating}
                  className="h-8 w-8 rounded border border-slate-300"
                >
                  -
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() =>
                    runUpdate(() =>
                      updateQuantity(item.pizza.name, item.quantity + 1),
                    )
                  }
                  disabled={isUpdating}
                  className="h-8 w-8 rounded border border-slate-300"
                >
                  +
                </button>
              </div>
              <p className="font-medium text-slate-900">
                ${(item.quantity * item.pizza.price).toFixed(2)}
              </p>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {item.pizza.ingredients.map((ingredient) => (
                <span
                  key={ingredient}
                  className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-slate-300 bg-slate-50 p-4">
        <div className="flex justify-between text-slate-800">
          <span>Items</span>
          <span>{itemCount}</span>
        </div>
        <div className="mt-2 flex justify-between text-slate-800">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="mt-2 flex justify-between text-slate-800">
          <span>Tax (8%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="mt-3 flex justify-between border-t border-slate-300 pt-3 text-lg font-semibold text-slate-900">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </main>
  );
}
