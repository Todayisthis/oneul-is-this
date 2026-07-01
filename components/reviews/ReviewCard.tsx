"use client";

import { useState, useEffect } from "react";
import { likeReview, getReviewComments, type Review, type ReviewComment } from "@/lib/reviewStats";

function timeAgo(date: Date): string {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return "방금";
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  return `${Math.floor(diff / 86400)}일 전`;
}

export default function ReviewCard({ review }: { review: Review }) {
  const [likes, setLikes] = useState(review.likes);
  const [liked, setLiked] = useState(() => {
    try {
      const stored = localStorage.getItem("liked_reviews");
      return stored ? JSON.parse(stored).includes(review.id) : false;
    } catch { return false; }
  });
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<ReviewComment[]>([]);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState("");
  const [commentSent, setCommentSent] = useState(false);

  useEffect(() => {
    getReviewComments(review.id).then((data) => {
      setComments(data);
      setCommentsLoaded(true);
    });
  }, [review.id]);

  async function handleLike() {
    if (liked) return;
    setLiked(true);
    setLikes((l) => l + 1);
    try {
      const stored = localStorage.getItem("liked_reviews");
      const arr = stored ? JSON.parse(stored) : [];
      localStorage.setItem("liked_reviews", JSON.stringify([...arr, review.id]));
    } catch {}
    await likeReview(review.id);
  }

  async function toggleComments() {
    if (!showComments && !commentsLoaded) {
      const data = await getReviewComments(review.id);
      setComments(data);
      setCommentsLoaded(true);
    }
    setShowComments((v) => !v);
  }

  async function submitComment() {
    const trimmed = comment.trim();
    if (!trimmed) return;
    setCommentError("");
    const optimistic = { id: Date.now().toString(), reviewId: review.id, content: trimmed, createdAt: new Date() };
    setComments((prev) => [...prev, optimistic]);
    setComment("");
    try {
      const res = await fetch("/api/comments/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviewId: review.id, content: trimmed }),
      });
      const json = await res.json();
      if (!res.ok) {
        setComments((prev) => prev.filter((c) => c.id !== optimistic.id));
        setCommentError(json.error ?? "댓글 등록에 실패했어요.");
        return;
      }
      setCommentSent(true);
      setTimeout(() => setCommentSent(false), 2000);
    } catch {
      setComments((prev) => prev.filter((c) => c.id !== optimistic.id));
      setCommentError("댓글 등록에 실패했어요. 다시 시도해주세요.");
    }
  }

  return (
    <div className="rounded-2xl border border-gray-700 bg-gray-800 p-5 shadow-sm">
      {/* 헤더 */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{review.itemEmoji}</span>
          <div>
            <p className="text-sm font-bold text-white">{review.itemName}</p>
            <p className="text-xs text-gray-400">{review.type === "food" ? "🍚 음식" : "🎬 영화/드라마"} · {timeAgo(review.createdAt)}</p>
          </div>
        </div>
        <div className="flex shrink-0 gap-0.5">
          {[1,2,3,4,5].map((s) => (
            <span key={s} className={s <= review.rating ? "text-orange-400" : "text-gray-600"}>★</span>
          ))}
        </div>
      </div>

      {/* 내용 */}
      <p className="mt-3 text-sm leading-relaxed text-gray-300">{review.content}</p>

      {/* 액션 */}
      <div className="mt-4 flex items-center gap-3 border-t border-gray-700 pt-3">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 rounded-xl px-3 py-1.5 text-xs font-bold transition ${
            liked ? "bg-orange-500 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          👍 {likes}
        </button>
        <button
          onClick={toggleComments}
          className="flex items-center gap-1 rounded-xl bg-gray-700 px-3 py-1.5 text-xs font-bold text-gray-300 hover:bg-gray-600"
        >
          💬 댓글 {comments.length}
        </button>
      </div>

      {/* 댓글 */}
      {showComments && (
        <div className="mt-3">
          {comments.length > 0 && (
            <div className="mb-3 flex flex-col gap-2">
              {comments.map((c) => (
                <div key={c.id} className="rounded-xl bg-gray-700 px-3 py-2">
                  <p className="text-xs text-gray-300">{c.content}</p>
                  <p className="mt-0.5 text-xs text-gray-500">{timeAgo(c.createdAt)}</p>
                </div>
              ))}
            </div>
          )}
          {commentError && <p className="mb-2 text-xs text-red-400">{commentError}</p>}
          {commentSent && <p className="mb-2 text-xs text-orange-400">댓글이 등록됐어요!</p>}
          <div className="flex gap-2">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") submitComment(); }}
              maxLength={100}
              placeholder="댓글을 입력하세요..."
              className="flex-1 rounded-xl border border-gray-600 bg-gray-700 px-3 py-2 text-xs text-white outline-none placeholder:text-gray-500 focus:border-orange-400"
            />
            <button
              onClick={submitComment}
              disabled={!comment.trim()}
              className="rounded-xl bg-orange-500 px-3 py-2 text-xs font-bold text-white disabled:opacity-40"
            >
              등록
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
