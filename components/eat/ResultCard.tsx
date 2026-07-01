"use client";

import { useState, useEffect } from "react";
import type { Food } from "@/data/foods";
import SharePopup from "./SharePopup";
import { getFoodDisplayEmoji } from "@/lib/foodEmoji";
import KakaoAd from "@/components/ads/KakaoAd";

type Props = {
  food: Food;
  message: string;
  rating: number | null;
  onRate: (score: number) => void;
  onRetry: () => void;
  onShare: () => void;
  onReview?: () => void;
};

function FoodImage({ food }: { food: Food }) {
  return <div className="text-7xl">{getFoodDisplayEmoji(food)}</div>;
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
      <div className="flex w-full max-w-sm flex-col items-center rounded-3xl bg-white p-6 shadow-xl">
        <div className="flex w-full items-center justify-between">
          <p className="text-sm font-bold text-gray-500">잠깐! 광고를 확인해주세요</p>
          <span className="text-sm text-gray-400">{count}초 후 공유 가능</span>
        </div>
        <div className="mt-4 flex items-center justify-center">
          <KakaoAd unitId="DAN-3qhuUl7cRaH3PTPF" width={300} height={250} />
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
  onReview,
}: Props) {
  const [showAd, setShowAd] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [comment, setComment] = useState("");
  const [commentSent, setCommentSent] = useState(() => {
    try {
      const stored = localStorage.getItem("feed_submitted");
      const arr = stored ? JSON.parse(stored) : [];
      return arr.includes(food.id);
    } catch { return false; }
  });
  const [commentError, setCommentError] = useState("");
  const [hoverRating, setHoverRating] = useState(0);

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
    if (!trimmed || commentSent) return;
    setCommentError("");
    try {
      const res = await fetch("/api/feeds/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ foodId: food.id, foodName: food.name, foodEmoji: food.emoji, comment: trimmed }),
      });
      const json = await res.json();
      if (!res.ok) { setCommentError(json.error ?? "등록 중 오류가 발생했어요."); return; }
      try {
        const stored = localStorage.getItem("feed_submitted");
        const arr = stored ? JSON.parse(stored) : [];
        localStorage.setItem("feed_submitted", JSON.stringify([...arr, food.id]));
      } catch {}
      setCommentSent(true);
    } catch {
      setCommentError("등록 중 오류가 발생했어요. 다시 시도해주세요.");
    }
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

      <div className="mt-6 w-full rounded-3xl border border-gray-700 bg-gray-800 p-8 text-center shadow-sm">
        <FoodImage food={food} />

        <p className="mt-4 text-xs font-bold uppercase tracking-widest text-orange-500">
          오늘의 추천 메뉴
        </p>

        <h2 className="mt-2 text-4xl font-black tracking-tight text-white">{food.name}</h2>

        <p className="mt-1 text-sm font-medium text-gray-400">
          {food.brand ? food.brand : food.category}
        </p>

        <p className="mt-5 rounded-2xl bg-gray-700 px-4 py-4 text-sm font-medium leading-relaxed text-gray-200">
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
          <div className="mb-3 rounded-xl bg-amber-500/10 px-3 py-2 text-center text-xs text-amber-400">
            💡 <strong>별점을 주시면 광고 없이 바로 공유</strong>할 수 있어요!
          </div>
          <p className="mb-3 text-sm font-bold text-gray-300">
            이 추천 어땠어?
          </p>

          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((score) => (
              <button
                key={score}
                type="button"
                onClick={() => rating === null && handleRate(score)}
                onMouseEnter={() => rating === null && setHoverRating(score)}
                onMouseLeave={() => rating === null && setHoverRating(0)}
                disabled={rating !== null}
                className={`text-3xl transition-transform hover:scale-110 disabled:cursor-default ${
                  score <= (hoverRating || rating || 0) ? "text-orange-400" : "text-gray-600"
                }`}
              >
                ★
              </button>
            ))}
          </div>

          {rating !== null && (
            <p className="mt-4 rounded-2xl bg-gray-700 px-4 py-3 text-sm font-bold text-gray-200">
              {ratingMessage}
            </p>
          )}
        </div>

        <div className="mt-5 border-t border-gray-700 pt-5">
          <p className="mb-2 text-sm font-bold text-white">📝 방명록 남기기</p>
          {commentSent ? (
            <p className="rounded-2xl bg-orange-50 py-3 text-sm font-bold text-orange-500">
              방명록이 등록됐어요! 🎉
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {commentError && (
                <p className="text-xs text-red-400">{commentError}</p>
              )}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") submitComment(); }}
                  maxLength={60}
                  placeholder="맛있었다, 별로였다... 자유롭게!"
                  className="flex-1 rounded-2xl border border-gray-600 bg-gray-700 px-4 py-2 text-sm text-white outline-none placeholder:text-gray-500 focus:border-orange-400"
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
            </div>
          )}
        </div>

        {onReview && (
          <div className="mt-3">
            <button
              type="button"
              onClick={onReview}
              className="w-full rounded-2xl bg-orange-500 py-3 text-sm font-bold text-white active:scale-95"
            >
              ✍️ 사용후기 남기기
            </button>
          </div>
        )}
      </div>
    </>
  );
}
