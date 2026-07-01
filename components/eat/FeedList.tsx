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
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % feeds.length);
        setVisible(true);
      }, 400);
    }, 3500);
    return () => clearInterval(timer);
  }, [feeds.length]);

  if (!feeds.length) return null;

  const feed = feeds[index];

  return (
    <div className="rounded-2xl border border-gray-700 bg-gray-800 p-5 shadow-sm md:border-none md:bg-white">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-bold text-white md:text-gray-800">💬 오늘의 한마디</p>
        {feeds.length > 1 && (
          <div className="flex gap-1">
            {feeds.map((_, i) => (
              <button
                key={i}
                onClick={() => { setIndex(i); setVisible(true); }}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-4 bg-orange-400" : "w-1.5 bg-gray-600 md:bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div
        className="flex gap-2 transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <span className="text-xl">{feed.foodEmoji}</span>
        <div className="flex-1">
          <p className="text-xs font-bold text-gray-200 md:text-gray-700">{feed.foodName}</p>
          <p className="mt-0.5 text-sm text-gray-400 leading-snug md:text-gray-600">{feed.comment}</p>
          <p className="mt-1 text-xs text-gray-500 md:text-gray-400">{timeAgo(feed.createdAt)}</p>
        </div>
      </div>
    </div>
  );
}
