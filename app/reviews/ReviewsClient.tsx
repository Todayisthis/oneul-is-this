"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getReviews, type Review } from "@/lib/reviewStats";
import ReviewCard from "@/components/reviews/ReviewCard";
import ReviewModal from "@/components/reviews/ReviewModal";

export default function ReviewsClient() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<"all" | "food" | "movie">("all");

  useEffect(() => {
    getReviews(50).then((data) => {
      setReviews(data);
      setLoading(false);
    });
  }, []);

  function handleModalClose() {
    setShowModal(false);
    getReviews(50).then(setReviews);
  }

  const filtered = filter === "all" ? reviews : reviews.filter((r) => r.type === filter);

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-8">
      {showModal && <ReviewModal onClose={handleModalClose} />}

      <div className="mx-auto max-w-xl">
        <div className="mb-6 flex items-center gap-3">
          <Link href="/" className="text-sm text-gray-400 hover:text-orange-400">← 홈으로</Link>
        </div>

        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">✍️ 후기 게시판</h1>
            <p className="mt-1 text-sm text-gray-400">음식·영화 솔직 후기를 공유해보세요</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="shrink-0 rounded-2xl bg-orange-500 px-4 py-2.5 text-sm font-bold text-white active:scale-95"
          >
            + 후기 쓰기
          </button>
        </div>

        {/* 필터 */}
        <div className="mb-5 flex gap-2">
          {(["all", "food", "movie"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
                filter === f
                  ? "bg-orange-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {f === "all" ? "전체" : f === "food" ? "🍚 음식" : "🎬 영화/드라마"}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-16 text-center text-gray-500">불러오는 중...</div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-gray-400">아직 후기가 없어요.</p>
            <button
              onClick={() => setShowModal(true)}
              className="mt-4 rounded-2xl bg-orange-500 px-6 py-3 text-sm font-bold text-white"
            >
              첫 번째 사용후기 남기기
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
