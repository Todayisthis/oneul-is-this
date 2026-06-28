"use client";

import { useState } from "react";
import Link from "next/link";
import { foods, foodCategories, type Food } from "@/data/foods";
import { rouletteConfig, rouletteMessages } from "@/data/messages";

type RatingData = {
  totalScore: number;
  count: number;
};

export default function EatPage() {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [rollingFood, setRollingFood] = useState<Food | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const filteredFoods =
    selectedCategory === "전체"
      ? foods
      : foods.filter((food) => food.category === selectedCategory);

  function pickRandomFood() {
    const randomIndex = Math.floor(Math.random() * filteredFoods.length);
    return filteredFoods[randomIndex];
  }

  function startRoulette() {
    if (isRolling) return;

    setIsRolling(true);
    setSelectedFood(null);
    setRollingFood(null);
    setSelectedRating(null);
    setMessageIndex(0);

    const finalFood = pickRandomFood();

    const foodTimer = setInterval(() => {
      setRollingFood(pickRandomFood());
    }, rouletteConfig.tickSpeed);

    const messageTimer = setInterval(() => {
      setMessageIndex((prev) =>
        prev < rouletteMessages.length - 1 ? prev + 1 : prev
      );
    }, rouletteConfig.duration / rouletteMessages.length);

    setTimeout(() => {
      clearInterval(foodTimer);
      clearInterval(messageTimer);
      setRollingFood(finalFood);
      setSelectedFood(finalFood);
      setIsRolling(false);
    }, rouletteConfig.duration);
  }

  function rateFood(score: number) {
    if (!selectedFood) return;

    const storageKey = "foodRatings";
    const savedRatings = localStorage.getItem(storageKey);
    const ratings: Record<string, RatingData> = savedRatings
      ? JSON.parse(savedRatings)
      : {};

    const current = ratings[selectedFood.id] ?? {
      totalScore: 0,
      count: 0,
    };

    ratings[selectedFood.id] = {
      totalScore: current.totalScore + score,
      count: current.count + 1,
    };

    localStorage.setItem(storageKey, JSON.stringify(ratings));
    setSelectedRating(score);
  }

  return (
    <main className="min-h-screen bg-white px-6 py-12">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <Link
          href="/"
          className="mb-10 text-sm text-gray-400 hover:text-gray-700"
        >
          ← 홈으로
        </Link>

        <h1 className="text-5xl font-bold text-gray-900">🍚 오늘 뭐 먹지?</h1>

        <p className="mt-6 text-xl text-gray-600">
          카테고리를 고르고 오늘의 메뉴를 뽑아보세요.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {foodCategories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setSelectedFood(null);
                setRollingFood(null);
                setSelectedRating(null);
              }}
              disabled={isRolling}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                selectedCategory === category
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              } ${isRolling ? "cursor-not-allowed opacity-60" : ""}`}
            >
              {category}
            </button>
          ))}
        </div>

        <button
          onClick={startRoulette}
          disabled={isRolling}
          className={`mt-10 rounded-2xl px-8 py-4 text-xl font-semibold text-white transition ${
            isRolling
              ? "cursor-not-allowed bg-gray-400"
              : "bg-orange-500 hover:bg-orange-600"
          }`}
        >
          {isRolling ? "고르는 중..." : "🎲 메뉴 뽑기"}
        </button>

        {(isRolling || rollingFood) && (
          <section className="mt-12 w-full rounded-3xl border border-orange-100 bg-orange-50 p-8">
            <div className={`text-7xl ${isRolling ? "animate-bounce" : ""}`}>
              {rollingFood?.emoji ?? "🎲"}
            </div>

            <p className="mt-6 text-lg font-semibold text-orange-500">
              {isRolling ? rouletteMessages[messageIndex] : "✨ 오늘은 이거다!"}
            </p>

            {!isRolling && selectedFood && (
              <>
                <h2 className="mt-3 text-4xl font-bold text-gray-900">
                  {selectedFood.name}
                </h2>

                <p className="mt-4 text-lg text-gray-700">
                  {selectedFood.message}
                </p>

                <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
                  <div className="rounded-2xl bg-white p-4">
                    <p className="text-gray-400">가격</p>
                    <p className="mt-1 font-bold text-gray-800">
                      {selectedFood.price.toLocaleString()}원
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white p-4">
                    <p className="text-gray-400">맵기</p>
                    <p className="mt-1 font-bold text-gray-800">
                      {"🌶️".repeat(selectedFood.spicy) || "없음"}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white p-4">
                    <p className="text-gray-400">분류</p>
                    <p className="mt-1 font-bold text-gray-800">
                      {selectedFood.subCategory}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {selectedFood.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white px-3 py-1 text-sm text-gray-500"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl bg-white p-5">
                  <p className="text-sm font-semibold text-gray-700">
                    이 메뉴 선정, 마음에 드나요?
                  </p>

                  <div className="mt-3 flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((score) => (
                      <button
                        key={score}
                        onClick={() => rateFood(score)}
                        className={`text-3xl transition hover:scale-110 ${
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
                    <p className="mt-3 text-sm text-orange-500">
                      평가 고마워요! 더 좋은 추천에 반영할게요.
                    </p>
                  )}
                </div>
              </>
            )}
          </section>
        )}
      </div>
    </main>
  );
}