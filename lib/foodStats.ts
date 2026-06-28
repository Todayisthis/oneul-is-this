import type { Food } from "@/data/foods";

export type RatingData = {
  totalScore: number;
  count: number;
};

export type PickData = {
  count: number;
};

const FOOD_RATINGS_KEY = "foodRatings";
const FOOD_PICKS_KEY = "foodPicks";
const FOOD_HISTORY_KEY = "foodHistory";
const HISTORY_LIMIT = 10;

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  const savedValue = localStorage.getItem(key);

  if (!savedValue) {
    return fallback;
  }

  return JSON.parse(savedValue) as T;
}

function writeStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(key, JSON.stringify(value));
}

export function getSavedRatings() {
  return readStorage<Record<string, RatingData>>(FOOD_RATINGS_KEY, {});
}

export function getSavedPicks() {
  return readStorage<Record<string, PickData>>(FOOD_PICKS_KEY, {});
}

export function saveFoodRating(food: Food, score: number) {
  const ratings = getSavedRatings();

  const current = ratings[food.id] ?? {
    totalScore: 0,
    count: 0,
  };

  ratings[food.id] = {
    totalScore: current.totalScore + score,
    count: current.count + 1,
  };

  writeStorage(FOOD_RATINGS_KEY, ratings);
}

export function saveFoodPick(food: Food) {
  const picks = getSavedPicks();
  const current = picks[food.id] ?? { count: 0 };

  picks[food.id] = {
    count: current.count + 1,
  };

  writeStorage(FOOD_PICKS_KEY, picks);
}

export function saveFoodHistory(food: Food) {
  const history = getFoodHistory();
  const nextHistory = [food, ...history].slice(0, HISTORY_LIMIT);

  writeStorage(FOOD_HISTORY_KEY, nextHistory);
}

export function getFoodHistory() {
  return readStorage<Food[]>(FOOD_HISTORY_KEY, []);
}

export function getFoodWeight(food: Food) {
  const ratings = getSavedRatings();
  const rating = ratings[food.id];

  if (!rating || rating.count === 0) {
    return 10;
  }

  const average = rating.totalScore / rating.count;

  return Math.max(3, Math.round(average * 4 + rating.count));
}

