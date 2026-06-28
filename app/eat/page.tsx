"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { foods } from "@/data/foods";
import { recommendFood, type RecommendMode } from "@/lib/recommendEngine";

import {
  getFoodHistory,
  getPopularFoods,
  getSavedPicks,
  getSavedRatings,
  saveFoodHistory,
  saveFoodPick,
  saveFoodRating,
} from "@/lib/foodStats";

import CategorySelector from "@/components/eat/CategorySelector";
import RecommendModeSelector from "@/components/eat/RecommendModeSelector";
import RouletteCard from "@/components/eat/RouletteCard";
import ResultCard from "@/components/eat/ResultCard";
import PopularFoods from "@/components/eat/PopularFoods";
import FoodHistory from "@/components/eat/FoodHistory";

const ROULETTE_DURATION = 5000;
const FINAL_HOLD_DURATION = 500;

const rouletteSpeeds = [50, 70, 90, 130, 190, 280, 420];

export default function EatPage() {
  // ✅ ref 타입 수정 (핵심 수정)
  const resultRef = useRef<HTMLDivElement | null>(null);

  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [recommendMode, setRecommendMode] =
    useState<RecommendMode>("smart");

  const [selectedFood, setSelectedFood] = useState<any>(null);
  const [rollingFood, setRollingFood] = useState<any>(null);

  const [isRolling, setIsRolling] = useState(false);
  const [isHoldingFinal, setIsHoldingFinal] = useState(false);

  const [messageIndex, setMessageIndex] = useState(0);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [resultMessage, setResultMessage] = useState("");

  const [history, setHistory] = useState<any[]>([]);
  const [popularFoods, setPopularFoods] = useState<any[]>([]);

  // 초기 데이터 로딩
  useEffect(() => {
    refreshStats();
  }, []);

  const filteredFoods =
    selectedCategory === "전체"
      ? foods
      : foods.filter((f) => f.category === selectedCategory);

  function scrollToResult() {
    setTimeout(() => {
      resultRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  }

  function pickRandomFood() {
    const i = Math.floor(Math.random() * filteredFoods.length);
    return filteredFoods[i];
  }

  function refreshStats() {
    setHistory(getFoodHistory());
    setPopularFoods(getPopularFoods(foods));
  }

  function startRoulette() {
    if (isRolling || isHoldingFinal) return;

    setIsRolling(true);
    setSelectedFood(null);
    setRollingFood(null);
    setResultMessage("");
    setSelectedRating(null);
    setMessageIndex(0);

    scrollToResult();

    const finalFood = recommendFood({
      foods: filteredFoods,
      ratings: getSavedRatings(),
      picks: getSavedPicks(),
      history: getFoodHistory(),
      mode: recommendMode,
    });

    if (!finalFood) {
      setIsRolling(false);
      return;
    }

    const start = Date.now();
    let timer: any;

    function roll() {
      const elapsed = Date.now() - start;

      let speedIndex = 0;

      if (elapsed > 4000) speedIndex = 6;
      else if (elapsed > 3500) speedIndex = 5;
      else if (elapsed > 3000) speedIndex = 4;
      else if (elapsed > 2500) speedIndex = 3;
      else if (elapsed > 1500) speedIndex = 2;
      else if (elapsed > 500) speedIndex = 1;

      setRollingFood(pickRandomFood());

      if (elapsed < ROULETTE_DURATION) {
        timer = setTimeout(roll, rouletteSpeeds[speedIndex]);
      }
    }

    roll();

    const messageTimer = setInterval(() => {
      setMessageIndex((p) => p + 1);
    }, 300);

    setTimeout(() => {
      clearTimeout(timer);
      clearInterval(messageTimer);

      setRollingFood(finalFood);
      setIsRolling(false);
      setIsHoldingFinal(true);

      setTimeout(() => {
        setSelectedFood(finalFood);
        setResultMessage(finalFood.message ?? "추천 완료!");
        setIsHoldingFinal(false);

        saveFoodPick(finalFood);
        saveFoodHistory(finalFood);

        refreshStats();
        scrollToResult();
      }, FINAL_HOLD_DURATION);
    }, ROULETTE_DURATION);
  }

  function rateFood(score: number) {
    if (!selectedFood) return;
    saveFoodRating(selectedFood, score);
    setSelectedRating(score);
  }

  return (
    <main className="min-h-screen bg-orange-50/40 px-4 py-6">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">

        <Link href="/" className="mb-6 text-sm text-gray-400">
          ← 홈으로
        </Link>

        {/* 제목 */}
        <div className="w-full rounded-3xl bg-white p-6 shadow-sm">
          <h1 className="text-4xl font-bold">🍚 오늘 뭐 먹지?</h1>
          <p className="mt-2 text-gray-500">
            카테고리 + 추천 방식 선택 후 메뉴를 뽑아요
          </p>

          <div className="mt-5">
            <CategorySelector
              selected={selectedCategory}
              onChange={setSelectedCategory}
              disabled={isRolling || isHoldingFinal}
            />
          </div>
        </div>

        {/* 추천 방식 */}
        <div className="mt-5 w-full rounded-3xl bg-white p-6 shadow-sm">
          <RecommendModeSelector
            selected={recommendMode}
            onChange={setRecommendMode}
            disabled={isRolling || isHoldingFinal}
          />
        </div>

        {/* 버튼 */}
        <button
          onClick={startRoulette}
          disabled={isRolling || isHoldingFinal}
          className="mt-6 w-full rounded-3xl bg-orange-500 py-4 text-xl font-bold text-white disabled:opacity-50"
        >
          {isRolling ? "고르는 중..." : "🎲 메뉴 뽑기"}
        </button>

        {/* 룰렛 */}
        <div ref={resultRef} className="mt-8 w-full">
          {(isRolling || rollingFood) && (
            <RouletteCard
              food={rollingFood}
              isRolling={isRolling}
              isHoldingFinal={isHoldingFinal}
              messageIndex={messageIndex}
            />
          )}
        </div>

        {/* 결과 */}
        {selectedFood && !isRolling && !isHoldingFinal && (
          <ResultCard
            food={selectedFood}
            message={resultMessage}
            rating={selectedRating}
            onRate={rateFood}
          />
        )}

        {/* 인기 */}
        <PopularFoods foods={popularFoods} />

        {/* 히스토리 */}
        <FoodHistory history={history} />
      </div>
    </main>
  );
}