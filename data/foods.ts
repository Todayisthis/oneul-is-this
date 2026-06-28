import { soupFoods } from "./foods/soup";
import { riceFoods } from "./foods/rice";
import { noodleFoods } from "./foods/noodle";
import { snackFoods } from "./foods/snack";
import { meatFoods } from "./foods/meat";
import { chickenFoods } from "./foods/chicken";
import { pizzaFoods } from "./foods/pizza";
import { fastfoodFoods } from "./foods/fastfood";

import type { Brand } from "./brands";
import type { FoodSubCategory } from "./foodSubCategories";

export type Cuisine = "한식" | "중식" | "일식" | "양식" | "기타";

export type FoodCategory =
  | "국물"
  | "밥"
  | "면"
  | "고기"
  | "분식"
  | "치킨"
  | "피자"
  | "패스트푸드";

export type Food = {
  id: number;

  name: string;
  brand?: Brand;
  emoji: string;

  category: FoodCategory;
  subCategory: FoodSubCategory;
  cuisine: Cuisine;

  price: number;
  spicy: 0 | 1 | 2 | 3;

  tags: string[];
  situations?: string[];

  eatAlone: boolean;
  delivery: boolean;
  franchise?: boolean;

  isPopular?: boolean;

  message: string;
};

export const foods: Food[] = [
  ...soupFoods,
  ...riceFoods,
  ...noodleFoods,
  ...snackFoods,
   ...meatFoods,
  ...chickenFoods,
  ...pizzaFoods,
  ...fastfoodFoods,
];

export const foodCategories: ("전체" | FoodCategory)[] = [
  "전체",
  "국물",
  "밥",
  "면",
  "고기",
  "분식",
  "치킨",
  "피자",
  "패스트푸드",

];

export const cuisines: Cuisine[] = ["한식", "중식", "일식", "양식", "기타"];