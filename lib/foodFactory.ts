import type { Brand } from "@/data/brands";
import type { Cuisine, Food, FoodCategory } from "@/data/foods";
import type { FoodSubCategory } from "@/data/foodSubCategories";
import { categoryEmoji } from "@/lib/foodEmoji";

type CreateFoodParams = {
  id: number;
  name: string;

  category: FoodCategory;
  subCategory: FoodSubCategory;
  cuisine: Cuisine;

  price: number;
  spicy: 0 | 1 | 2 | 3;

  tags: string[];
  situations?: string[];

  message: string;

  emoji?: string;
  brand?: Brand;
  isPopular?: boolean;

  eatAlone?: boolean;
  delivery?: boolean;
};

export function createFood(params: CreateFoodParams): Food {
  return {
    id: params.id,
    name: params.name,
    brand: params.brand,

    emoji: params.emoji ?? categoryEmoji[params.category],

    category: params.category,
    subCategory: params.subCategory,
    cuisine: params.cuisine,

    price: params.price,
    spicy: params.spicy,

    tags: params.tags,
    situations: params.situations,

    eatAlone: params.eatAlone ?? true,
    delivery: params.delivery ?? true,

    isPopular: params.isPopular,

    message: params.message,
  };
}