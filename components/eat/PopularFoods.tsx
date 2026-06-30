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
          intervalMs={2500}
          items={topPicked.map((item, i) => ({
            id: item.id,
            rank: i + 1,
            label: item.name,
            sub: `${item.count}회 추천됨`,
            emoji: item.emoji,
          }))}
        />
      )}
      {topRated.length > 0 && (
        <RankCarousel
          title="⭐ 이번주 인기있는 메뉴"
          intervalMs={2500}
          items={topRated.map((item, i) => ({
            id: item.id,
            rank: i + 1,
            label: item.name,
            sub: item.avgRating
              ? `⭐ ${item.avgRating}점 (${item.ratingCount ?? 0}명)`
              : "",
            emoji: item.emoji,
          }))}
        />
      )}
    </div>
  );
}
