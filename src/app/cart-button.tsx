"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

// button when clicked will display cart component

interface CartResponse {
  itemCount: number;
}

export default function CartButton() {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    let mounted = true;

    const refreshCount = async () => {
      const res = await fetch("/api/cart");
      const json: CartResponse = await res.json();
      if (mounted) {
        setItemCount(json.itemCount ?? 0);
      }
    };

    refreshCount();
    window.addEventListener("cart-updated", refreshCount);

    return () => {
      mounted = false;
      window.removeEventListener("cart-updated", refreshCount);
    };
  }, []);

  return (
    <Link
      href={"/cart"}
      className="inline-flex items-center gap-2 rounded border border-slate-300 px-4 py-2"
    >
      <span>Cart</span>
      <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-white">
        {itemCount}
      </span>
    </Link>
  );
}
