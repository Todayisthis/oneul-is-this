"use client";

import { useState, useEffect } from "react";
import type { FeedItem } from "@/lib/firebaseStats";

function timeAgo(date: Date): string {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return "방금";
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  return `${Math.floor(diff / 86400)}일 전`;
}

export default function FeedList({ feeds }: { feeds: FeedItem[] }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (feeds.length <= 1) return;
    const delay = 3000 - (Date.now() % 3000);
    let interval: ReturnType<typeof setInterval> | null = null;
    const timeout = setTimeout(() => {
      setVisible(false);
      setTimeout(() => { setIndex((i) => (i + 1) % feeds.length); setVisible(true); }, 250);
      interval = setInterval(() => {
        setVisible(false);
        setTimeout(() => { setIndex((i) => (i + 1) % feeds.length); setVisible(true); }, 250);
      }, 3000);
    }, delay);
    return () => { clearTimeout(timeout); if (interval) clearInterval(interval); };
  }, [feeds.length]);

  if (!feeds.length) return null;

  const feed = feeds[index];

  return (
    <div className="rounded-2xl border border-gray-700 bg-gray-800 p-5 shadow-sm">
      <div className="mb-3">
        <p className="text-sm font-bold text-white">💬 오늘의 한마디</p>
      </div>

      <div
        style={{ opacity: visible ? 1 : 0, transition: "opacity 250ms ease" }}
      >
        <span className="text-xl">{feed.foodEmoji}</span>
        <div className="flex-1">
          <p className="text-xs font-bold text-gray-200">{feed.foodName}</p>
          <p className="mt-0.5 text-sm text-gray-400 leading-snug">{feed.comment}</p>
          <p className="mt-1 text-xs text-gray-500" suppressHydrationWarning>{timeAgo(feed.createdAt)}</p>
        </div>
      </div>
    </div>
  );
}
