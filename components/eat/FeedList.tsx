"use client";

import type { FeedItem } from "@/lib/firebaseStats";

function timeAgo(date: Date): string {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return "방금";
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  return `${Math.floor(diff / 86400)}일 전`;
}

export default function FeedList({ feeds }: { feeds: FeedItem[] }) {
  if (!feeds.length) return null;

  return (
    <div className="rounded-2xl border border-gray-700 bg-gray-800 p-5 shadow-sm md:border-none md:bg-white">
      <p className="text-sm font-bold text-white md:text-gray-800">💬 오늘의 한마디</p>
      <div className="mt-3 flex flex-col gap-3">
        {feeds.map((feed) => (
          <div key={feed.id} className="flex gap-2">
            <span className="text-xl">{feed.foodEmoji}</span>
            <div className="flex-1">
              <p className="text-xs font-bold text-gray-200 md:text-gray-700">{feed.foodName}</p>
              <p className="mt-0.5 text-sm text-gray-400 leading-snug md:text-gray-600">{feed.comment}</p>
              <p className="mt-1 text-xs text-gray-500 md:text-gray-400">{timeAgo(feed.createdAt)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
