import type { Brand } from "@/data/brands";
import type { Food } from "@/data/foods";

export type RecommendMode = "smart" | "excludeRecent" | "popular" | "random";

export type RecommendFilters = {
  brand?: "전체" | Brand;
};

type RecommendFoodParams = {
  foods: Food[];
  mode?: RecommendMode;
  filters?: RecommendFilters;
};

function applyFilters(foods: Food[], filters?: RecommendFilters): Food[] {
  if (!filters) return foods;

  return foods.filter((food) => {
    if (filters.brand && filters.brand !== "전체") {
      return food.brand === filters.brand;
    }

    return true;
  });
}

function getRandomFood(foods: Food[]): Food | null {
  if (foods.length === 0) return null;
  return foods[Math.floor(Math.random() * foods.length)] ?? null;
}

export function recommendFood({
  foods,
  mode = "random",
  filters,
}: RecommendFoodParams): Food | null {
  const filteredFoods = applyFilters(foods, filters);

  if (filteredFoods.length === 0) {
    return getRandomFood(foods);
  }

  return getRandomFood(filteredFoods);
}