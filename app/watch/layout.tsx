import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "오늘 뭐 보지? | 넷플릭스 영화·드라마 랜덤 추천",
  description: "넷플릭스 뭐 볼지 고민될 때! 장르별 랜덤 추천으로 오늘 볼 영화나 드라마를 골라드려요. IMDB 7점 이상 작품만 추천.",
  keywords: [
    "오늘 뭐 보지", "넷플릭스 추천", "넷플릭스 뭐볼까", "오늘 볼만한 영화",
    "넷플릭스 영화 추천", "넷플릭스 드라마 추천", "랜덤 영화 추천", "IMDB 7점 이상",
  ],
  openGraph: {
    title: "오늘 뭐 보지? | 넷플릭스 영화·드라마 랜덤 추천",
    description: "넷플릭스 뭐 볼지 고민될 때! 장르별 랜덤 추천으로 오늘 볼 작품을 골라드려요.",
    url: "https://oneul-is-this.com/watch",
  },
  alternates: {
    canonical: "https://oneul-is-this.com/watch",
  },
};

export default function WatchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
