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

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      alert("링크가 복사됐어요! 🔗");
    } catch {
      alert(url);
    }
  }

  function shareKakao() {
    const kakaoUrl = `https://sharer.kakao.com/talk/friends/picker/link?app_key=&link_ver=4.0&template_id=&url=${encodeURIComponent(url)}`;
    window.open(
      `https://story.kakao.com/share?url=${encodeURIComponent(url)}`,
      "_blank"
    );
  }

  function shareTwitter() {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      "_blank"
    );
  }

  function shareInstagram() {
    copyLink();
    alert("링크가 복사됐어요! 인스타그램 앱에 붙여넣기 해주세요 📸");
  }

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
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          {food.emoji} {food.name} 추천을 친구에게 공유해보세요!
        </p>

        <div className="mt-5 grid grid-cols-3 gap-3">
          <button
            type="button"
            onClick={shareKakao}
            className="flex flex-col items-center gap-2 rounded-2xl bg-yellow-400 py-4 text-sm font-bold text-yellow-900 active:scale-95"
          >
            <span className="text-2xl">💬</span>
            카카오톡
          </button>

          <button
            type="button"
            onClick={shareTwitter}
            className="flex flex-col items-center gap-2 rounded-2xl bg-black py-4 text-sm font-bold text-white active:scale-95"
          >
            <span className="text-2xl">𝕏</span>
            X · 트위터
          </button>

          <button
            type="button"
            onClick={shareInstagram}
            className="flex flex-col items-center gap-2 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 py-4 text-sm font-bold text-white active:scale-95"
          >
            <span className="text-2xl">📸</span>
            인스타그램
          </button>
        </div>

        <button
          type="button"
          onClick={copyLink}
          className="mt-3 w-full rounded-2xl bg-gray-100 py-3 text-sm font-bold text-gray-600 active:scale-95"
        >
          🔗 링크 복사
        </button>

        {/* 광고 영역 */}
        <div className="mt-4 flex h-16 items-center justify-center rounded-2xl bg-gray-50 text-xs text-gray-300">
          광고
        </div>
      </div>
    </div>
  );
}
