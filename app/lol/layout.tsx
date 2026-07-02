import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "오늘 뭐 픽하지? | 롤 챔피언 랜덤 추천",
  description: "리그 오브 레전드 챔피언을 랜덤으로 추천해드려요. 탑, 정글, 미드, 원딜, 서폿 라인별로 오늘의 챔피언을 뽑아보세요!",
  keywords: ["롤 챔피언 추천", "롤 랜덤 픽", "리그오브레전드 챔피언", "오늘 뭐 픽하지", "챔피언 랜덤"],
  openGraph: {
    title: "오늘 뭐 픽하지? | 롤 챔피언 랜덤 추천",
    description: "라인별 롤 챔피언 랜덤 추천 서비스.",
    url: "https://oneul-is-this.com/lol",
  },
  alternates: {
    canonical: "https://oneul-is-this.com/lol",
  },
};

export default function LolLayout({ children }: { children: React.ReactNode }) {
  return children;
}
