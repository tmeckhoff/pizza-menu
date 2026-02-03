import { pizzaData } from "../../../db/pizzas";

export async function GET() {

  const data = pizzaData;

  return Response.json({ data });
}