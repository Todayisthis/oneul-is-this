import type { Food } from "@/data/foods";

type Props = {
  foods: { food: Food; count: number }[];
};

export default function PopularFoods({ foods }: Props) {
  if (!foods.length) return null;

  return (
    <div className="mt-6 rounded-2xl bg-white p-5">
      <p className="text-sm font-bold">🔥 인기 메뉴</p>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {foods.map((item, i) => (
          <div key={item.food.id} className="rounded-xl bg-gray-50 p-3">
            <p className="text-xs text-orange-500">#{i + 1}</p>
            <p className="text-2xl">{item.food.emoji}</p>
            <p className="text-sm font-bold">{item.food.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}