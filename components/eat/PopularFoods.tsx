"use client";

import type { PopularItem } from "@/lib/firebaseStats";
import RankCarousel from "@/components/ui/RankCarousel";

type Props = {
  topPicked: PopularItem[];
  topRated: PopularItem[];
};

export default function PopularFoods({ topPicked, topRated }: Props) {
  if (!topPicked?.length && !topRated?.length) return null;

  return (
    <div className="flex flex-col gap-4 mt-6">
      {topPicked.length > 0 && (
        <RankCarousel
          title="🔥 이번주 많이 나온 메뉴"
                    items={topPicked.map((item, i) => ({
            id: item.id,
            rank: i + 1,
            label: item.name,
            score: `🔥 ${item.count}`,
            scoreLabel: "추천",
          }))}
        />
      )}
      {topRated.length > 0 && (
        <RankCarousel
          title="⭐ 이번주 인기있는 메뉴"
                    items={topRated.map((item, i) => ({
            id: item.id,
            rank: i + 1,
            label: item.name,
            score: `⭐ ${item.avgRating}`,
            scoreLabel: `${item.ratingCount ?? 0}명 평가`,
          }))}
        />
      )}
    </div>
  );
}
