import type { Food, FoodCategory } from "@/data/foods";

export const categoryEmoji: Record<FoodCategory, string> = {
  국물: "🍲",
  밥: "🍚",
  면: "🍜",
  고기: "🥩",
  분식: "🥟",
  치킨: "🍗",
  피자: "🍕",
  패스트푸드: "🍔",
  양식: "🍽️",
  샐러드: "🥗",
  샌드위치: "🥪",
};

// 카테고리 우선순위: 국물 > 밥 > 면 > 치킨 > 고기 > 나머지
const CATEGORY_PRIORITY: FoodCategory[] = ["국물", "밥", "면", "치킨", "고기", "분식", "피자", "패스트푸드", "양식", "샐러드", "샌드위치"];

export function getFoodDisplayEmoji(food: Food): string {
  const allCategories: FoodCategory[] = [food.category, ...(food.additionalCategories ?? [])];
  for (const cat of CATEGORY_PRIORITY) {
    if (allCategories.includes(cat)) return categoryEmoji[cat];
  }
  return food.emoji;
}