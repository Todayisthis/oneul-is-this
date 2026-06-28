import type { PopularItem } from "@/lib/firebaseStats";

type Props = {
  topPicked: PopularItem[];
  topRated: PopularItem[];
};

export default function PopularFoods({ topPicked, topRated }: Props) {
  if (!topPicked?.length && !topRated?.length) return null;

  return (
    <div className="mt-6 flex flex-col gap-4">
      {topPicked.length > 0 && (
        <div className="rounded-2xl bg-white p-5">
          <p className="text-sm font-bold">🔥 이번주 많이 나온 메뉴 Top 5</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {topPicked.map((item, i) => (
              <div
                key={`picked-${item.id}-${i}`}
                className="rounded-xl bg-yellow-50 px-3 py-2 text-sm"
              >
                {item.emoji} {item.name}{" "}
                <span className="text-gray-400">({item.count}회)</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {topRated.length > 0 && (
        <div className="rounded-2xl bg-white p-5">
          <p className="text-sm font-bold">⭐ 이번주 인기있는 메뉴 Top 5</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {topRated.map((item, i) => (
              <div
                key={`rated-${item.id}-${i}`}
                className="rounded-xl bg-orange-50 px-3 py-2 text-sm"
              >
                {item.emoji} {item.name}{" "}
                <span className="text-yellow-500">⭐{item.avgRating}</span>
                {item.ratingCount && (
                  <span className="ml-1 text-gray-400">({item.ratingCount}명)</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
