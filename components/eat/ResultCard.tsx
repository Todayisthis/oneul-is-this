import type { Food } from "@/data/foods";

type Props = {
  food: Food;
  message: string;
  rating: number | null;
  onRate: (score: number) => void;
  onRetry: () => void;
  onShare: () => void;
};

export default function ResultCard({
  food,
  message,
  rating,
  onRate,
  onRetry,
  onShare,
}: Props) {
  const ratingMessage =
    rating === null
      ? ""
      : rating >= 4
      ? "좋았어! 다음 추천에 참고할게요 😋"
      : rating === 3
      ? "무난했구나. 더 잘 골라볼게요 🤔"
      : "아쉬웠구나. 다음엔 더 맛있는 걸 추천해볼게요 🙏";

  return (
    <div className="mt-6 w-full rounded-3xl bg-white p-8 text-center shadow-sm">
      <div className="text-7xl">{food.emoji}</div>

      <p className="mt-4 text-sm font-bold text-orange-500">
        오늘의 추천 메뉴
      </p>

      <h2 className="mt-2 text-4xl font-bold">{food.name}</h2>

      <p className="mt-2 text-gray-500">
        {food.brand ? food.brand : food.category}
      </p>

      <p className="mt-6 rounded-2xl bg-orange-50 px-4 py-3 text-gray-700">
        {message}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={onRetry}
          className="rounded-2xl bg-orange-500 px-3 py-3 text-sm font-bold text-white active:scale-95"
        >
          다시 뽑기
        </button>

        <button
          type="button"
          onClick={onShare}
          className="rounded-2xl bg-gray-100 px-3 py-3 text-sm font-bold text-gray-600 active:scale-95"
        >
          🔗 공유하기
        </button>
      </div>

      <div className="mt-6">
        <p className="mb-3 text-sm font-bold text-gray-600">
          이 추천 어땠어?
        </p>

        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((score) => (
            <button
              key={score}
              type="button"
              onClick={() => onRate(score)}
              className={`rounded-full px-3 py-2 text-lg ${
                rating === score
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              ⭐
            </button>
          ))}
        </div>

        {rating !== null && (
          <p className="mt-4 rounded-2xl bg-gray-50 px-4 py-3 text-sm font-bold text-gray-600">
            {ratingMessage}
          </p>
        )}
      </div>
    </div>
  );
}