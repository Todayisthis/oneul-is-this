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
  const [imgFailed, setImgFailed] = useState(false);

  const src =
    food.imageUrl ||
    `https://source.unsplash.com/400x400/?${encodeURIComponent(food.name)},food,korean`;

  if (imgFailed) {
    return <div className="text-7xl">{food.emoji}</div>;
  }

  return (
    <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-2xl">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={food.name}
        className="h-full w-full object-cover"
        onError={() => setImgFailed(true)}
      />
    </div>
  );
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
    if (!navigator.geolocation) {
      window.open(`https://map.kakao.com/?q=${query}`, "_blank");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        window.open(
          `https://www.google.com/maps/search/${query}/@${lat},${lng},15z`,
          "_blank"
        );
      },
      () => {
        // 위치 거부 시 카카오맵 일반 검색
        window.open(`https://map.kakao.com/?q=${query}`, "_blank");
      }
    );
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
