"use client";

import { useState } from "react";
import Link from "next/link";

const features = [
  {
    emoji: "🍚",
    title: "오늘 뭐 먹지?",
    href: "/eat",
    description: (
      <>
        <p className="leading-7 text-gray-400">
          매일 점심시간마다 팀원들과 &quot;오늘 뭐 먹지?&quot;로 시작하는 10분짜리 회의, 익숙하지 않으신가요?
          퇴근 후 배달앱을 열어놓고 30분째 아무것도 고르지 못한 경험은요?
        </p>
        <p className="mt-3 leading-7 text-gray-400">
          국물·찌개, 밥·덮밥, 면류, 분식, 고기·구이, 치킨, 피자, 패스트푸드 등
          원하는 카테고리를 선택하면 딱 하나를 골라드립니다.
          마음에 안 들면 다시 뽑으면 그만이에요.
        </p>
        <p className="mt-3 leading-7 text-gray-400">
          결정 피로를 줄이고, 소중한 시간을 아끼세요.
        </p>
      </>
    ),
  },
  {
    emoji: "🎬",
    title: "오늘 뭐 보지?",
    href: "/watch",
    description: (
      <>
        <p className="leading-7 text-gray-400">
          넷플릭스를 켜서 30분째 무엇을 볼지 고르다가 결국 유튜브를 보게 된 경험, 다들 있으시죠?
        </p>
        <p className="mt-3 leading-7 text-gray-400">
          현재 넷플릭스 한국에서 서비스 중인 1,000개 이상의 작품 중에서
          원하는 장르를 선택하면 딱 하나를 추천해드려요.
          추천 결과에서 바로 넷플릭스 앱으로 이동도 가능해요.
        </p>
        <p className="mt-3 leading-7 text-gray-400">
          액션, 로맨스, 코미디, 공포, SF, 드라마 등 다양한 장르를 조합해서 골라보세요.
        </p>
      </>
    ),
  },
  {
    emoji: "📍",
    title: "오늘 어디 가지?",
    href: null,
    description: (
      <p className="leading-7 text-gray-400">
        주말에 어디 갈지 고민될 때, 근처 맛집·카페·공원을 랜덤으로 추천해드릴 예정이에요.
        <span className="ml-2 rounded-full bg-gray-700 px-2 py-0.5 text-xs text-gray-400">개발 중</span>
      </p>
    ),
  },
  {
    emoji: "☕",
    title: "오늘 뭐 마시지?",
    href: null,
    description: (
      <p className="leading-7 text-gray-400">
        커피, 차, 음료 등 오늘 마실 음료를 랜덤으로 추천해드릴 예정이에요.
        <span className="ml-2 rounded-full bg-gray-700 px-2 py-0.5 text-xs text-gray-400">개발 중</span>
      </p>
    ),
  },
];

export default function FeatureCards() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(i: number) {
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {features.map((f, i) => {
        const isOpen = openIndex === i;
        const isDisabled = !f.href;
        return (
          <div
            key={f.title}
            className={`rounded-2xl border bg-gray-900 transition ${
              isDisabled
                ? "border-gray-800 opacity-50"
                : "cursor-pointer border-gray-800 hover:border-orange-500/40 hover:bg-gray-800"
            }`}
          >
            <button
              className="flex w-full items-center justify-between p-6 text-left"
              onClick={() => !isDisabled && toggle(i)}
              disabled={isDisabled}
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl">{f.emoji}</span>
                <span className="text-xl font-bold text-white">{f.title}</span>
              </div>
              {!isDisabled && (
                <span className={`text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                  ▾
                </span>
              )}
            </button>

            {isOpen && (
              <div className="border-t border-gray-800 px-6 pb-6 pt-4">
                {f.description}
                {f.href && (
                  <Link
                    href={f.href}
                    className="mt-5 inline-block rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-orange-600"
                    onClick={(e) => e.stopPropagation()}
                  >
                    바로가기 →
                  </Link>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
