"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { foods } from "@/data/foods";
import type { Food } from "@/data/foods";
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
const FINAL_HOLD_DURATION = 600;
const rouletteSpeeds = [50, 70, 90, 130, 190, 280, 420];

export default function EatPage() {
  const resultRef = useRef<HTMLDivElement | null>(null);

  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [recommendMode, setRecommendMode] = useState<RecommendMode>("smart");

  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [rollingFood, setRollingFood] = useState<Food | null>(null);

  const [isRolling, setIsRolling] = useState(false);
  const [isHoldingFinal, setIsHoldingFinal] = useState(false);

  const [messageIndex, setMessageIndex] = useState(0);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [resultMessage, setResultMessage] = useState("");

  const [history, setHistory] = useState<Food[]>([]);
  const [popularFoods, setPopularFoods] = useState<any[]>([]);

  useEffect(() => {
    refreshStats();
  }, []);

  const filteredFoods =
    selectedCategory === "전체"
      ? foods
      : foods.filter((food) => food.category === selectedCategory);

  function scrollToResult() {
    setTimeout(() => {
      resultRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  }

  function pickRandomFood() {
    const list = filteredFoods.length > 0 ? filteredFoods : foods;
    const index = Math.floor(Math.random() * list.length);
    return list[index];
  }

  function refreshStats() {
    try {
      setHistory(getFoodHistory());
      setPopularFoods(getPopularFoods(foods));
    } catch {
      setHistory([]);
      setPopularFoods([]);
    }
  }

  function getSafeFinalFood() {
    try {
      const result = recommendFood({
        foods: filteredFoods.length > 0 ? filteredFoods : foods,
        ratings: getSavedRatings(),
        picks: getSavedPicks(),
        history: getFoodHistory(),
        mode: recommendMode,
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
  }

  return (
    <main className="relative min-h-screen bg-orange-50/40 px-4 py-6">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <Link href="/" className="mb-6 text-sm text-gray-400">
          ← 홈으로
        </Link>

        <div className="w-full rounded-3xl bg-white p-6 shadow-sm">
          <h1 className="text-4xl font-bold">🍚 오늘 뭐 먹지?</h1>

          <div className="mt-5">
            <CategorySelector
              selected={selectedCategory}
              onChange={setSelectedCategory}
              disabled={isRolling || isHoldingFinal}
            />
          </div>
        </div>

        <div className="mt-5 w-full rounded-3xl bg-white p-6 shadow-sm">
          <RecommendModeSelector
            selected={recommendMode}
            onChange={setRecommendMode}
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

        {selectedFood && !isRolling && !isHoldingFinal && (
          <ResultCard
            food={selectedFood}
            message={resultMessage}
            rating={selectedRating}
            onRate={rateFood}
          />
        )}

        <div className="w-full">
          <PopularFoods foods={popularFoods} />
        </div>

        <div className="w-full">
          <FoodHistory history={history} />
        </div>
      </div>
    </main>
  );
}