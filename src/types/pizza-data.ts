import { Pizza } from "../types/pizza";
import { PizzaSize } from "../types/pizza-size";

export interface PizzaData {
  pizzas: Pizza[];
  pizzaSizes: PizzaSize[];
  pizzaToppings: string[];
}
