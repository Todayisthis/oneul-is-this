import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "오늘 뭐 먹지? | 음식 메뉴 랜덤 추천",
  description: "점심, 저녁 뭐 먹을지 고민될 때! 카테고리별 랜덤 음식 추천. 한식, 중식, 일식, 양식 등 다양한 메뉴를 랜덤으로 추천해드려요.",
  keywords: [
    "오늘 뭐 먹지", "점심 메뉴 추천", "저녁 메뉴 추천", "랜덤 음식 추천",
    "뭐 먹을까", "오늘의 메뉴", "한식 추천", "중식 추천", "음식 랜덤",
  ],
  openGraph: {
    title: "오늘 뭐 먹지? | 음식 메뉴 랜덤 추천",
    description: "점심, 저녁 뭐 먹을지 고민될 때! 랜덤으로 오늘의 메뉴를 추천해드려요.",
    url: "https://oneul-is-this.com/eat",
  },
  alternates: {
    canonical: "https://oneul-is-this.com/eat",
  },
};

export default function EatLayout({ children }: { children: React.ReactNode }) {
  return children;
}
