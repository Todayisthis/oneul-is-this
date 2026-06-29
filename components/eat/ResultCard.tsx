"use client";

import { useState } from "react";
import type { Food } from "@/data/foods";
import SharePopup from "./SharePopup";

type Props = {
  food: Food;
  message: string;
  rating: number | null;
  onRate: (score: number) => void;
  onRetry: () => void;
  onShare: () => void;
};

function FoodImage({ food }: { food: Food }) {
  return <div className="text-7xl">{food.emoji}</div>;
}

export default function ResultCard({
  food,
  message,
  rating,
  onRate,
  onRetry,
}: Props) {
  const [showShare, setShowShare] = useState(false);

  const ratingMessage =
    rating === null
      ? ""
      : rating >= 4
      ? "좋았어! 다음 추천에 참고할게요 😋"
      : rating === 3
      ? "무난했구나. 더 잘 골라볼게요 🤔"
      : "아쉬웠구나. 다음엔 더 맛있는 걸 추천해볼게요 🙏";

  function handleRate(score: number) {
    onRate(score);
    setShowShare(true);
  }

  function openMap() {
    const query = encodeURIComponent(`내 근처 ${food.name} 맛집`);
    const kakaoUrl = `https://map.kakao.com/?q=${query}`;
    const googleUrl = `https://www.google.com/maps/search/${query}`;
    const opened = window.open(kakaoUrl, "_blank");
    if (!opened) {
      window.open(googleUrl, "_blank");
    }
  }

  return (
    <>
      {showShare && (
        <SharePopup food={food} onClose={() => setShowShare(false)} />
      )}

      <div className="mt-6 w-full rounded-3xl bg-white p-8 text-center shadow-sm">
        <FoodImage food={food} />

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

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={openMap}
            className="flex flex-1 items-center justify-center gap-1 rounded-2xl bg-[#FEE500] py-3 text-sm font-bold text-[#191919] active:scale-95"
          >
            🗺 근처 식당 찾기
          </button>
          <button
            type="button"
            onClick={onRetry}
            className="flex-1 rounded-2xl bg-orange-500 py-3 text-sm font-bold text-white active:scale-95"
          >
            다시 뽑기
          </button>
        </div>

        <div className="mt-6">
          <p className="mb-3 text-sm font-bold text-gray-600">
            이 추천 어땠어? 별점 주면 친구에게 공유할 수 있어요!
          </p>

          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((score) => (
              <button
                key={score}
                type="button"
                onClick={() => handleRate(score)}
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
    </>
  );
}
