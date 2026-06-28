"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { foods, foodCategories, type Food } from "@/data/foods";
import { rouletteMessages } from "@/data/messages";
import {
  getFoodHistory,
  getPopularFoods,
  getSavedPicks,
  getSavedRatings,
  saveFoodHistory,
  saveFoodPick,
  saveFoodRating,
} from "@/lib/foodStats";
import { recommendFood, type RecommendMode } from "@/lib/recommendEngine";

const ROULETTE_DURATION = 5000;
const FINAL_HOLD_DURATION = 500;
const rouletteSpeeds = [50, 70, 90, 130, 190, 280, 420];

const recommendModes: {
  id: RecommendMode;
  label: string;
  description: string;
}[] = [
  {
    id: "smart",
    label: "⭐ 만족도 반영",
    description: "별점과 인기도를 반영해 추천해요.",
  },
  {
    id: "excludeRecent",
    label: "🔄 최근 메뉴 제외",
    description: "최근 뽑은 메뉴는 빼고 추천해요.",
  },
  {
    id: "popular",
    label: "🔥 인기 메뉴 위주",
    description: "자주 뽑힌 메뉴를 더 자주 추천해요.",
  },
  {
    id: "random",
    label: "🎲 완전 랜덤",
    description: "모든 메뉴를 같은 확률로 추천해요.",
  },
];

const fallbackMessages = [
  "오늘은 이 메뉴가 딱 어울립니다.",
  "고민하지 말고 이걸로 가도 좋습니다.",
  "오늘의 선택은 꽤 괜찮아 보입니다.",
  "이 메뉴라면 실패 확률이 낮습니다.",
];

type PopularFoodItem = {
  food: Food;
  count: number;
};

export default function EatPage() {
  const resultRef = useRef<HTMLElement | null>(null);

  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [recommendMode, setRecommendMode] = useState<RecommendMode>("smart");
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [rollingFood, setRollingFood] = useState<Food | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [isHoldingFinal, setIsHoldingFinal] = useState(false);
  const [showResultDetails, setShowResultDetails] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [resultMessage, setResultMessage] = useState("");
  const [history, setHistory] = useState<Food[]>([]);
  const [popularFoods, setPopularFoods] = useState<PopularFoodItem[]>([]);

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

  function pickRandomRollingFood() {
    const randomIndex = Math.floor(Math.random() * filteredFoods.length);
    return filteredFoods[randomIndex];
  }

  function pickResultMessage(food: Food) {
    const messages = [food.message, ...fallbackMessages];
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  }

  function refreshStats() {
    setHistory(getFoodHistory());
    setPopularFoods(getPopularFoods(foods));
  }

  function startRoulette() {
    if (isRolling || isHoldingFinal) return;

    setIsRolling(true);
    setIsHoldingFinal(false);
    setShowResultDetails(false);
    setSelectedFood(null);
    setRollingFood(null);
    setSelectedRating(null);
    setResultMessage("");
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

    const startedAt = Date.now();
    let speedIndex = 0;
    let currentTimer: ReturnType<typeof setTimeout>;

    function roll() {
      const elapsed = Date.now() - startedAt;
      const progress = elapsed / ROULETTE_DURATION;

      if (progress > 0.85) speedIndex = 6;
      else if (progress > 0.7) speedIndex = 5;
      else if (progress > 0.55) speedIndex = 4;
      else if (progress > 0.4) speedIndex = 3;
      else if (progress > 0.25) speedIndex = 2;
      else if (progress > 0.1) speedIndex = 1;

      setRollingFood(pickRandomRollingFood());

      if (elapsed < ROULETTE_DURATION) {
        currentTimer = setTimeout(roll, rouletteSpeeds[speedIndex]);
      }
    }

    roll();

    const messageTimer = setInterval(() => {
      setMessageIndex((prev) =>
        prev < rouletteMessages.length - 1 ? prev + 1 : prev
      );
    }, ROULETTE_DURATION / rouletteMessages.length);

    setTimeout(() => {
      clearTimeout(currentTimer);
      clearInterval(messageTimer);

      setRollingFood(finalFood);
      setIsRolling(false);
      setIsHoldingFinal(true);

      setTimeout(() => {
        setSelectedFood(finalFood);
        setResultMessage(pickResultMessage(finalFood));
        setIsHoldingFinal(false);
        setShowResultDetails(true);

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
    <main className="min-h-screen bg-orange-50/40 px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <Link
          href="/"
          className="mb-5 text-sm font-medium text-gray-400 hover:text-gray-700 sm:mb-8"
        >
          ← 홈으로
        </Link>

        <section className="w-full rounded-[2rem] bg-white px-5 py-8 shadow-sm sm:px-8 sm:py-10">
          <p className="text-sm font-bold text-orange-500">
            AI 랜덤 추천 서비스
          </p>

          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            🍚 오늘 뭐 먹지?
          </h1>

          <p className="mt-5 text-base leading-7 text-gray-600 sm:text-xl sm:leading-9">
            카테고리와 추천 방식을 고르고
            <br className="sm:hidden" />
            오늘의 메뉴를 뽑아보세요.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-2 sm:gap-3">
            {foodCategories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setSelectedFood(null);
                  setRollingFood(null);
                  setSelectedRating(null);
                  setResultMessage("");
                  setShowResultDetails(false);
                }}
                disabled={isRolling || isHoldingFinal}
                className={`rounded-full px-4 py-2 text-sm font-bold transition sm:px-5 ${
                  selectedCategory === category
                    ? "bg-orange-500 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                } ${
                  isRolling || isHoldingFinal
                    ? "cursor-not-allowed opacity-60"
                    : ""
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-5 w-full rounded-[2rem] bg-white p-5 shadow-sm sm:mt-6 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="text-left">
              <p className="text-sm font-bold text-gray-800">추천 방식</p>
              <p className="mt-1 text-xs text-gray-400">
                원하는 방식으로 메뉴를 골라요.
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2 sm:gap-3">
            {recommendModes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setRecommendMode(mode.id)}
                disabled={isRolling || isHoldingFinal}
                className={`rounded-2xl p-4 text-left transition ${
                  recommendMode === mode.id
                    ? "bg-orange-500 text-white shadow-sm"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                } ${
                  isRolling || isHoldingFinal
                    ? "cursor-not-allowed opacity-60"
                    : ""
                }`}
              >
                <p className="text-sm font-extrabold sm:text-base">
                  {mode.label}
                </p>
                <p
                  className={`mt-1 text-xs leading-5 ${
                    recommendMode === mode.id
                      ? "text-orange-50"
                      : "text-gray-400"
                  }`}
                >
                  {mode.description}
                </p>
              </button>
            ))}
          </div>
        </section>

        <button
          onClick={startRoulette}
          disabled={isRolling || isHoldingFinal}
          className={`mt-6 w-full rounded-3xl px-8 py-5 text-xl font-extrabold text-white shadow-sm transition sm:w-auto sm:px-12 ${
            isRolling || isHoldingFinal
              ? "cursor-not-allowed bg-gray-400"
              : "bg-orange-500 hover:bg-orange-600"
          }`}
        >
          {isRolling
            ? "고르는 중..."
            : isHoldingFinal
            ? "결정 중..."
            : "🎲 메뉴 뽑기"}
        </button>

        {(isRolling || isHoldingFinal || rollingFood) && (
          <section
            ref={resultRef}
            className={`mt-7 w-full rounded-[2rem] border border-orange-100 bg-white p-5 shadow-sm transition-all duration-500 sm:mt-8 sm:p-8 ${
              showResultDetails ? "scale-100 opacity-100" : "scale-95 opacity-95"
            }`}
          >
            <div className="rounded-[2rem] bg-orange-50 px-5 py-8 sm:py-10">
              <div
                className={`text-7xl transition-all duration-500 sm:text-8xl ${
                  isRolling
                    ? "animate-bounce"
                    : isHoldingFinal
                    ? "scale-125"
                    : "scale-110"
                }`}
              >
                {rollingFood?.emoji ?? "🎲"}
              </div>

              <p className="mt-6 text-base font-bold text-orange-500 sm:text-lg">
                {isRolling
                  ? rouletteMessages[messageIndex]
                  : isHoldingFinal
                  ? "잠깐만요... 거의 정해졌습니다."
                  : "✨ 오늘은 이거다!"}
              </p>
            </div>

            {!isRolling && !isHoldingFinal && selectedFood && showResultDetails && (
              <div className="animate-[fadeIn_0.5s_ease-out]">
                <div className="mt-7 rounded-[2rem] bg-white">
                  <p className="text-base font-bold text-gray-500 sm:text-lg">
                    오늘은
                  </p>

                  <h2 className="mt-2 text-4xl font-black tracking-tight text-gray-900 sm:text-6xl">
                    {selectedFood.name}
                  </h2>

                  <p className="mt-2 text-2xl font-black text-orange-500 sm:text-3xl">
                    이거다!
                  </p>

                  <p className="mx-auto mt-5 max-w-md text-base leading-7 text-gray-700 sm:text-lg">
                    {resultMessage}
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-2 text-sm sm:gap-3">
                  <div className="rounded-2xl bg-orange-50 p-3 sm:p-4">
                    <p className="text-xs text-gray-400">가격</p>
                    <p className="mt-1 font-extrabold text-gray-800">
                      {selectedFood.price.toLocaleString()}원
                    </p>
                  </div>

                  <div className="rounded-2xl bg-orange-50 p-3 sm:p-4">
                    <p className="text-xs text-gray-400">맵기</p>
                    <p className="mt-1 font-extrabold text-gray-800">
                      {"🌶️".repeat(selectedFood.spicy) || "없음"}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-orange-50 p-3 sm:p-4">
                    <p className="text-xs text-gray-400">분류</p>
                    <p className="mt-1 font-extrabold text-gray-800">
                      {selectedFood.subCategory}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {selectedFood.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-500"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="mt-7 rounded-[2rem] bg-gray-50 p-5">
                  <p className="text-sm font-bold text-gray-700">
                    이 메뉴 선정, 마음에 드나요?
                  </p>

                  <div className="mt-3 flex justify-center gap-1 sm:gap-2">
                    {[1, 2, 3, 4, 5].map((score) => (
                      <button
                        key={score}
                        onClick={() => rateFood(score)}
                        className={`text-3xl transition hover:scale-110 sm:text-4xl ${
                          selectedRating && score <= selectedRating
                            ? "opacity-100"
                            : "opacity-40"
                        }`}
                      >
                        ⭐
                      </button>
                    ))}
                  </div>

                  {selectedRating && (
                    <p className="mt-3 text-sm font-medium text-orange-500">
                      평가 고마워요! 더 좋은 추천에 반영할게요.
                    </p>
                  )}
                </div>
              </div>
            )}
          </section>
        )}

        {popularFoods.length > 0 && (
          <section className="mt-6 w-full rounded-[2rem] bg-white p-5 shadow-sm sm:p-6">
            <p className="text-sm font-extrabold text-gray-800">
              🔥 지금 인기 메뉴
            </p>

            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {popularFoods.map((item, index) => (
                <div key={item.food.id} className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xs font-bold text-orange-500">
                    #{index + 1}
                  </p>
                  <p className="mt-1 text-3xl">{item.food.emoji}</p>
                  <p className="mt-1 font-extrabold text-gray-800">
                    {item.food.name}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {history.length > 0 && (
          <section className="mt-6 w-full rounded-[2rem] bg-white p-5 shadow-sm sm:p-6">
            <p className="text-sm font-extrabold text-gray-800">
              🕘 최근 뽑은 메뉴
            </p>

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {history.map((food, index) => (
                <span
                  key={`${food.id}-${index}`}
                  className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600"
                >
                  {food.emoji} {food.name}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}