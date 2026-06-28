import type { PopularItem } from "@/lib/firebaseStats";

type Props = {
  foods: PopularItem[];
};

export default function PopularFoods({ foods }: Props) {
  if (!foods?.length) return null;

  return (
    <div className="mt-6 rounded-2xl bg-white p-5">
      <p className="text-sm font-bold">🔥 이번주 많이 나온 메뉴 Top 5</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {foods.map((item, i) => (
          <div
            key={`${item.id}-${i}`}
            className="rounded-xl bg-yellow-50 px-3 py-2 text-sm"
          >
            {item.emoji} {item.name}{" "}
            <span className="text-gray-400">({item.count}회)</span>
            {item.avgRating !== undefined && (
              <span className="ml-1 text-yellow-500">⭐{item.avgRating}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
