import type { PopularItem } from "@/lib/firebaseStats";

type Props = {
  topPicked: PopularItem[];
  topRated: PopularItem[];
};

const rankColors = ["text-yellow-500", "text-gray-400", "text-orange-400", "text-gray-300", "text-gray-300"];
const rankLabels = ["1st", "2nd", "3rd", "4th", "5th"];

export default function PopularFoods({ topPicked, topRated }: Props) {
  if (!topPicked?.length && !topRated?.length) return null;

  return (
    <div className="flex flex-col gap-4 mt-6">
      {topPicked.length > 0 && (
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm font-bold mb-4">🔥 이번주 많이 나온 메뉴</p>
          <ol className="flex flex-col gap-3">
            {topPicked.map((item, i) => (
              <li key={`picked-${item.id}-${i}`} className="flex items-center gap-3">
                <span className={`w-8 text-center text-xs font-bold ${rankColors[i]}`}>
                  {rankLabels[i]}
                </span>
                <span className="text-xl">{item.emoji}</span>
                <span className="flex-1 text-sm font-medium">{item.name}</span>
                <span className="text-xs text-gray-400 tabular-nums">{item.count}회</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {topRated.length > 0 && (
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm font-bold mb-4">⭐ 이번주 인기있는 메뉴</p>
          <ol className="flex flex-col gap-3">
            {topRated.map((item, i) => (
              <li key={`rated-${item.id}-${i}`} className="flex items-center gap-3">
                <span className={`w-8 text-center text-xs font-bold ${rankColors[i]}`}>
                  {rankLabels[i]}
                </span>
                <span className="text-xl">{item.emoji}</span>
                <span className="flex-1 text-sm font-medium">{item.name}</span>
                <span className="text-xs font-bold text-yellow-500 tabular-nums">
                  ⭐{item.avgRating}
                  {item.ratingCount && (
                    <span className="ml-1 font-normal text-gray-400">({item.ratingCount}명)</span>
                  )}
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
