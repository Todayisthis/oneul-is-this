import type { Food } from "@/data/foods";

type Props = {
  food: Food;
  message: string;
  rating: number | null;
  onRate: (score: number) => void;
};

export default function ResultCard({
  food,
  message,
  rating,
  onRate,
}: Props) {
  return (
    <div className="mt-6 animate-[fadeIn_0.5s_ease-out]">
      <p className="text-sm font-bold text-gray-500">오늘은</p>

      <h2 className="mt-2 text-4xl font-black text-gray-900">
        {food.name}
      </h2>

      <p className="mt-2 text-2xl font-black text-orange-500">
        이거다!
      </p>

      <p className="mt-5 text-gray-700">{message}</p>

      <div className="mt-6 grid grid-cols-3 gap-2 text-sm">
        <div className="rounded-2xl bg-orange-50 p-3 text-center">
          <p className="text-xs text-gray-400">가격</p>
          <p className="font-bold">{food.price.toLocaleString()}원</p>
        </div>

        <div className="rounded-2xl bg-orange-50 p-3 text-center">
          <p className="text-xs text-gray-400">맵기</p>
          <p className="font-bold">
            {"🌶️".repeat(food.spicy) || "없음"}
          </p>
        </div>

        <div className="rounded-2xl bg-orange-50 p-3 text-center">
          <p className="text-xs text-gray-400">분류</p>
          <p className="font-bold">{food.subCategory}</p>
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {food.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-gray-100 px-3 py-1 text-sm"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-7 text-center">
        <p className="text-sm font-bold">마음에 드나요?</p>

        <div className="mt-2 flex justify-center gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              onClick={() => onRate(s)}
              className={`text-3xl ${
                rating && s <= rating ? "opacity-100" : "opacity-40"
              }`}
            >
              ⭐
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}