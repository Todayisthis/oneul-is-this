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
import { recordFoodPick, recordFoodRating, getTopFoods, type PopularItem } from "@/lib/firebaseStats";

import CategorySelector from "@/components/eat/CategorySelector";
import RecommendModeSelector from "@/components/eat/RecommendModeSelector";
import FilterSelector from "@/components/eat/FilterSelector";
import RouletteCard from "@/components/eat/RouletteCard";
import ResultCard from "@/components/eat/ResultCard";
import PopularFoods from "@/components/eat/PopularFoods";
import FoodHistory from "@/components/eat/FoodHistory";
import AdPlaceholder from "@/components/ads/AdPlaceholder";
import Footer from "@/components/layout/Footer";

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

  const [messageIndex, setMessageIndex] = useState(0);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [resultMessage, setResultMessage] = useState("");

  const [history, setHistory] = useState<Food[]>([]);
  const [popularFoods, setPopularFoods] = useState<PopularItem[]>([]);

  async function refreshPopular() {
    const top = await getTopFoods(5);
    setPopularFoods(top);
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
    <main className="relative min-h-screen bg-orange-50 px-4 py-6">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <Link
          href="/"
          className="mb-6 text-sm text-gray-400 hover:text-orange-500"
        >
          ← 홈으로
        </Link>

        <div className="w-full rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm font-bold text-orange-500">오늘의 메뉴 추천</p>

          <h1 className="mt-2 text-4xl font-bold">🍚 오늘 뭐 먹지?</h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            음식 분류와 브랜드를 고르면 오늘 먹을 메뉴를 랜덤으로 추천해줘요.
          </p>

          <div className="mt-6 text-left">
            <p className="mb-3 text-sm font-bold text-gray-700">🍽 음식 분류</p>

            <CategorySelector
              selected={selectedCategory}
              onChange={handleCategoryChange}
              disabled={isRolling || isHoldingFinal}
            />
          </div>
        </div>

        <div className="mt-5 w-full rounded-3xl bg-white p-6 text-left shadow-sm">
          <p className="mb-3 text-sm font-bold text-gray-700">🎲 추천 방식</p>

          <RecommendModeSelector
            selected={recommendMode}
            onChange={setRecommendMode}
            disabled={isRolling || isHoldingFinal}
          />
        </div>

        <div className="mt-5 w-full rounded-3xl bg-white p-6 shadow-sm">
          <FilterSelector
            filters={filters}
            onChange={handleFilterChange}
            disabled={isRolling || isHoldingFinal}
          />
        </div>

        <button
          type="button"
          onClick={startRoulette}
          disabled={isRolling || isHoldingFinal}
          className="relative z-50 mt-6 w-full rounded-3xl bg-orange-500 py-4 text-xl font-bold text-white active:scale-95 disabled:opacity-50"
        >
          {isRolling
            ? "고르는 중..."
            : isHoldingFinal
            ? "결정 중..."
            : "🎲 메뉴 뽑기"}
        </button>

        <AdPlaceholder label="가로 배너 광고" height="small" />

        <div ref={resultRef} className="mt-8 w-full">
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
            />

            <AdPlaceholder label="사각형 광고" height="medium" />
          </>
        )}

        <div className="w-full">
          <PopularFoods foods={popularFoods} />
        </div>

        <AdPlaceholder label="콘텐츠 중간 광고" height="small" />

        <div className="w-full">
          <FoodHistory history={history} />
        </div>
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