import type { Food } from "@/data/foods";

export default function FoodHistory({ history }: { history: Food[] }) {
  if (!history?.length) return null;

  return (
    <div className="mt-4 rounded-2xl bg-white p-5 shadow-sm">
      <p className="text-sm font-bold text-gray-800">🕘 최근 메뉴</p>
      <div className="mt-3 flex flex-col gap-2">
        {history.map((food, i) => (
          <span key={`${food.id}-${i}`} className="text-sm text-gray-700">
            {food.emoji} {food.name}
          </span>
        ))}
      </div>
    </div>
  );
}
