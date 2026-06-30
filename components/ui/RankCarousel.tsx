"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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
const SLIDE_MS = 260;

const RANK_STYLES = [
  { bg: "bg-yellow-400", border: "border-yellow-200", medal: "🥇" },
  { bg: "bg-gray-300",   border: "border-gray-200",   medal: "🥈" },
  { bg: "bg-orange-400", border: "border-orange-200", medal: "🥉" },
  { bg: "bg-orange-300", border: "border-orange-100", medal: "" },
  { bg: "bg-orange-300", border: "border-orange-100", medal: "" },
  { bg: "bg-orange-300", border: "border-orange-100", medal: "" },
  { bg: "bg-orange-300", border: "border-orange-100", medal: "" },
  { bg: "bg-orange-300", border: "border-orange-100", medal: "" },
  { bg: "bg-orange-300", border: "border-orange-100", medal: "" },
  { bg: "bg-orange-300", border: "border-orange-100", medal: "" },
];

function ItemCard({ item, idx }: { item: CarouselItem; idx: number }) {
  const style = RANK_STYLES[idx] ?? RANK_STYLES[RANK_STYLES.length - 1];

  const inner = (
    <div className={`rounded-xl border-2 p-4 ${style.border} bg-gray-50`}>
      <div className="flex items-center gap-3">
        <div className={`flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-full ${style.bg} shadow`}>
          <span className="text-lg font-extrabold leading-none text-white">{item.rank}</span>
          {style.medal && <span className="text-xs leading-none">{style.medal}</span>}
        </div>
        <div className="min-w-0 flex-1">
          {item.badge && (
            <span className="mb-1 inline-block rounded-full bg-orange-400 px-2 py-0.5 text-xs font-medium text-white">
              {item.badge}
            </span>
          )}
          <p className="truncate font-bold text-gray-900">{item.label}</p>
          {item.sub && <p className="mt-0.5 text-xs text-gray-400">{item.sub}</p>}
        </div>
        {item.score && (
          <div className="shrink-0 text-right">
            <p className="text-base font-extrabold text-yellow-500">{item.score}</p>
            <p className="text-xs text-gray-400">IMDb</p>
          </div>
        )}
      </div>
    </div>
  );

  return item.href ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className="block">
      {inner}
    </a>
  ) : inner;
}

const animStyle = {
  animationDuration: `${SLIDE_MS}ms`,
  animationTimingFunction: "ease",
  animationFillMode: "forwards",
  WebkitAnimationFillMode: "forwards" as const,
};

export default function RankCarousel({ title, items }: Props) {
  const [current, setCurrent] = useState(0);
  const [outgoing, setOutgoing] = useState<number | null>(null);
  const [dir, setDir] = useState<"next" | "prev">("next");
  const [animating, setAnimating] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const navigate = useCallback(
    (nextIdx: number, direction: "next" | "prev") => {
      if (animating || nextIdx === current) return;
      setOutgoing(current);
      setDir(direction);
      setCurrent(nextIdx);
      setAnimating(true);
      setTimeout(() => {
        setOutgoing(null);
        setAnimating(false);
      }, SLIDE_MS);
    },
    [current, animating]
  );

  const goNext = useCallback(() => {
    navigate((current + 1) % items.length, "next");
  }, [navigate, current, items.length]);

  const goPrev = useCallback(() => {
    navigate((current - 1 + items.length) % items.length, "prev");
  }, [navigate, current, items.length]);

  function goTo(i: number) {
    navigate(i, i > current ? "next" : "prev");
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
  }, [goNext]);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) < 40) return;
    if (diff > 0) goNext(); else goPrev();
    touchStartX.current = null;
    resetTimer();
  }

  if (items.length === 0) return null;

  // next: 현재는 왼쪽으로 나가고, 다음은 오른쪽에서 들어옴
  // prev: 현재는 오른쪽으로 나가고, 다음은 왼쪽에서 들어옴
  const outClass = dir === "next" ? "carousel-out-left" : "carousel-out-right";
  const inClass  = dir === "next" ? "carousel-in-right" : "carousel-in-left";

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

      {/* 슬라이드 영역 */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        {/* 나가는 카드 */}
        {animating && outgoing !== null && (
          <div
            key={`out-${outgoing}`}
            className={outClass}
            style={{ position: "absolute", top: 0, left: 0, right: 0, ...animStyle }}
          >
            <ItemCard item={items[outgoing]} idx={outgoing} />
          </div>
        )}
        {/* 들어오는 카드 */}
        <div
          key={`in-${current}`}
          className={animating ? inClass : ""}
          style={animating ? animStyle : undefined}
        >
          <ItemCard item={items[current]} idx={current} />
        </div>
      </div>
    </div>
  );
}
