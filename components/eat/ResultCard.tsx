import type { Food } from "@/data/foods";

type Props = {
  food: Food;
  message: string;
  rating: number | null;
  onRate: (score: number) => void;
};

export default function ResultCard({ food, message, rating, onRate }: Props) {
  return (
    <div className="mt-6 w-full rounded-3xl bg-white p-6 text-center shadow-sm">
      <p className="text-sm font-bold text-gray-500">오늘은</p>

      <h2 className="mt-2 text-4xl font-black text-gray-900">
        {food.emoji} {food.name}
      </h2>

      <p className="mt-2 text-2xl font-black text-orange-500">이거다!</p>

      <p className="mt-5 text-base leading-7 text-gray-700">
        {message}
      </p>

      <div className="mt-6 grid grid-cols-3 gap-2 text-sm">
        <div className="rounded-2xl bg-orange-50 p-3">
          <p className="text-xs text-gray-400">가격</p>
          <p className="mt-1 font-extrabold text-gray-800">
            {food.price.toLocaleString()}원
          </p>
        </div>

        <div className="rounded-2xl bg-orange-50 p-3">
          <p className="text-xs text-gray-400">맵기</p>
          <p className="mt-1 font-extrabold text-gray-800">
            {"🌶️".repeat(food.spicy) || "없음"}
          </p>
        </div>

        <div className="rounded-2xl bg-orange-50 p-3">
          <p className="text-xs text-gray-400">분류</p>
          <p className="mt-1 font-extrabold text-gray-800">
            {food.subCategory}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {food.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-500"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-7 rounded-3xl bg-gray-50 p-5">
        <p className="text-sm font-bold text-gray-700">
          이 메뉴 선정, 마음에 드나요?
        </p>

        <div className="mt-3 flex justify-center gap-1">
          {[1, 2, 3, 4, 5].map((score) => (
            <div
              key={score}
              role="button"
              tabIndex={0}
              onPointerUp={() => onRate(score)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onRate(score);
                }
              }}
              className={`cursor-pointer select-none text-3xl transition active:scale-90 ${
                rating && score <= rating ? "opacity-100" : "opacity-35"
              }`}
              style={{
                WebkitTapHighlightColor: "transparent",
                touchAction: "manipulation",
              }}
            >
              ⭐
            </div>
          ))}
        </div>

        {rating !== null && (
          <p className="mt-3 text-sm font-bold text-orange-500">
            평가 고마워요! 다음 추천에 반영할게요.
          </p>
        )}
      </div>
    </div>
  );
}