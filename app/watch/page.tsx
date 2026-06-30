"use client";

import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import {
  contents,
  ALL_GENRES,
  ALL_OTTS,
  OTT_SEARCH_URL,
  OTT_COLOR,
  type Content,
  type ContentGenre,
  type OTT,
} from "@/data/contents";

const ROULETTE_DURATION = 4000;
const rouletteSpeeds = [50, 70, 100, 150, 220, 340, 500];

const spinMessages = [
  "🎬 좋은 작품 찾는 중...",
  "🍿 취향 분석 중...",
  "🎭 최고의 선택을 고르는 중...",
  "😎 거의 다 됐어요...",
  "🎉 곧 결정됩니다!",
];

export default function WatchPage() {
  const [selectedGenres, setSelectedGenres] = useState<ContentGenre[]>([]);
  const [selectedOtts, setSelectedOtts] = useState<OTT[]>([]);
  const [selectedType, setSelectedType] = useState<"전체" | "영화" | "드라마">("전체");

  const [result, setResult] = useState<Content | null>(null);
  const [rollingContent, setRollingContent] = useState<Content | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [isHoldingFinal, setIsHoldingFinal] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  const resultRef = useRef<HTMLDivElement>(null);

  function getNetflixUrl(url: string | undefined, title: string) {
    if (!url) return OTT_SEARCH_URL["넷플릭스"](title);
    if (typeof navigator !== "undefined" && /android/i.test(navigator.userAgent)) {
      const path = new URL(url).pathname;
      return `intent://www.netflix.com${path}#Intent;scheme=https;package=com.netflix.mediaclient;end`;
    }
    return url;
  }

  const filtered = useMemo(() => {
    return contents.filter((c) => {
      if (selectedType !== "전체" && c.type !== selectedType) return false;
      if (selectedGenres.length > 0 && !selectedGenres.some((g) => c.genres.includes(g))) return false;
      if (selectedOtts.length > 0 && !selectedOtts.some((o) => c.ott.includes(o))) return false;
      return true;
    });
  }, [selectedGenres, selectedOtts, selectedType]);

  function pickRandom(list: Content[]) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function toggleGenre(g: ContentGenre) {
    setSelectedGenres((prev) => prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]);
  }

  function toggleOtt(o: OTT) {
    setSelectedOtts((prev) => prev.includes(o) ? prev.filter((x) => x !== o) : [...prev, o]);
  }

  function startRoulette() {
    if (isRolling || isHoldingFinal || filtered.length === 0) return;

    const finalContent = pickRandom(filtered);

    setIsRolling(true);
    setIsHoldingFinal(false);
    setResult(null);
    setRollingContent(pickRandom(filtered));
    setMessageIndex(0);

    resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

    const startedAt = Date.now();
    let timer: ReturnType<typeof setTimeout> | null = null;

    function roll() {
      const elapsed = Date.now() - startedAt;
      let speedIndex = 0;
      if (elapsed > 3200) speedIndex = 6;
      else if (elapsed > 2400) speedIndex = 5;
      else if (elapsed > 1800) speedIndex = 4;
      else if (elapsed > 1200) speedIndex = 3;
      else if (elapsed > 600) speedIndex = 2;
      else speedIndex = 1;

      setRollingContent(pickRandom(filtered));

      if (elapsed < ROULETTE_DURATION) {
        timer = setTimeout(roll, rouletteSpeeds[speedIndex]);
      }
    }

    roll();

    const msgTimer = setInterval(() => {
      setMessageIndex((prev) => prev + 1);
    }, 300);

    setTimeout(() => {
      if (timer) clearTimeout(timer);
      clearInterval(msgTimer);
      setRollingContent(finalContent);
      setIsRolling(false);
      setIsHoldingFinal(true);

      setTimeout(() => {
        setIsHoldingFinal(false);
        setResult(finalContent);
      }, 500);
    }, ROULETTE_DURATION);
  }

  const displayContent = (isRolling || isHoldingFinal) ? rollingContent : result;

  return (
    <main className="min-h-screen bg-orange-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm text-gray-400 hover:text-orange-500">← 홈으로</Link>

        <h1 className="mt-4 text-2xl font-bold text-gray-800">🎬 오늘 뭐 보지?</h1>
        <p className="mt-1 text-sm text-gray-500">넷플릭스 서비스 중인 작품 중 장르별로 랜덤 추천해드려요.</p>

        <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* 사이드바 */}
          <div className="space-y-4">
            {/* 타입 */}
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <p className="mb-3 text-sm font-bold text-gray-700">📺 종류</p>
              <div className="flex gap-2">
                {(["전체", "영화", "드라마"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedType(t)}
                    disabled={isRolling || isHoldingFinal}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition disabled:opacity-50 ${
                      selectedType === t
                        ? "bg-orange-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-orange-100"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* 장르 */}
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <p className="mb-3 text-sm font-bold text-gray-700">🎭 장르</p>
              <div className="flex flex-wrap gap-1.5">
                {ALL_GENRES.map((g) => (
                  <button
                    key={g}
                    onClick={() => toggleGenre(g)}
                    disabled={isRolling || isHoldingFinal}
                    className={`rounded-full px-3 py-1 text-xs transition disabled:opacity-50 ${
                      selectedGenres.includes(g)
                        ? "bg-orange-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-orange-100"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
              {selectedGenres.length > 0 && (
                <button
                  onClick={() => setSelectedGenres([])}
                  className="mt-3 text-xs text-gray-400 hover:text-orange-500"
                >
                  장르 초기화
                </button>
              )}
            </div>

            <p className="text-center text-xs text-gray-400">
              {filtered.length}개 작품 중 추천
            </p>
          </div>

          {/* 메인 */}
          <div className="flex flex-col items-center gap-6">
            <button
              onClick={startRoulette}
              disabled={isRolling || isHoldingFinal || filtered.length === 0}
              className="w-full rounded-2xl bg-orange-500 py-5 text-xl font-bold text-white shadow-md transition hover:bg-orange-600 disabled:opacity-50"
            >
              {isRolling ? "고르는 중..." : isHoldingFinal ? "결정 중..." : "🎬 뽑기"}
            </button>

            {filtered.length === 0 && (
              <div className="rounded-2xl bg-white p-6 text-center text-gray-400 shadow-sm">
                선택한 조건을 전부 충족하는 작품이 없어요.<br />
                조건을 조정해보세요.
              </div>
            )}

            {/* 룰렛 카드 */}
            <div ref={resultRef} className="w-full">
              {(isRolling || isHoldingFinal) && displayContent && (
                <div className="w-full rounded-2xl bg-white p-8 text-center shadow-md transition-all">
                  <div className="scale-105 transition">
                    <span className={`rounded-full px-3 py-1 text-sm font-bold ${
                      displayContent.type === "영화" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                    }`}>
                      {displayContent.type}
                    </span>
                    <h2 className="mt-4 text-3xl font-bold text-gray-900">{displayContent.title}</h2>
                    <p className="mt-2 text-gray-400">{displayContent.year}년</p>
                    <p className="mt-6 text-lg font-semibold text-orange-500">
                      {spinMessages[messageIndex % spinMessages.length]}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* 결과 카드 */}
            {result && !isRolling && !isHoldingFinal && (
              <div className="w-full rounded-2xl bg-white p-6 shadow-md">
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                    result.type === "영화" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                  }`}>
                    {result.type}
                  </span>
                  <span className="text-sm text-gray-400">{result.year}년</span>
                </div>
                <h2 className="mt-2 text-2xl font-bold text-gray-900">{result.title}</h2>
                {result.imdbScore && (
                  <div className="mt-2 flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="text-sm font-bold text-gray-700">{result.imdbScore.toFixed(1)}</span>
                    <span className="text-xs text-gray-400">/ 10 (IMDb)</span>
                  </div>
                )}
                <div className="mt-2 flex flex-wrap gap-1">
                  {result.genres.map((g) => (
                    <span key={g} className="rounded-full bg-orange-50 px-2.5 py-0.5 text-xs text-orange-600">
                      {g}
                    </span>
                  ))}
                </div>

                <div className="mt-5">
                  <p className="mb-2 text-sm font-bold text-gray-600">바로 보기</p>
                  <div className="flex flex-wrap gap-2">
                    {result.ott.map((o) => (
                      <a
                        key={o}
                        href={getNetflixUrl(result.url, result.title)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`rounded-xl px-4 py-2 text-sm font-bold transition hover:opacity-80 ${OTT_COLOR[o]}`}
                      >
                        {o} →
                      </a>
                    ))}
                  </div>
                </div>

                <button
                  onClick={startRoulette}
                  className="mt-5 w-full rounded-xl border border-orange-200 py-3 text-sm font-medium text-orange-500 hover:bg-orange-50"
                >
                  다시 뽑기
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
