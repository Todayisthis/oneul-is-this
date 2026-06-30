"use client";

import { useEffect, useState } from "react";

export type RankItem = {
  id: number | string;
  label: string;
  sub?: string;
  emoji?: string;
};

type Props = {
  title: string;
  items: RankItem[];
};

const RANK_STYLES = [
  { num: "text-yellow-500", bg: "bg-yellow-400", ring: "ring-yellow-300" },
  { num: "text-gray-400",   bg: "bg-gray-300",   ring: "ring-gray-200" },
  { num: "text-orange-400", bg: "bg-orange-400",  ring: "ring-orange-200" },
  { num: "text-gray-300",   bg: "bg-gray-200",    ring: "ring-gray-100" },
  { num: "text-gray-300",   bg: "bg-gray-200",    ring: "ring-gray-100" },
];

export default function RankList({ title, items }: Props) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (items.length === 0) return;
    setVisibleCount(0);
    const timers: ReturnType<typeof setTimeout>[] = [];
    items.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleCount(i + 1), i * 300 + 200));
    });
    return () => timers.forEach(clearTimeout);
  }, [items]);

  if (items.length === 0) return null;

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <p className="mb-4 text-sm font-bold text-gray-700">{title}</p>
      <ol className="flex flex-col gap-3">
        {items.map((item, i) => {
          const style = RANK_STYLES[i] ?? RANK_STYLES[4];
          const visible = i < visibleCount;
          return (
            <li
              key={item.id}
              className={`flex items-center gap-3 transition-all duration-500 ${
                visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
            >
              {/* 순위 숫자 */}
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-extrabold text-white ring-2 ring-offset-1 ${style.bg} ${style.ring}`}
              >
                {i + 1}
              </span>

              {/* 이모지 */}
              {item.emoji && (
                <span className="shrink-0 text-xl">{item.emoji}</span>
              )}

              {/* 텍스트 */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-gray-800">{item.label}</p>
                {item.sub && (
                  <p className="text-xs text-gray-400">{item.sub}</p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
