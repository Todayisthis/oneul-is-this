"use client";

import { useState, useEffect } from "react";
import { getRecentFeeds, type FeedItem } from "@/lib/firebaseStats";

export default function WatchFeedList() {
  const [feeds, setFeeds] = useState<FeedItem[]>([]);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    getRecentFeeds(10).then(setFeeds);
  }, []);

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
      <p className="mb-3 text-sm font-bold text-white">💬 오늘의 방명록</p>
      <div style={{ opacity: visible ? 1 : 0, transition: "opacity 250ms ease" }}>
        <div className="flex gap-2">
          <span className="text-xl">{feed.foodEmoji}</span>
          <div className="flex-1">
            <p className="text-xs font-bold text-gray-200">{feed.foodName}</p>
            <p className="mt-0.5 text-sm leading-snug text-gray-400">{feed.comment}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
