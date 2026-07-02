"use client";

import { useEffect, useState } from "react";
import type { Food } from "@/data/foods";
import KakaoAd from "@/components/ads/KakaoAd";

declare global {
  interface Window {
    Kakao: {
      isInitialized: () => boolean;
      init: (key: string) => void;
      Share: {
        sendDefault: (options: unknown) => void;
      };
    };
  }
}

type Props = {
  food: Food;
  onClose: () => void;
};

export default function SharePopup({ food, onClose }: Props) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(`${window.location.origin}/eat?food=${food.id}`);
  }, [food.id]);

  const text = `오늘 뭐 먹지? ${food.emoji} ${food.name} 어때요?`;

  useEffect(() => {
    if (typeof window !== "undefined" && window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_APP_KEY!);
    }
  }, []);

  async function waitForKakao(timeout = 3000): Promise<boolean> {
    const start = Date.now();
    while (!window.Kakao) {
      if (Date.now() - start > timeout) return false;
      await new Promise((r) => setTimeout(r, 100));
    }
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_APP_KEY!);
    }
    return true;
  }

  async function shareKakao() {
    const ok = await waitForKakao();
    if (!ok || !window.Kakao?.Share) {
      alert("카카오톡 공유를 사용할 수 없어요.");
      return;
    }
    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: `오늘 뭐 먹지? ${food.emoji} ${food.name}`,
        description: food.message ?? `${food.name} 어때요?`,
        imageUrl: "https://www.oneul-is-this.com/og-image.svg",
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      buttons: [
        {
          title: "나도 뽑아보기",
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    });
  }

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
          {/* 카카오톡 공유 */}
          <button
            type="button"
            onClick={shareKakao}
            className="flex items-center justify-center gap-2 rounded-2xl bg-[#FEE500] py-4 text-sm font-bold text-[#191919] active:scale-95"
          >
            <span className="text-xl">💬</span>
            카카오톡으로 공유
          </button>

          {/* 모바일: 기기 공유 시트 */}
          {hasNativeShare && (
            <button
              type="button"
              onClick={nativeShare}
              className="flex items-center justify-center gap-2 rounded-2xl bg-orange-500 py-4 text-sm font-bold text-white active:scale-95"
            >
              <span className="text-xl">📤</span>
              기타 앱으로 공유
            </button>
          )}

          {/* X · 트위터 */}
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

        <div className="mt-4 flex items-center justify-center">
          <KakaoAd unitId="DAN-3qhuUl7cRaH3PTPF" width={300} height={250} />
        </div>
      </div>
    </div>
  );
}
