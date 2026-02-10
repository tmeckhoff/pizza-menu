"use client";
import { useState } from "react";
import Link from "next/link";

// button when clicked will display cart component

export default function CartButton({}: {}) {
  return (
    <div>
      <button>
        <Link href={"/cart"}>Cart</Link>
      </button>
    </div>
  );
}
