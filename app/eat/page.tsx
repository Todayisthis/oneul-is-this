"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { foods } from "@/data/foods";
import type { Food, FoodCategory } from "@/data/foods";
import { getBrandCategory } from "@/data/brands";
import {
  recommendFood,
  type RecommendFilters,
  type RecommendMode,
} from "@/lib/recommendEngine";

import {
  getFoodHistory,
  saveFoodHistory,
  saveFoodPick,
  saveFoodRating,
} from "@/lib/foodStats";
import { recordFoodPick, recordFoodRating, getTopFoods, getTopRatedFoods, getRecentFeeds, type PopularItem, type FeedItem } from "@/lib/firebaseStats";

import CategorySelector from "@/components/eat/CategorySelector";
import RecommendModeSelector from "@/components/eat/RecommendModeSelector";
import FilterSelector from "@/components/eat/FilterSelector";
import RouletteCard from "@/components/eat/RouletteCard";
import ResultCard from "@/components/eat/ResultCard";
import PopularFoods from "@/components/eat/PopularFoods";
import FoodHistory from "@/components/eat/FoodHistory";
import SuggestModal from "@/components/eat/SuggestModal";
import FeedList from "@/components/eat/FeedList";
import AdPlaceholder from "@/components/ads/AdPlaceholder";
import KakaoAd from "@/components/ads/KakaoAd";
import Footer from "@/components/layout/Footer";
import ReviewModal from "@/components/reviews/ReviewModal";

const ROULETTE_DURATION = 5000;
const FINAL_HOLD_DURATION = 600;
const rouletteSpeeds = [50, 70, 90, 130, 190, 280, 420];

type SelectedCategory = "전체" | FoodCategory;

const defaultFilters: RecommendFilters = {
  brand: "전체",
};

function EatPageInner() {
  const resultRef = useRef<HTMLDivElement | null>(null);

  const [selectedCategory, setSelectedCategory] =
    useState<SelectedCategory>("전체");
  const [recommendMode, setRecommendMode] = useState<RecommendMode>("random");
  const [filters, setFilters] = useState<RecommendFilters>(defaultFilters);

  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [rollingFood, setRollingFood] = useState<Food | null>(null);

  const [isRolling, setIsRolling] = useState(false);
  const [isHoldingFinal, setIsHoldingFinal] = useState(false);
  const [showSuggest, setShowSuggest] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const [messageIndex, setMessageIndex] = useState(0);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [resultMessage, setResultMessage] = useState("");

  const [history, setHistory] = useState<Food[]>([]);
  const [topPicked, setTopPicked] = useState<PopularItem[]>([]);
  const [topRated, setTopRated] = useState<PopularItem[]>([]);
  const [feeds, setFeeds] = useState<FeedItem[]>([]);

  async function refreshPopular() {
    const [picked, rated, recentFeeds] = await Promise.all([getTopFoods(5), getTopRatedFoods(5), getRecentFeeds(20)]);
    setTopPicked(picked);
    setTopRated(rated);
    setFeeds(recentFeeds);
  }

  const searchParams = useSearchParams();

  useEffect(() => {
    refreshStats();
    refreshPopular();

    const foodId = searchParams.get("food");
    if (foodId) {
      const found = foods.find((f) => f.id === Number(foodId));
      if (found) {
        setSelectedFood(found);
        setResultMessage(found.message ?? "추천 완료!");
        setTimeout(() => {
          resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 300);
      }
    }
  }, []);

  const filteredFoods =
    selectedCategory === "전체"
      ? foods
      : foods.filter(
          (food) =>
            food.category === selectedCategory ||
            food.additionalCategories?.includes(selectedCategory as import("@/data/foods").FoodCategory)
        );

  function handleCategoryChange(category: string) {
    setSelectedCategory(category as SelectedCategory);
    setFilters({ brand: "전체" });
  }

  function handleFilterChange(nextFilters: RecommendFilters) {
    setFilters(nextFilters);

    const brandCategory = getBrandCategory(nextFilters.brand);

    if (brandCategory) {
      setSelectedCategory(brandCategory);
    }
  }

  function scrollToResult() {
    setTimeout(() => {
      resultRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  }

  function pickRandomFood(): Food | null {
    const list = filteredFoods.length > 0 ? filteredFoods : foods;
    if (list.length === 0) return null;

    const index = Math.floor(Math.random() * list.length);
    return list[index] ?? null;
  }

  function refreshStats() {
    try {
      setHistory(getFoodHistory());
    } catch {
      setHistory([]);
    }
  }

  function getSafeFinalFood(): Food | null {
    try {
      const result = recommendFood({
        foods: filteredFoods.length > 0 ? filteredFoods : foods,
        mode: recommendMode,
        filters,
      });

      return result ?? pickRandomFood();
    } catch {
      return pickRandomFood();
    }
  }

  function startRoulette() {
    if (isRolling || isHoldingFinal) return;

    const finalFood = getSafeFinalFood();

    if (!finalFood) {
      alert("추천할 메뉴가 없어요.");
      return;
    }

    setIsRolling(true);
    setIsHoldingFinal(false);
    setSelectedFood(null);
    setRollingFood(pickRandomFood());
    setResultMessage("");
    setSelectedRating(null);
    setMessageIndex(0);

    scrollToResult();

    const startedAt = Date.now();
    let timer: ReturnType<typeof setTimeout> | null = null;

    function roll() {
      const elapsed = Date.now() - startedAt;

      let speedIndex = 0;

      if (elapsed > 4000) speedIndex = 6;
      else if (elapsed > 3200) speedIndex = 5;
      else if (elapsed > 2400) speedIndex = 4;
      else if (elapsed > 1600) speedIndex = 3;
      else if (elapsed > 800) speedIndex = 2;
      else speedIndex = 1;

      setRollingFood(pickRandomFood());

      if (elapsed < ROULETTE_DURATION) {
        timer = setTimeout(roll, rouletteSpeeds[speedIndex]);
      }
    }

    roll();

    const messageTimer = setInterval(() => {
      setMessageIndex((prev) => prev + 1);
    }, 300);

    setTimeout(() => {
      if (timer) clearTimeout(timer);
      clearInterval(messageTimer);

      setRollingFood(finalFood);
      setIsRolling(false);
      setIsHoldingFinal(true);

      setTimeout(() => {
        setSelectedFood(finalFood);
        setResultMessage(finalFood.message ?? "추천 완료!");
        setIsHoldingFinal(false);

        try {
          saveFoodPick(finalFood);
          saveFoodHistory(finalFood);
          refreshStats();
          recordFoodPick(finalFood).then(() => refreshPopular());
        } catch {}

        scrollToResult();
      }, FINAL_HOLD_DURATION);
    }, ROULETTE_DURATION);
  }

  function rateFood(score: number) {
    if (!selectedFood) return;

    try {
      saveFoodRating(selectedFood, score);
    } catch {}

    setSelectedRating(score);
    recordFoodRating(selectedFood, score).then(() => refreshPopular());
  }

  async function shareFood() {
    if (!selectedFood) return;

    const url = `${window.location.origin}/eat?food=${selectedFood.id}`;

    try {
      await navigator.clipboard.writeText(url);
      alert("링크가 복사됐어요! 친구에게 공유해보세요 🔗");
    } catch {
      alert(url);
    }
  }

  function retryFood() {
    startRoulette();
  }

  return (
    <main className="relative min-h-screen bg-gray-950 py-6">
      {/* PC 좌우 광고 래퍼 */}
      <div className="xl:grid xl:grid-cols-[160px_1fr_160px] xl:items-start xl:gap-2">

        {/* 왼쪽 광고 (PC 전용) */}
        <div className="hidden xl:block xl:sticky xl:top-8 xl:pt-14">
          <KakaoAd unitId="DAN-Rx4jX8tclansKt6T" width={160} height={600} />
        </div>

        {/* 메인 콘텐츠 */}
        <div className="px-4">
      {/* 상단 헤더 */}
      <div className="mx-auto mb-6 flex max-w-7xl items-center justify-between">
        <Link href="/" className="text-sm text-gray-400 hover:text-orange-500">
          ← 홈으로
        </Link>
        <h1 className="text-lg font-bold text-white">🍚 오늘 뭐 먹지?</h1>
        <div className="w-16" />
      </div>

      {/* 3단 레이아웃 */}
      <div className="mx-auto flex max-w-7xl gap-5 lg:items-start">

        {/* 왼쪽: 설정 패널 */}
        <aside className="hidden lg:flex lg:w-72 lg:flex-shrink-0 lg:flex-col lg:gap-4">
          <div className="rounded-3xl border border-gray-700 bg-gray-800 p-5">
            <p className="mb-3 text-sm font-bold text-orange-500">오늘의 메뉴 추천</p>
            <p className="text-sm leading-6 text-gray-400">
              음식 분류와 브랜드를 고르면 오늘 먹을 메뉴를 랜덤으로 추천해줘요.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-700 bg-gray-800 p-5">
            <p className="mb-3 text-sm font-bold text-white">🍽 음식 분류</p>
            <CategorySelector
              selected={selectedCategory}
              onChange={handleCategoryChange}
              disabled={isRolling || isHoldingFinal}
            />
          </div>

          <div className="rounded-3xl border border-gray-700 bg-gray-800 p-5">
            <p className="mb-3 text-sm font-bold text-white">🎲 추천 방식</p>
            <RecommendModeSelector
              selected={recommendMode}
              onChange={setRecommendMode}
              disabled={isRolling || isHoldingFinal}
            />
          </div>

          <div className="rounded-3xl border border-gray-700 bg-gray-800 p-5">
            <FilterSelector
              filters={filters}
              onChange={handleFilterChange}
              disabled={isRolling || isHoldingFinal}
            />
          </div>

          <button
            type="button"
            onClick={() => setShowSuggest(true)}
            className="w-full rounded-2xl border border-orange-500/30 bg-gray-700 py-3 text-sm font-bold text-orange-400 active:scale-95"
          >
            🍽 메뉴 제안하기
          </button>
        </aside>

        {/* 가운데: 메인 */}
        <div className="flex min-w-0 flex-1 flex-col items-center">
          {/* 모바일 전용 설정 */}
          <div className="flex w-full flex-col gap-4 lg:hidden">
            <div className="rounded-3xl border border-gray-700 bg-gray-800 p-5 shadow-sm">
              <p className="text-sm font-bold text-orange-500">오늘의 메뉴 추천</p>
              <h2 className="mt-1 text-3xl font-bold text-white">🍚 오늘 뭐 먹지?</h2>
              <div className="mt-4 text-left">
                <p className="mb-3 text-sm font-bold text-white">🍽 음식 분류</p>
                <CategorySelector
                  selected={selectedCategory}
                  onChange={handleCategoryChange}
                  disabled={isRolling || isHoldingFinal}
                />
              </div>
            </div>
            <div className="rounded-3xl border border-gray-700 bg-gray-800 p-5 text-left shadow-sm">
              <p className="mb-3 text-sm font-bold text-white">🎲 추천 방식</p>
              <RecommendModeSelector
                selected={recommendMode}
                onChange={setRecommendMode}
                disabled={isRolling || isHoldingFinal}
              />
            </div>
            <div className="rounded-3xl border border-gray-700 bg-gray-800 p-5 shadow-sm">
              <FilterSelector
                filters={filters}
                onChange={handleFilterChange}
                disabled={isRolling || isHoldingFinal}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={startRoulette}
            disabled={isRolling || isHoldingFinal}
            className="relative z-50 mt-4 w-full rounded-3xl bg-orange-500 py-4 text-xl font-bold text-white active:scale-95 disabled:opacity-50 lg:mt-0"
          >
            {isRolling
              ? "고르는 중..."
              : isHoldingFinal
              ? "결정 중..."
              : "🎲 메뉴 뽑기"}
          </button>

          <KakaoAd />

          <div ref={resultRef} className="mt-6 w-full">
            {(isRolling || isHoldingFinal) && (
              <RouletteCard
                food={rollingFood}
                isRolling={isRolling}
                isHoldingFinal={isHoldingFinal}
                messageIndex={messageIndex}
              />
            )}
          </div>

          {selectedFood && !isRolling && !isHoldingFinal && (
            <>
              <ResultCard
                food={selectedFood}
                message={resultMessage}
                rating={selectedRating}
                onRate={rateFood}
                onRetry={retryFood}
                onShare={shareFood}
                onReview={() => setShowReview(true)}
              />
              <KakaoAd />
            </>
          )}

          {/* 모바일 전용 인기/피드/히스토리 */}
          <div className="w-full lg:hidden">
            <PopularFoods topPicked={topPicked} topRated={topRated} />
            <FeedList feeds={feeds} />
            <FoodHistory history={history} />
            <button
              type="button"
              onClick={() => setShowSuggest(true)}
              className="mt-4 w-full rounded-2xl border border-orange-500/30 bg-gray-700 py-4 text-sm font-bold text-orange-400 active:scale-95"
            >
              🍽 먹고 싶은 메뉴가 없어요? 제안하기
            </button>
            <button
              type="button"
              onClick={() => setShowReview(true)}
              className="mt-3 w-full rounded-2xl bg-orange-500 py-4 text-sm font-bold text-white active:scale-95"
            >
              ✍️ 사용후기 남기기
            </button>
          </div>
        </div>

        {/* 오른쪽: 인기 메뉴 + 피드 + 히스토리 */}
        <aside className="hidden lg:flex lg:w-72 lg:flex-shrink-0 lg:flex-col lg:gap-4">
          <PopularFoods topPicked={topPicked} topRated={topRated} />
          <FeedList feeds={feeds} />
          <FoodHistory history={history} />
          <KakaoAd />
        </aside>

      </div>

      {showSuggest && <SuggestModal onClose={() => setShowSuggest(false)} />}
      {showReview && <ReviewModal onClose={() => setShowReview(false)} />}

        </div>{/* 메인 콘텐츠 끝 */}

        {/* 오른쪽 광고 (PC 전용) */}
        <div className="hidden xl:block xl:sticky xl:top-8 xl:pt-14">
          <KakaoAd unitId="DAN-Rx4jX8tclansKt6T" width={160} height={600} />
        </div>

      </div>{/* xl grid 끝 */}

      <div className="hidden lg:flex justify-center py-4">
        <KakaoAd unitId="DAN-v96On6dbt3Krp7Pw" width={728} height={90} />
      </div>
      <Footer />
    </main>
  );
}

export default function EatPage() {
  return (
    <Suspense>
      <EatPageInner />
    </Suspense>
  );
}