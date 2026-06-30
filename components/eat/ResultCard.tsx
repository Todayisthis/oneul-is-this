"use client";

import { useState, useEffect } from "react";
import type { Food } from "@/data/foods";
import SharePopup from "./SharePopup";
import { saveFeedComment } from "@/lib/firebaseStats";

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

function AdInterstitial({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count <= 0) { onDone(); return; }
    const t = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count, onDone]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-gray-500">잠깐! 광고를 확인해주세요</p>
          <span className="text-sm text-gray-400">{count}초 후 공유 가능</span>
        </div>
        <div className="mt-4 flex min-h-[200px] items-center justify-center rounded-2xl bg-gray-100 text-sm text-gray-400">
          광고 영역
        </div>
        <button
          type="button"
          disabled={count > 0}
          onClick={onDone}
          className="mt-4 w-full rounded-2xl bg-orange-500 py-3 text-sm font-bold text-white disabled:opacity-40"
        >
          {count > 0 ? `${count}초 기다려주세요...` : "공유하기 →"}
        </button>
      </div>
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
  const [showAd, setShowAd] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [comment, setComment] = useState("");
  const [commentSent, setCommentSent] = useState(false);

  function openShare() {
    if (rating !== null) {
      setShowShare(true); // 별점 있으면 광고 스킵
    } else {
      setShowAd(true);
    }
  }

  function onAdDone() {
    setShowAd(false);
    setShowShare(true);
  }

  async function submitComment() {
    const trimmed = comment.trim();
    if (!trimmed) return;
    await saveFeedComment({
      foodId: food.id,
      foodName: food.name,
      foodEmoji: food.emoji,
      comment: trimmed,
    });
    setCommentSent(true);
  }

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
    // 별점 주면 광고 없이 바로 공유 팝업
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
      {showAd && <AdInterstitial onDone={onAdDone} />}
      {showShare && (
        <SharePopup food={food} onClose={() => setShowShare(false)} />
      )}

      <div className="mt-6 w-full rounded-3xl border border-gray-800 bg-gray-900 p-8 text-center shadow-sm md:border-none md:bg-white">
        <FoodImage food={food} />

        <p className="mt-4 text-xs font-bold uppercase tracking-widest text-orange-500">
          오늘의 추천 메뉴
        </p>

        <h2 className="mt-2 text-4xl font-black tracking-tight text-white md:text-gray-900">{food.name}</h2>

        <p className="mt-1 text-sm font-medium text-gray-400 md:text-gray-500">
          {food.brand ? food.brand : food.category}
        </p>

        <p className="mt-5 rounded-2xl bg-orange-50 px-4 py-4 text-sm font-medium leading-relaxed text-gray-700">
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


        <button
          type="button"
          onClick={openShare}
          className="mt-3 w-full rounded-2xl border border-orange-200 py-3 text-sm font-bold text-orange-500 active:scale-95"
        >
          📤 친구에게 공유하기
        </button>

        <div className="mt-6">
          <div className="mb-3 rounded-xl bg-amber-50 px-3 py-2 text-center text-xs text-amber-700">
            💡 <strong>별점을 주시면 광고 없이 바로 공유</strong>할 수 있어요!
          </div>
          <p className="mb-3 text-sm font-bold text-gray-300 md:text-gray-600">
            이 추천 어땠어?
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
                    : "bg-gray-800 text-gray-300 md:bg-gray-100 md:text-gray-500"
                }`}
              >
                ⭐
              </button>
            ))}
          </div>

          {rating !== null && (
            <p className="mt-4 rounded-2xl bg-gray-800 px-4 py-3 text-sm font-bold text-gray-200 md:bg-gray-50 md:text-gray-600">
              {ratingMessage}
            </p>
          )}
        </div>

        <div className="mt-5 border-t border-gray-800 pt-5 md:border-gray-100">
          <p className="mb-2 text-sm font-bold text-white md:text-gray-700">💬 한줄 후기 남기기</p>
          {commentSent ? (
            <p className="rounded-2xl bg-orange-50 py-3 text-sm font-bold text-orange-500">
              후기가 등록됐어요! 🎉
            </p>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") submitComment(); }}
                maxLength={60}
                placeholder="맛있었다, 별로였다... 자유롭게!"
                className="flex-1 rounded-2xl border border-gray-200 px-4 py-2 text-sm outline-none focus:border-orange-400"
              />
              <button
                type="button"
                onClick={submitComment}
                disabled={!comment.trim()}
                className="rounded-2xl bg-orange-500 px-4 py-2 text-sm font-bold text-white disabled:opacity-40 active:scale-95"
              >
                등록
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
