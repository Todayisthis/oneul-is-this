"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import WatchFooter from "@/components/watch/WatchFooter";
import RankCarousel from "@/components/ui/RankCarousel";
import WatchSharePopup from "@/components/watch/WatchSharePopup";
import ReviewModal from "@/components/reviews/ReviewModal";
import WatchFeedList from "@/components/watch/WatchFeedList";
import { saveFeedComment } from "@/lib/firebaseStats";
import { filterComment } from "@/lib/filterComment";
import {
  recordWatchPick,
  recordWatchRating,
  getTopWatchPicks,
  getTopRatedWatch,
  type WatchPopularItem,
} from "@/lib/watchStats";
import {
  contents,
  ALL_GENRES,
  OTT_SEARCH_URL,
  OTT_COLOR,
  type Content,
  type ContentGenre,
} from "@/data/contents";
import KakaoAd from "@/components/ads/KakaoAd";
import WatchSuggestModal from "@/components/watch/WatchSuggestModal";

const ROULETTE_DURATION = 4000;
const rouletteSpeeds = [50, 70, 100, 150, 220, 340, 500];
const spinMessages = [
  "🎬 좋은 작품 찾는 중...",
  "🍿 취향 분석 중...",
  "🎭 최고의 선택을 고르는 중...",
  "😎 거의 다 됐어요...",
  "🎉 곧 결정됩니다!",
];

const COUNTRY_MAP: Record<string, string> = {
  KR: "🇰🇷 한국", US: "🇺🇸 미국", JP: "🇯🇵 일본", GB: "🇬🇧 영국",
  FR: "🇫🇷 프랑스", DE: "🇩🇪 독일", ES: "🇪🇸 스페인", IT: "🇮🇹 이탈리아",
  IN: "🇮🇳 인도", CN: "🇨🇳 중국", TH: "🇹🇭 태국", MX: "🇲🇽 멕시코",
  AU: "🇦🇺 호주", CA: "🇨🇦 캐나다", SE: "🇸🇪 스웨덴", DK: "🇩🇰 덴마크",
  NO: "🇳🇴 노르웨이", BR: "🇧🇷 브라질", TR: "🇹🇷 터키", PL: "🇵🇱 폴란드",
};

const IMDB_RANGES = [
  { key: "9-10", label: "⭐ 9~10점", min: 9, max: 11 },
  { key: "7-8",  label: "⭐ 7~8점",  min: 7, max: 9 },
  { key: "5-6",  label: "⭐ 5~6점",  min: 5, max: 7 },
  { key: "3-4",  label: "⭐ 3~4점",  min: 3, max: 5 },
  { key: "1-2",  label: "⭐ 1~2점",  min: 1, max: 3 },
];

const COUNTRY_OPTIONS = [
  { code: "KR", label: "🇰🇷 한국" },
  { code: "US", label: "🇺🇸 미국" },
  { code: "JP", label: "🇯🇵 일본" },
  { code: "GB", label: "🇬🇧 영국" },
  { code: "FR", label: "🇫🇷 프랑스" },
  { code: "DE", label: "🇩🇪 독일" },
  { code: "IN", label: "🇮🇳 인도" },
  { code: "ES", label: "🇪🇸 스페인" },
  { code: "TH", label: "🇹🇭 태국" },
  { code: "IT", label: "🇮🇹 이탈리아" },
];

function getNetflixUrl(url: string | undefined, title: string) {
  if (!url) return OTT_SEARCH_URL["넷플릭스"](title);
  if (typeof navigator !== "undefined" && /android/i.test(navigator.userAgent)) {
    const path = new URL(url).pathname;
    return `intent://www.netflix.com${path}#Intent;scheme=https;package=com.netflix.mediaclient;end`;
  }
  return url;
}

async function doShare(content: Content) {
  const text = `🎬 오늘 뭐 보지? 추천 작품\n\n${content.title} (${content.year}년)\n\nhttps://oneul-is-this.vercel.app/watch`;
  if (typeof navigator !== "undefined" && navigator.share) {
    await navigator.share({ title: content.title, text }).catch(() => {});
  } else {
    await navigator.clipboard.writeText(text).catch(() => {});
  }
}

export default function WatchPage() {
  const [selectedGenres, setSelectedGenres] = useState<ContentGenre[]>([]);
  const [selectedType, setSelectedType] = useState<"전체" | "영화" | "드라마">("전체");
  const [selectedImdb, setSelectedImdb] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const [result, setResult] = useState<Content | null>(null);
  const [rollingContent, setRollingContent] = useState<Content | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [isHoldingFinal, setIsHoldingFinal] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  const [userRating, setUserRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState(0);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [watchComment, setWatchComment] = useState("");
  const [watchCommentSent, setWatchCommentSent] = useState(false);
  const [watchCommentError, setWatchCommentError] = useState("");

  const [showSuggest, setShowSuggest] = useState(false);
  const [showAdModal, setShowAdModal] = useState(false);
  const [adCountdown, setAdCountdown] = useState(3);
  const adPendingContent = useRef<Content | null>(null);

  const [topPicks, setTopPicks] = useState<WatchPopularItem[]>([]);
  const [topRated, setTopRated] = useState<WatchPopularItem[]>([]);

  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getTopWatchPicks(5).then(setTopPicks).catch(() => {});
    getTopRatedWatch(5).then(setTopRated).catch(() => {});
  }, []);

  useEffect(() => {
    if (!showAdModal) return;
    setAdCountdown(3);
    const interval = setInterval(() => {
      setAdCountdown((prev) => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [showAdModal]);

  useEffect(() => {
    if (!showAdModal || adCountdown !== 0) return;
    setShowAdModal(false);
    setShowSharePopup(true);
  }, [showAdModal, adCountdown]);

  const imdbTop10 = useMemo(() =>
    [...contents]
      .filter((c) => (c.imdbScore ?? 0) > 0)
      .sort((a, b) => (b.imdbScore ?? 0) - (a.imdbScore ?? 0))
      .slice(0, 10), []);

  const krTop3 = useMemo(() =>
    [...contents]
      .filter((c) => c.country === "KR" && (c.imdbScore ?? 0) > 0)
      .sort((a, b) => (b.imdbScore ?? 0) - (a.imdbScore ?? 0))
      .slice(0, 3), []);

  const usTop3 = useMemo(() =>
    [...contents]
      .filter((c) => c.country === "US" && (c.imdbScore ?? 0) > 0)
      .sort((a, b) => (b.imdbScore ?? 0) - (a.imdbScore ?? 0))
      .slice(0, 3), []);

  const filtered = useMemo(() => {
    return contents.filter((c) => {
      if (selectedType !== "전체" && c.type !== selectedType) return false;
      if (selectedGenres.length > 0 && !selectedGenres.every((g) => c.genres.includes(g))) return false;
      if (selectedCountry && c.country !== selectedCountry) return false;
      if (selectedImdb) {
        const range = IMDB_RANGES.find((r) => r.key === selectedImdb);
        if (range) {
          const score = c.imdbScore ?? 0;
          if (score < range.min || score >= range.max) return false;
        }
      }
      return true;
    });
  }, [selectedGenres, selectedType, selectedImdb, selectedCountry]);

  function pickRandom(list: Content[]) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function toggleGenre(g: ContentGenre) {
    setSelectedGenres((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    );
  }

  function startRoulette() {
    if (isRolling || isHoldingFinal || filtered.length === 0) return;
    const finalContent = pickRandom(filtered);

    setIsRolling(true);
    setIsHoldingFinal(false);
    setResult(null);
    setUserRating(null);
    setRatingSubmitted(false);
    setShareSuccess(false);
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

    const msgTimer = setInterval(() => setMessageIndex((prev) => prev + 1), 300);

    setTimeout(() => {
      if (timer) clearTimeout(timer);
      clearInterval(msgTimer);
      setRollingContent(finalContent);
      setIsRolling(false);
      setIsHoldingFinal(true);
      setTimeout(() => {
        setIsHoldingFinal(false);
        setResult(finalContent);
        setWatchComment("");
        setWatchCommentSent(false);
        setWatchCommentError("");
        recordWatchPick(finalContent).catch(() => {});
      }, 500);
    }, ROULETTE_DURATION);
  }

  async function submitWatchComment(content: Content) {
    const trimmed = watchComment.trim();
    if (!trimmed) return;
    const { ok, reason } = filterComment(trimmed);
    if (!ok) { setWatchCommentError(reason ?? "등록할 수 없는 내용이에요."); return; }
    setWatchCommentError("");
    await saveFeedComment({
      foodId: typeof content.id === "number" ? content.id : 0,
      foodName: content.title,
      foodEmoji: "🎬",
      comment: trimmed,
    });
    setWatchCommentSent(true);
  }

  function handleShare(content: Content) {
    if (ratingSubmitted) {
      setShowSharePopup(true); // 별점 있으면 광고 스킵
    } else {
      adPendingContent.current = content;
      setShowAdModal(true);
    }
  }

  async function handleRating(content: Content, score: number) {
    setUserRating(score);
    setRatingSubmitted(true);
    await recordWatchRating(content, score).catch(() => {});
    getTopRatedWatch(5).then(setTopRated).catch(() => {});
  }

  const displayContent = (isRolling || isHoldingFinal) ? rollingContent : result;

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-8">
      {showSharePopup && result && (
        <WatchSharePopup
          content={result}
          onClose={() => setShowSharePopup(false)}
        />
      )}
      {showReview && <ReviewModal onClose={() => setShowReview(false)} />}
      {showSuggest && <WatchSuggestModal onClose={() => setShowSuggest(false)} />}

      {/* 광고 모달 */}
      {showAdModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-sm rounded-2xl bg-gray-800 p-6 shadow-2xl">
            <p className="text-center text-sm font-medium text-gray-300">잠깐! 광고를 보고 공유할게요</p>
            <p className="mt-1 text-center text-xs text-orange-400">
              💡 별점을 주시면 광고 없이 바로 공유할 수 있어요
            </p>
            <div className="mt-4 flex items-center justify-center">
              <KakaoAd unitId="DAN-3qhuUl7cRaH3PTPF" width={300} height={250} />
            </div>
            <div className="mt-4 flex items-center gap-2">
              <div className="h-2 flex-1 rounded-full bg-gray-600">
                <div
                  className="h-2 rounded-full bg-orange-500 transition-all duration-1000"
                  style={{ width: `${((3 - adCountdown) / 3) * 100}%` }}
                />
              </div>
              <span className="w-6 text-right text-sm font-bold text-orange-400">{adCountdown}s</span>
            </div>
            <p className="mt-2 text-center text-xs text-gray-400">
              {adCountdown > 0 ? `${adCountdown}초 후 자동으로 공유됩니다` : "공유 준비 중..."}
            </p>
          </div>
        </div>
      )}

      <div className="xl:grid xl:grid-cols-[160px_1fr_160px] xl:items-start xl:gap-2">

        {/* 왼쪽 광고 (PC 전용) */}
        <div className="hidden xl:block xl:sticky xl:top-8 xl:pt-8">
          <KakaoAd unitId="DAN-Rx4jX8tclansKt6T" width={160} height={600} />
        </div>

        <div>
      <div className="mx-auto max-w-7xl">
        <Link href="/" className="text-sm text-gray-400 hover:text-orange-500">← 홈으로</Link>

        <h1 className="mt-4 text-2xl font-bold text-white">🎬 오늘 뭐 보지?</h1>
        <p className="mt-1 text-sm text-gray-400">넷플릭스 서비스 중인 작품 중 장르별로 랜덤 추천해드려요.</p>

        <div className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr_260px]">
          {/* ───── 왼쪽 사이드바 ───── */}
          <div className="space-y-4">
            {/* 종류 */}
            <div className="rounded-2xl border border-gray-700 bg-gray-800 p-4 shadow-sm">
              <p className="mb-3 text-sm font-bold text-white">📺 종류</p>
              <div className="flex gap-2">
                {(["전체", "영화", "드라마"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedType(t)}
                    disabled={isRolling || isHoldingFinal}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition disabled:opacity-50 ${
                      selectedType === t
                        ? "bg-orange-500 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* 장르 */}
            <div className="rounded-2xl border border-gray-700 bg-gray-800 p-4 shadow-sm">
              <p className="mb-3 text-sm font-bold text-white">🎭 장르</p>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedGenres([])}
                  disabled={isRolling || isHoldingFinal}
                  className={`rounded-full px-3 py-1 text-xs transition disabled:opacity-50 ${
                    selectedGenres.length === 0
                      ? "bg-orange-500 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  전체
                </button>
                {ALL_GENRES.map((g) => (
                  <button
                    key={g}
                    onClick={() => toggleGenre(g)}
                    disabled={isRolling || isHoldingFinal}
                    className={`rounded-full px-3 py-1 text-xs transition disabled:opacity-50 ${
                      selectedGenres.includes(g)
                        ? "bg-orange-500 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* IMDb 점수 — 숨김 처리 (기능은 유지, 나중에 꺼내쓸 것)
            <div className="rounded-2xl border border-gray-700 bg-gray-800 p-4 shadow-sm md:border-none md:bg-white">
              <p className="mb-3 text-sm font-bold text-white md:text-gray-700">⭐ IMDb 점수</p>
              <div className="space-y-1.5">
                <button
                  onClick={() => setSelectedImdb(null)}
                  disabled={isRolling || isHoldingFinal}
                  className={`w-full rounded-xl px-3 py-2 text-left text-xs font-medium transition disabled:opacity-50 ${
                    selectedImdb === null
                      ? "bg-yellow-400 text-gray-900"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600 md:bg-gray-100 md:text-gray-600 md:hover:bg-yellow-100"
                  }`}
                >
                  전체
                </button>
                {IMDB_RANGES.map((r) => (
                  <button
                    key={r.key}
                    onClick={() => setSelectedImdb(selectedImdb === r.key ? null : r.key)}
                    disabled={isRolling || isHoldingFinal}
                    className={`w-full rounded-xl px-3 py-2 text-left text-xs font-medium transition disabled:opacity-50 ${
                      selectedImdb === r.key
                        ? "bg-yellow-400 text-gray-900"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600 md:bg-gray-100 md:text-gray-600 md:hover:bg-yellow-100"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
            */}

            {/* 제작 국가 */}
            <div className="rounded-2xl border border-gray-700 bg-gray-800 p-4 shadow-sm">
              <p className="mb-3 text-sm font-bold text-white">🌏 제작 국가</p>
              <div className="space-y-1.5">
                <button
                  onClick={() => setSelectedCountry(null)}
                  disabled={isRolling || isHoldingFinal}
                  className={`w-full rounded-xl px-3 py-2 text-left text-xs font-medium transition disabled:opacity-50 ${
                    selectedCountry === null
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  🌏 전체
                </button>
                {COUNTRY_OPTIONS.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => setSelectedCountry(selectedCountry === c.code ? null : c.code)}
                    disabled={isRolling || isHoldingFinal}
                    className={`w-full rounded-xl px-3 py-2 text-left text-xs font-medium transition disabled:opacity-50 ${
                      selectedCountry === c.code
                        ? "bg-blue-500 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-center text-xs text-gray-400">{filtered.length}개 작품 중 추천</p>

            <button
              type="button"
              onClick={() => setShowSuggest(true)}
              className="w-full rounded-2xl border border-orange-500/30 bg-gray-700 py-3 text-sm font-bold text-orange-400 active:scale-95"
            >
              🎬 작품 제안하기
            </button>

            {/* PC 전용 광고 — 모바일에서는 숨김 */}
            <div className="hidden lg:block">
              <KakaoAd unitId="DAN-Rx4jX8tclansKt6T" width={160} height={600} />
            </div>
          </div>

          {/* ───── 메인 영역 ───── */}
          <div className="flex flex-col items-center gap-6">
            <button
              onClick={startRoulette}
              disabled={isRolling || isHoldingFinal || filtered.length === 0}
              className="w-full rounded-2xl bg-orange-500 py-5 text-xl font-bold text-white shadow-md transition hover:bg-orange-600 disabled:opacity-50"
            >
              {isRolling ? "고르는 중..." : isHoldingFinal ? "결정 중..." : "🎬 뽑기"}
            </button>

            {filtered.length === 0 && (
              <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6 text-center text-gray-400 shadow-sm">
                선택한 조건을 전부 충족하는 작품이 없어요.<br />
                조건을 조정해보세요.
              </div>
            )}

            {/* 모바일 전용 제안 버튼 */}
            <button
              type="button"
              onClick={() => setShowSuggest(true)}
              className="w-full rounded-2xl border border-orange-500/30 bg-gray-700 py-3 text-sm font-bold text-orange-400 active:scale-95 lg:hidden"
            >
              🎬 보고 싶은 작품이 없어요? 제안하기
            </button>

            {/* 룰렛 애니메이션 */}
            <div ref={resultRef} className="w-full">
              {(isRolling || isHoldingFinal) && displayContent && (
                <div className="w-full rounded-2xl border border-gray-700 bg-gray-800 p-8 text-center shadow-md">
                  <span className={`rounded-full px-3 py-1 text-sm font-bold ${
                    displayContent.type === "영화" ? "bg-blue-900 text-blue-300" : "bg-purple-900 text-purple-300"
                  }`}>
                    {displayContent.type}
                  </span>
                  <h2 className="mt-4 text-3xl font-bold text-white">{displayContent.title}</h2>
                  <p className="mt-2 text-gray-400">{displayContent.year}년</p>
                  <p className="mt-6 text-lg font-semibold text-orange-500">
                    {spinMessages[messageIndex % spinMessages.length]}
                  </p>
                </div>
              )}
            </div>

            {/* 결과 카드 */}
            {result && !isRolling && !isHoldingFinal && (
              <div className="w-full space-y-4">
                {/* 작품 정보 */}
                <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6 shadow-md">
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                      result.type === "영화" ? "bg-blue-900 text-blue-300" : "bg-purple-900 text-purple-300"
                    }`}>
                      {result.type}
                    </span>
                    <span className="text-sm text-gray-400">{result.year}년</span>
                  </div>
                  <h2 className="mt-2 text-2xl font-bold text-white">{result.title}</h2>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    {result.country && (
                      <span className="text-sm text-gray-400">
                        {COUNTRY_MAP[result.country] ?? result.country} 작품
                      </span>
                    )}
                    {result.imdbScore && (
                      <span className="flex items-center gap-1 text-sm">
                        <span className="text-yellow-500">⭐</span>
                        <span className="font-bold text-white">{result.imdbScore.toFixed(1)}</span>
                        <span className="text-gray-400">/ 10 (IMDb)</span>
                      </span>
                    )}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {result.genres.map((g) => (
                      <span key={g} className="rounded-full bg-orange-500/15 px-2.5 py-0.5 text-xs text-orange-400">
                        {g}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5">
                    <p className="mb-2 text-sm font-bold text-gray-300">바로 보기</p>
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
                    className="mt-5 w-full rounded-xl border border-orange-500/30 bg-gray-700 py-3 text-sm font-medium text-orange-400 hover:bg-gray-600"
                  >
                    다시 뽑기
                  </button>
                </div>

                {/* 별점 + 공유 */}
                <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6 shadow-md">
                  <div className="mb-4 rounded-xl bg-amber-500/10 p-3 text-center text-sm">
                    <span className="text-amber-400">
                      💡 <strong>별점을 주시면 광고 없이 바로 공유</strong>할 수 있어요!
                    </span>
                  </div>

                  {/* 별점 */}
                  <div className="mb-5">
                    <p className="mb-2 text-center text-sm font-semibold text-white">
                      {ratingSubmitted
                        ? "⭐ 별점 주셔서 감사해요!"
                        : "추천이 마음에 드셨나요? 별점을 남겨주세요"}
                    </p>
                    <div className="flex justify-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => !ratingSubmitted && handleRating(result, star)}
                          onMouseEnter={() => !ratingSubmitted && setHoverRating(star)}
                          onMouseLeave={() => !ratingSubmitted && setHoverRating(0)}
                          disabled={ratingSubmitted}
                          className={`text-3xl transition-transform hover:scale-110 disabled:cursor-default ${
                            star <= (hoverRating || userRating || 0)
                              ? "text-yellow-400"
                              : "text-gray-200"
                          }`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                    {ratingSubmitted && (
                      <p className="mt-2 text-center text-xs text-green-600">
                        ✓ {userRating}점 반영됐어요 · 이제 광고 없이 바로 공유할 수 있어요
                      </p>
                    )}
                  </div>

                  {/* 공유 버튼 */}
                  <button
                    onClick={() => handleShare(result)}
                    className={`w-full rounded-xl py-3 text-sm font-bold transition ${
                      ratingSubmitted
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-gray-700 text-white hover:bg-gray-600"
                    }`}
                  >
                    {ratingSubmitted ? "📤 바로 공유하기 (광고 없음)" : "📤 공유하기 (광고 3초)"}
                  </button>
                  <div className="mt-4 border-t border-gray-700 pt-4">
                    <p className="mb-2 text-sm font-bold text-white">📝 방명록 남기기</p>
                    {watchCommentSent ? (
                      <p className="rounded-xl bg-orange-50 py-3 text-center text-sm font-bold text-orange-500">방명록이 등록됐어요! 🎉</p>
                    ) : (
                      <div className="flex flex-col gap-2">
                        {watchCommentError && <p className="text-xs text-red-400">{watchCommentError}</p>}
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={watchComment}
                            onChange={(e) => setWatchComment(e.target.value)}
                            onKeyDown={(e) => { if (e.key === "Enter") submitWatchComment(result!); }}
                            maxLength={60}
                            placeholder="재밌었다, 별로였다... 자유롭게!"
                            className="flex-1 rounded-xl border border-gray-600 bg-gray-700 px-4 py-2 text-sm text-white outline-none placeholder:text-gray-500 focus:border-orange-400"
                          />
                          <button
                            onClick={() => submitWatchComment(result!)}
                            disabled={!watchComment.trim()}
                            className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-bold text-white disabled:opacity-40 active:scale-95"
                          >
                            등록
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => setShowReview(true)}
                    className="mt-3 w-full rounded-xl bg-orange-500 py-3 text-sm font-bold text-white active:scale-95"
                  >
                    ✍️ 사용후기 남기기
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ───── 오른쪽 사이드바 ───── */}
          <div className="space-y-4">
            <WatchFeedList />
            <div className="hidden lg:block">
              <KakaoAd unitId="DAN-Rx4jX8tclansKt6T" width={160} height={600} />
            </div>
            {topPicks.length > 0 ? (
              <RankCarousel
                title="🔥 이번주 자주 추천된 작품"

                items={topPicks.map((item, i) => ({
                  id: item.id,
                  rank: i + 1,
                  label: item.title,
                  sub: `${item.year}년`,
                  score: `🔥 ${item.count}`,
                  scoreLabel: "추천",
                  href: getNetflixUrl(item.url, item.title),
                }))}
              />
            ) : (
              <div className="rounded-2xl border border-gray-700 bg-gray-800 p-4 shadow-sm">
                <p className="mb-2 text-sm font-bold text-white">🔥 이번주 자주 추천된 작품</p>
                <p className="py-4 text-center text-xs text-gray-400">아직 데이터가 없어요</p>
              </div>
            )}

            {topRated.length > 0 ? (
              <RankCarousel
                title="⭐ 추천이 마음에 드는 작품"

                items={topRated.map((item, i) => ({
                  id: item.id,
                  rank: i + 1,
                  label: item.title,
                  sub: `${item.year}년`,
                  score: `⭐ ${item.avgRating?.toFixed(1)}`,
                  scoreLabel: `${item.ratingCount}명 평가`,
                  href: getNetflixUrl(item.url, item.title),
                }))}
              />
            ) : (
              <div className="rounded-2xl border border-gray-700 bg-gray-800 p-4 shadow-sm">
                <p className="mb-2 text-sm font-bold text-white">⭐ 추천이 마음에 드는 작품</p>
                <p className="py-4 text-center text-xs text-gray-400">아직 데이터가 없어요</p>
              </div>
            )}
          </div>
        </div>

        <KakaoAd />

        {/* ───── IMDb Top 10 + 나라별 Top 3 ───── */}
        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          <RankCarousel
            title="🏆 IMDb 기준 넷플릭스 Top 10"
            items={imdbTop10.map((c, idx) => ({
              id: c.id,
              rank: idx + 1,
              label: c.title,
              sub: `${c.year}년 · ${c.type}`,
              badge: c.type,
              score: c.imdbScore ? `⭐ ${c.imdbScore.toFixed(1)}` : undefined,
              href: getNetflixUrl(c.url, c.title),
            }))}
          />

          <RankCarousel
            title="🇰🇷 한국 작품 IMDb Top 3"
            items={krTop3.map((c, idx) => ({
              id: c.id,
              rank: idx + 1,
              label: c.title,
              sub: `${c.year}년 · ${c.type}`,
              score: c.imdbScore ? `⭐ ${c.imdbScore.toFixed(1)}` : undefined,
              href: getNetflixUrl(c.url, c.title),
            }))}
          />

          <RankCarousel
            title="🇺🇸 미국 작품 IMDb Top 3"
            items={usTop3.map((c, idx) => ({
              id: c.id,
              rank: idx + 1,
              label: c.title,
              sub: `${c.year}년 · ${c.type}`,
              score: c.imdbScore ? `⭐ ${c.imdbScore.toFixed(1)}` : undefined,
              href: getNetflixUrl(c.url, c.title),
            }))}
          />
        </section>
      </div>
        </div>{/* 메인 콘텐츠 끝 */}

        {/* 오른쪽 광고 (PC 전용) */}
        <div className="hidden xl:block xl:sticky xl:top-8 xl:pt-8">
          <KakaoAd unitId="DAN-Rx4jX8tclansKt6T" width={160} height={600} />
        </div>

      </div>{/* xl grid 끝 */}

      <div className="hidden lg:flex justify-center py-4">
        <KakaoAd unitId="DAN-v96On6dbt3Krp7Pw" width={728} height={90} />
      </div>
      <WatchFooter />
    </main>
  );
}
