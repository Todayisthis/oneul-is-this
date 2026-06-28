"use client";

import type { Food } from "@/data/foods";

type Props = {
  food: Food;
  onClose: () => void;
};

export default function SharePopup({ food, onClose }: Props) {
  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/eat?food=${food.id}`
      : "";

  const text = `오늘 뭐 먹지? ${food.emoji} ${food.name} 어때요?`;

  async function nativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title: "오늘 뭐 먹지?", text, url });
      } catch {
        // 사용자가 취소한 경우
      }
    } else {
      copyLink();
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      alert("링크가 복사됐어요! 🔗");
    } catch {
      alert(url);
    }
  }

  function shareTwitter() {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      "_blank"
    );
  }

  const hasNativeShare =
    typeof navigator !== "undefined" && !!navigator.share;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">공유하기</p>
          <button
            type="button"
            onClick={onClose}
            className="text-xl text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          {food.emoji} {food.name} 추천을 친구에게 공유해보세요!
        </p>

        <div className="mt-5 flex flex-col gap-3">
          {/* 모바일: 기기 공유 시트 (카카오, 인스타 등 설치된 앱 전부 뜸) */}
          {hasNativeShare && (
            <button
              type="button"
              onClick={nativeShare}
              className="flex items-center justify-center gap-2 rounded-2xl bg-orange-500 py-4 text-sm font-bold text-white active:scale-95"
            >
              <span className="text-xl">📤</span>
              카카오톡 · 인스타그램 · 기타 앱으로 공유
            </button>
          )}

          {/* X · 트위터 (PC/모바일 공통) */}
          <button
            type="button"
            onClick={shareTwitter}
            className="flex items-center justify-center gap-2 rounded-2xl bg-black py-4 text-sm font-bold text-white active:scale-95"
          >
            <span className="text-xl">𝕏</span>
            X · 트위터로 공유
          </button>

          {/* 링크 복사 */}
          <button
            type="button"
            onClick={copyLink}
            className="flex items-center justify-center gap-2 rounded-2xl bg-gray-100 py-4 text-sm font-bold text-gray-600 active:scale-95"
          >
            <span className="text-xl">🔗</span>
            링크 복사
          </button>
        </div>

        {/* 광고 영역 */}
        <div className="mt-4 flex h-16 items-center justify-center rounded-2xl bg-gray-50 text-xs text-gray-300">
          광고
        </div>
      </div>
    </div>
  );
}
