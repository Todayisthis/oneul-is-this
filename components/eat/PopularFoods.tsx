type PopularItem = {
  id: number;
  name: string;
  emoji: string;
  category: string;
  brand?: string;
  count: number;
};

type Props = {
  foods: PopularItem[];
};

export default function PopularFoods({ foods }: Props) {
  if (!foods?.length) return null;

  return (
    <div className="mt-6 rounded-2xl bg-white p-5">
      <p className="text-sm font-bold">🔥 인기 메뉴</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {foods.map((item, i) => (
          <div
            key={`${item.id}-${i}`}
            className="rounded-xl bg-yellow-50 px-3 py-2 text-sm"
          >
            {item.emoji} {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
