import type { Food } from "@/data/foods";

type Props = {
  foods: {
    food?: Food;
    count?: number;
    avgRating?: number;
  }[];
};

export default function PopularFoods({ foods }: Props) {
  if (!foods?.length) return null;

  return (
    <div className="mt-6 rounded-2xl bg-white p-5">
      <p className="text-sm font-bold">🔥 인기 메뉴</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {foods.map((item, i) => {
          if (!item?.food) return null;

          return (
            <div
              key={`${item.food.id}-${i}`}
              className="rounded-xl bg-yellow-50 px-3 py-2 text-sm"
            >
              {item.food.emoji} {item.food.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}