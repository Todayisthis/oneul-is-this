import type { Food } from "@/data/foods";

type Props = {
  history: Food[];
};

export default function FoodHistory({ history }: Props) {
  if (!history.length) return null;

  return (
    <div className="mt-6 rounded-2xl bg-white p-5">
      <p className="text-sm font-bold">🕘 최근 메뉴</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {history.map((food, i) => (
          <span
            key={food.id + i}
            className="rounded-full bg-gray-100 px-3 py-1 text-sm"
          >
            {food.emoji} {food.name}
          </span>
        ))}
      </div>
    </div>
  );
}