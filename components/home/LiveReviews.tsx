"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getRecentReviews, type Review } from "@/lib/reviewStats";
import ReviewModal from "@/components/reviews/ReviewModal";

function StarRow({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <span key={s} className={s <= rating ? "text-orange-400" : "text-gray-700"} style={{ fontSize: 12 }}>★</span>
      ))}
    </span>
  );
}

export default function LiveReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    getRecentReviews(5).then(setReviews);
  }, []);

  useEffect(() => {
    if (reviews.length <= 1) return;
    const delay = 3000 - (Date.now() % 3000);
    let interval: ReturnType<typeof setInterval> | null = null;
    const timeout = setTimeout(() => {
      setVisible(false);
      setTimeout(() => { setIndex((i) => (i + 1) % reviews.length); setVisible(true); }, 250);
      interval = setInterval(() => {
        setVisible(false);
        setTimeout(() => { setIndex((i) => (i + 1) % reviews.length); setVisible(true); }, 250);
      }, 3000);
    }, delay);
    return () => { clearTimeout(timeout); if (interval) clearInterval(interval); };
  }, [reviews.length]);

  function handleModalClose() {
    setShowModal(false);
    getRecentReviews(5).then(setReviews);
  }

  const r = reviews[index];

  return (
    <section className="mx-auto max-w-4xl px-6 pb-16">
      {showModal && <ReviewModal onClose={handleModalClose} />}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="mb-1 text-sm font-medium text-orange-400">실시간 후기</p>
          <h2 className="text-2xl font-bold text-white">방문자 후기</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowModal(true)}
            className="rounded-2xl bg-orange-500 px-4 py-2 text-sm font-bold text-white active:scale-95"
          >
            ✍️ 사용후기 남기기
          </button>
          <Link
            href="/reviews"
            className="rounded-2xl border border-gray-700 px-4 py-2 text-sm font-bold text-gray-300 hover:border-orange-500 hover:text-orange-400"
          >
            전체보기
          </Link>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8 text-center">
          <p className="text-gray-400">아직 후기가 없어요. 첫 번째 후기를 남겨보세요!</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
          <div style={{ opacity: visible ? 1 : 0, transition: "opacity 250ms ease" }}>
            <div className="flex items-center gap-2">
              <span className="text-xl">{r.itemEmoji}</span>
              <div className="flex-1">
                <p className="text-sm font-bold text-white">{r.itemName}</p>
                <p className="text-xs text-gray-500">{r.type === "food" ? "🍚 음식" : "🎬 영화/드라마"}</p>
              </div>
              <StarRow rating={r.rating} />
            </div>
            <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-gray-400">{r.content}</p>
          </div>
        </div>
      )}
    </section>
  );
}
