import type { FoodCategory } from "./foods";

export const brands = [
  { name: "BBQ", category: "치킨" },
  { name: "bhc", category: "치킨" },
  { name: "교촌", category: "치킨" },
  { name: "굽네", category: "치킨" },

  { name: "맥도날드", category: "패스트푸드" },
  { name: "버거킹", category: "패스트푸드" },
  { name: "롯데리아", category: "패스트푸드" },
  { name: "맘스터치", category: "패스트푸드" },
  { name: "KFC", category: "패스트푸드" },
  { name: "프랭크버거", category: "패스트푸드" },
] as const satisfies readonly {
  name: string;
  category: FoodCategory;
}[];

export type Brand = (typeof brands)[number]["name"];

export function getBrandCategory(brandName?: "전체" | Brand) {
  if (!brandName || brandName === "전체") return null;

  return brands.find((brand) => brand.name === brandName)?.category ?? null;
}