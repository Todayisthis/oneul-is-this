import type { Food } from "@/data/foods";
import type { PickData, RatingData } from "@/lib/foodStats";

export type RecommendMode = "random" | "smart" | "excludeRecent" | "popular";

type RecommendFoodParams = {
  foods: Food[];
  ratings: Record<string, RatingData>;
  picks: Record<string, PickData>;
  history: Food[];
  mode: RecommendMode;
};

function pickRandomFood(foods: Food[]) {
  const randomIndex = Math.floor(Math.random() * foods.length);
  return foods[randomIndex];
}

function weightedPick(items: { food: Food; weight: number }[]) {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  let random = Math.random() * totalWeight;

  for (const item of items) {
    random -= item.weight;

    if (random <= 0) {
      return item.food;
    }
  }

  return items[items.length - 1].food;
}

function getRatingScore(food: Food, ratings: Record<string, RatingData>) {
  const rating = ratings[food.id];

  if (!rating || rating.count === 0) {
    return 0;
  }

  const average = rating.totalScore / rating.count;

  return average * 3 + rating.count;
}

function getPopularityScore(food: Food, picks: Record<string, PickData>) {
  const pick = picks[food.id];

  if (!pick) {
    return 0;
  }

  return pick.count * 2;
}

function getRecentPenalty(food: Food, history: Food[]) {
  const isRecent = history.some((historyFood) => historyFood.id === food.id);

  return isRecent ? 8 : 0;
}

export function recommendFood({
  foods,
  ratings,
  picks,
  history,
  mode,
}: RecommendFoodParams) {
  if (foods.length === 0) {
    return null;
  }

  if (mode === "random") {
    return pickRandomFood(foods);
  }

  if (mode === "excludeRecent") {
    const recentIds = new Set(history.map((food) => food.id));
    const availableFoods = foods.filter((food) => !recentIds.has(food.id));

    return pickRandomFood(availableFoods.length > 0 ? availableFoods : foods);
  }

  const weightedFoods = foods.map((food) => {
    let weight = 10;

    if (mode === "smart") {
      weight += getRatingScore(food, ratings);
      weight += getPopularityScore(food, picks);
      weight -= getRecentPenalty(food, history);
    }

    if (mode === "popular") {
      weight += getPopularityScore(food, picks) * 2;
      weight += getRatingScore(food, ratings);
    }

    return {
      food,
      weight: Math.max(1, Math.round(weight)),
    };
  });

  return weightedPick(weightedFoods);
}