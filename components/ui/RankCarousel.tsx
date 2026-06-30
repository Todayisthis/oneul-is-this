"use client";

import { useEffect, useRef, useState } from "react";

export type CarouselItem = {
  id: number | string;
  rank: number;
  label: string;
  sub?: string;
  badge?: string;
  score?: string;
  href?: string;
};

type Props = {
  title: string;
  items: CarouselItem[];
};

const INTERVAL_MS = 3000;
const FADE_MS = 250;

const RANK_STYLES = [
  { bg: "bg-yellow-400", border: "border-yellow-200", medal: "🥇" },
  { bg: "bg-gray-300",   border: "border-gray-200",   medal: "🥈" },
  { bg: "bg-orange-400", border: "border-orange-200", medal: "🥉" },
  { bg: "bg-gray-200",   border: "border-gray-100",   medal: "" },
  { bg: "bg-gray-200",   border: "border-gray-100",   medal: "" },
  { bg: "bg-gray-200",   border: "border-gray-100",   medal: "" },
  { bg: "bg-gray-200",   border: "border-gray-100",   medal: "" },
  { bg: "bg-gray-200",   border: "border-gray-100",   medal: "" },
  { bg: "bg-gray-200",   border: "border-gray-100",   medal: "" },
  { bg: "bg-gray-200",   border: "border-gray-100",   medal: "" },
];

export default function RankCarousel({ title, items }: Props) {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  const touchStartX = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function goTo(i: number) {
    if (i === current) return;
    setVisible(false);
    setTimeout(() => { setCurrent(i); setVisible(true); }, FADE_MS);
  }

  function goNext() {
    setVisible(false);
    setTimeout(() => { setCurrent((prev) => (prev + 1) % items.length); setVisible(true); }, FADE_MS);
  }

  function goPrev() {
    setVisible(false);
    setTimeout(() => { setCurrent((prev) => (prev - 1 + items.length) % items.length); setVisible(true); }, FADE_MS);
  }

  function resetTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
    if (items.length <= 1) return;
    timerRef.current = setInterval(goNext, INTERVAL_MS);
  }

  useEffect(() => {
    if (items.length <= 1) return;
    timerRef.current = setInterval(goNext, INTERVAL_MS);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [items.length]);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) < 40) return; // 40px 미만은 무시
    if (diff > 0) goNext(); else goPrev();
    touchStartX.current = null;
    resetTimer();
  }

  if (items.length === 0) return null;

  const item = items[current];
  const style = RANK_STYLES[current] ?? RANK_STYLES[RANK_STYLES.length - 1];

  const inner = (
    <div className={`rounded-xl border-2 p-4 ${style.border} bg-gray-50`}>
      <div className="flex items-center gap-3">
        {/* 순위 배지 */}
        <div className={`flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-full ${style.bg} shadow`}>
          <span className="text-lg font-extrabold leading-none text-white">{item.rank}</span>
          {style.medal && <span className="text-xs leading-none">{style.medal}</span>}
        </div>

        {/* 정보 */}
        <div className="min-w-0 flex-1">
          {item.badge && (
            <span className={`mb-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium text-white ${style.bg}`}>
              {item.badge}
            </span>
          )}
          <p className="truncate font-bold text-gray-900">{item.label}</p>
          {item.sub && <p className="mt-0.5 text-xs text-gray-400">{item.sub}</p>}
        </div>

        {/* 점수 */}
        {item.score && (
          <div className="shrink-0 text-right">
            <p className="text-base font-extrabold text-yellow-500">{item.score}</p>
            <p className="text-xs text-gray-400">IMDb</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div
      className="rounded-2xl bg-white p-5 shadow-sm"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* 제목 + 인디케이터 */}
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-bold text-gray-700">{title}</p>
        <div className="flex gap-1">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-4 bg-orange-500" : "w-1.5 bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* 카드 */}
      <div
        style={{ transition: `opacity ${FADE_MS}ms ease, transform ${FADE_MS}ms ease` }}
        className={visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}
      >
        {item.href ? (
          <a href={item.href} target="_blank" rel="noopener noreferrer" className="block">
            {inner}
          </a>
        ) : inner}
      </div>
    </div>
  );
}
