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

export default function RankCarousel({ title, items }: Props) {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  const currentRef = useRef(0);
  const fadingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);


  useEffect(() => { currentRef.current = current; }, [current]);

  function goTo(nextIdx: number) {
    if (fadingRef.current || nextIdx === currentRef.current) return;
    fadingRef.current = true;
    setVisible(false);
    setTimeout(() => {
      setCurrent(nextIdx);
      currentRef.current = nextIdx;
      setVisible(true);
      fadingRef.current = false;
    }, FADE_MS);
  }

  function startTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
    if (items.length <= 1) return;
    timerRef.current = setInterval(() => {
      const next = (currentRef.current + 1) % items.length;
      goTo(next);
    }, INTERVAL_MS);
  }

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  if (items.length === 0) return null;

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      {/* 제목 */}
      <div className="mb-3">
        <p className="text-sm font-bold text-gray-700">{title}</p>
      </div>

      {/* 카드 */}
      <div
        style={{
          opacity: visible ? 1 : 0,
          transition: `opacity ${FADE_MS}ms ease`,
          WebkitTransition: `opacity ${FADE_MS}ms ease`,
        }}
      >
        <ItemCard item={items[current]} idx={current} />
      </div>
    </div>
  );
}
