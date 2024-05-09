import { type Product } from "../types";


export const products: Product[] = [
    {
        id: 1,
        image: "coffeeImage",
        name: 'Espresso',
        price: 2.5,
        foodWarehouse: {
          coffeeBeans: '100g',
          milk: '50ml',
          water: '30ml',
        },
        additionalInformation: "Gluten free"
      },
      {
        id: 2,
        image: "pastryImage",
        name: 'Croissant',
        price: 1.8,
        foodWarehouse: {
            coffeeBeans: '100g',
            milk: '50ml',
            water: '30ml',
        },
      },

]