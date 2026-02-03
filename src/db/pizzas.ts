const pizzaData = {
  pizzas: [
    {
      name: "Carnivore",
      ingredients: ["bacon", "sausage", "pepperoni", "hamburger"],
    },
    {
      name: "Supreme",
      ingredients: [
        "mushrooms",
        "sausage",
        "pepperoni",
        "onions",
        "green peppers",
        "green olives",
      ],
    },
    {
      name: "BBQ Chicken",
      ingredients: ["bacon", "chicken", "onions", "tomatoes", "BBQ sauce"],
    },
    {
      name: "Veggie",
      ingredients: [
        "mushrooms",
        "green peppers",
        "onions",
        "green olives",
        "black olives",
      ],
    },
    {
      name: "Artichoke Deluxe",
      ingredients: ["artichokes", "tomatoes", "green olives", "spinach"],
    },
    {
      name: "Chicken Alfredo",
      ingredients: ["chicken", "onions", "tomatoes", "alfredo sauce"],
    },
  ],
  pizzaSizes: [
    {
      name: "10 inch",
      servings: "1",
      prices: [
        { name: "House Combos", price: 15.48 },
        { name: "Cheese", price: 11.03 },
        { name: "Additional Toppings", price: 1.38 },
      ],
    },
    {
      name: "12 inch",
      servings: "2",
      prices: [
        { name: "House Combos", price: 21.06 },
        { name: "Cheese", price: 14.37 },
        { name: "Additional Toppings", price: 2.11 },
      ],
    },
    {
      name: "14 inch",
      servings: "3",
      prices: [
        { name: "House Combos", price: 25.52 },
        { name: "Cheese", price: 16.6 },
        { name: "Additional Toppings", price: 3.22 },
      ],
    },
    {
      name: "16 inch",
      servings: "4",
      prices: [
        { name: "House Combos", price: 28.86 },
        { name: "Cheese", price: 18.83 },
        { name: "Additional Toppings", price: 3.22 },
      ],
    },
  ],
  pizzaToppings: [
    "bacon",
    "sausage",
    "pepperoni",
    "cheddar cheese",
    "tomatoes",
    "goat cheese",
    "anchovies",
    "green olives",
    "black olives",
    "fresh spinach",
    "artichoke",
    "pesto sauce",
    "fresh basil",
    "jalapenos",
  ],
};

export { pizzaData };
