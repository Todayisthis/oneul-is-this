"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/layout/Footer";
import {
  champions,
  LANES,
  LANE_EMOJI,
  getChampionsByLane,
  getChampionImageUrl,
  type Lane,
  type Champion,
} from "@/data/champions";

const spinMessages = [
  "⚔️ 챔피언 고르는 중...",
  "🎮 라인 분석 중...",
  "🏆 최적의 픽을 찾는 중...",
  "😎 거의 다 됐어요...",
  "🎉 곧 결정됩니다!",
];

const ROULETTE_DURATION = 2500;
const rouletteSpeeds = [50, 70, 100, 150, 220, 340, 500];

export default function LolPage() {
  const [selectedLane, setSelectedLane] = useState<Lane | "전체">("전체");
  const [result, setResult] = useState<Champion | null>(null);
  const [rollingChamp, setRollingChamp] = useState<Champion | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [isHoldingFinal, setIsHoldingFinal] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  const [userRating, setUserRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState(0);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const pool =
    selectedLane === "전체" ? champions : getChampionsByLane(selectedLane);

  useEffect(() => {
    pool.forEach((c) => {
      const img = new window.Image();
      img.src = getChampionImageUrl(c.id);
    });
  }, [selectedLane]);

  function pickRandom(list: Champion[]) {
    return list[Math.floor(Math.random() * list.length)]!;
  }

  function startRoulette() {
    if (isRolling || isHoldingFinal || pool.length === 0) return;
    const finalChamp = pickRandom(pool);

    setIsRolling(true);
    setIsHoldingFinal(false);
    setResult(null);
    setUserRating(null);
    setRatingSubmitted(false);
    setShareSuccess(false);
    setRollingChamp(pickRandom(pool));
    setMessageIndex(0);

    const startedAt = Date.now();
    let timer: ReturnType<typeof setTimeout> | null = null;

    function roll() {
      const elapsed = Date.now() - startedAt;
      let speedIndex = 0;
      if (elapsed > 2000) speedIndex = 6;
      else if (elapsed > 1600) speedIndex = 5;
      else if (elapsed > 1200) speedIndex = 4;
      else if (elapsed > 800) speedIndex = 3;
      else if (elapsed > 400) speedIndex = 2;
      else speedIndex = 1;
      setRollingChamp(pickRandom(pool));
      if (elapsed < ROULETTE_DURATION) {
        timer = setTimeout(roll, rouletteSpeeds[speedIndex]);
      }
    }
    roll();

    const msgTimer = setInterval(() => setMessageIndex((p) => p + 1), 300);

    setTimeout(() => {
      if (timer) clearTimeout(timer);
      clearInterval(msgTimer);
      setRollingChamp(finalChamp);
      setIsRolling(false);
      setIsHoldingFinal(true);
      setTimeout(() => {
        setIsHoldingFinal(false);
        setResult(finalChamp);
      }, 500);
    }, ROULETTE_DURATION);
  }

  function handleRating(score: number) {
    setUserRating(score);
    setRatingSubmitted(true);
  }

  async function handleShare() {
    const text = `⚔️ 오늘 뭐 픽하지? 추천 챔피언\n\n${result?.name} (${result?.lanes.join(", ")})\n\nhttps://oneul-is-this.com/lol`;
    if (typeof navigator !== "undefined" && navigator.share) {
      await navigator.share({ title: result?.name ?? "", text }).catch(() => {});
    } else {
      await navigator.clipboard.writeText(text).catch(() => {});
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2000);
    }
  }

  const displayChamp = (isRolling || isHoldingFinal) ? rollingChamp : result;

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-8">
      <div className="mx-auto max-w-2xl">
        {/* 헤더 */}
        <div className="mb-6 flex items-center justify-between">
          <Link href="/" className="text-sm text-gray-400 hover:text-orange-500">
            ← 홈으로
          </Link>
          <h1 className="text-lg font-bold text-white">⚔️ 오늘 뭐 픽하지?</h1>
          <div className="w-16" />
        </div>

        <p className="mb-6 text-center text-sm text-gray-400">
          라인을 선택하고 오늘의 챔피언을 뽑아보세요!
        </p>

        {/* 라인 선택 */}
        <div className="mb-4 rounded-2xl border border-gray-700 bg-gray-800 p-4">
          <p className="mb-3 text-sm font-bold text-white">라인 선택</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => { setSelectedLane("전체"); setResult(null); }}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition active:scale-95 ${
                selectedLane === "전체"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              전체
            </button>
            {LANES.map((lane) => (
              <button
                key={lane}
                onClick={() => { setSelectedLane(lane); setResult(null); }}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition active:scale-95 ${
                  selectedLane === lane
                    ? "bg-orange-500 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {LANE_EMOJI[lane]} {lane}
              </button>
            ))}
          </div>
          <p className="mt-3 text-right text-xs text-gray-500">{pool.length}개 챔피언 중 추천</p>
        </div>

        {/* 뽑기 버튼 */}
        <button
          onClick={startRoulette}
          disabled={isRolling || isHoldingFinal}
          className="mb-6 w-full rounded-2xl bg-orange-500 py-5 text-xl font-bold text-white shadow-md transition hover:bg-orange-600 disabled:opacity-50 active:scale-95"
        >
          {isRolling ? "고르는 중..." : isHoldingFinal ? "결정 중..." : "⚔️ 챔피언 뽑기"}
        </button>

        {/* 룰렛 애니메이션 */}
        {(isRolling || isHoldingFinal) && displayChamp && (
          <div className="mb-6 w-full rounded-2xl border border-gray-700 bg-gray-800 p-8 text-center shadow-md">
            <p className="text-lg font-bold text-orange-500">
              {spinMessages[messageIndex % spinMessages.length]}
            </p>
            <div className="mt-5 flex justify-center">
              <div className="relative h-24 w-24 overflow-hidden rounded-2xl border-2 border-orange-500 opacity-80">
                <Image
                  src={getChampionImageUrl(displayChamp.id)}
                  alt={displayChamp.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
            <h2 className="mt-3 text-2xl font-bold text-white">{displayChamp.name}</h2>
            <div className="mt-2 flex justify-center gap-2">
              {displayChamp.lanes.map((lane) => (
                <span key={lane} className="rounded-full bg-orange-500/15 px-3 py-0.5 text-xs font-bold text-orange-400">
                  {LANE_EMOJI[lane]} {lane}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 결과 카드 */}
        {result && !isRolling && !isHoldingFinal && (
          <div className="space-y-4">
            {/* 챔피언 정보 */}
            <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6 text-center shadow-md">
              <p className="text-xs font-bold uppercase tracking-widest text-orange-500">
                오늘의 챔피언
              </p>
              <div className="mt-4 flex justify-center">
                <div className="relative h-32 w-32 overflow-hidden rounded-2xl border-2 border-orange-500 shadow-lg">
                  <Image
                    src={getChampionImageUrl(result.id)}
                    alt={result.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>
              <h2 className="mt-4 text-3xl font-black text-white">{result.name}</h2>
              <div className="mt-2 flex justify-center gap-2">
                {result.lanes.map((lane) => (
                  <span
                    key={lane}
                    className="rounded-full bg-orange-500/15 px-3 py-0.5 text-xs font-bold text-orange-400"
                  >
                    {LANE_EMOJI[lane]} {lane}
                  </span>
                ))}
              </div>

              <button
                onClick={startRoulette}
                className="mt-5 w-full rounded-xl border border-orange-500/30 bg-gray-700 px-4 py-2.5 text-sm font-medium text-orange-400 hover:bg-gray-600 active:scale-95"
              >
                🔄 다시 뽑기
              </button>
            </div>

            {/* 별점 + 공유 */}
            <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6 shadow-md">
              {/* 별점 */}
              <p className="mb-3 text-center text-sm font-semibold text-white">
                {ratingSubmitted ? "⭐ 별점 주셔서 감사해요!" : "이 추천 어땠어?"}
              </p>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => !ratingSubmitted && handleRating(star)}
                    onMouseEnter={() => !ratingSubmitted && setHoverRating(star)}
                    onMouseLeave={() => !ratingSubmitted && setHoverRating(0)}
                    disabled={ratingSubmitted}
                    className={`text-3xl transition-transform hover:scale-110 disabled:cursor-default ${
                      star <= (hoverRating || userRating || 0)
                        ? "text-yellow-400"
                        : "text-gray-600"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
              {ratingSubmitted && (
                <p className="mt-2 text-center text-xs text-green-400">
                  ✓ {userRating}점 남겨주셔서 감사해요!
                </p>
              )}

              {/* 공유 버튼 */}
              <button
                onClick={handleShare}
                className="mt-5 w-full rounded-xl bg-gray-700 py-3 text-sm font-bold text-white hover:bg-gray-600 active:scale-95"
              >
                {shareSuccess ? "✅ 복사됐어요!" : "📤 친구에게 공유하기"}
              </button>
            </div>
          </div>
        )}

      </div>
      <Footer />
    </main>
  );
}
