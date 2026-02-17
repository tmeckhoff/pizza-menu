import { NextResponse, NextRequest } from "next/server";
import { cart } from "../../../db/cart";
import { Pizza } from "@/src/types/pizza";

function buildCartResponse() {
  const subtotal = cart.reduce(
    (total, item) => total + item.pizza.price * item.quantity,
    0,
  );
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return {
    data: cart,
    subtotal,
    itemCount,
  };
}

export async function POST(request: NextRequest) {
  const json = await request.json();
  const pizza = json.pizza as Pizza | undefined;
  const quantity = Number(json.quantity ?? 1);

  if (!pizza || !pizza.name || !Array.isArray(pizza.ingredients)) {
    return NextResponse.json(
      { error: "Invalid pizza payload." },
      { status: 400 },
    );
  }

  if (!Number.isFinite(quantity) || quantity <= 0) {
    return NextResponse.json(
      { error: "Quantity must be greater than 0." },
      { status: 400 },
    );
  }

  const existing = cart.find((item) => item.pizza.name === pizza.name);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      pizza,
      quantity,
    });
  }

  return NextResponse.json(buildCartResponse());
}

export async function PATCH(request: NextRequest) {
  const json = await request.json();
  const pizzaName = json.pizzaName as string | undefined;
  const quantity = Number(json.quantity);

  if (!pizzaName || !Number.isFinite(quantity)) {
    return NextResponse.json(
      { error: "pizzaName and quantity are required." },
      { status: 400 },
    );
  }

  const item = cart.find((entry) => entry.pizza.name === pizzaName);

  if (!item) {
    return NextResponse.json({ error: "Item not found." }, { status: 404 });
  }

  if (quantity <= 0) {
    const index = cart.findIndex((entry) => entry.pizza.name === pizzaName);
    cart.splice(index, 1);
  } else {
    item.quantity = quantity;
  }

  return NextResponse.json(buildCartResponse());
}

export async function DELETE(request: NextRequest) {
  let pizzaName: string | undefined;

  try {
    const json = await request.json();
    pizzaName = json?.pizzaName;
  } catch {
    // No body means clear cart.
  }

  if (pizzaName) {
    const index = cart.findIndex((entry) => entry.pizza.name === pizzaName);
    if (index >= 0) {
      cart.splice(index, 1);
    }
  } else {
    cart.length = 0;
  }

  return NextResponse.json(buildCartResponse());
}

export async function GET() {
  return NextResponse.json(buildCartResponse());
}
