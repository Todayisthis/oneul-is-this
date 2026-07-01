"use client";

import { useState } from "react";
import { likeReview, addReviewComment, getReviewComments, type Review, type ReviewComment } from "@/lib/reviewStats";
import { filterComment } from "@/lib/filterComment";

function timeAgo(date: Date): string {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return "방금";
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  return `${Math.floor(diff / 86400)}일 전`;
}

export default function ReviewCard({ review }: { review: Review }) {
  const [likes, setLikes] = useState(review.likes);
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<ReviewComment[]>([]);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState("");
  const [commentSent, setCommentSent] = useState(false);

  async function handleLike() {
    if (liked) return;
    setLiked(true);
    setLikes((l) => l + 1);
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
    const { ok, reason } = filterComment(trimmed);
    if (!ok) { setCommentError(reason ?? "등록할 수 없는 내용이에요."); return; }
    setCommentError("");
    await addReviewComment(review.id, trimmed);
    setComments((prev) => [...prev, { id: Date.now().toString(), reviewId: review.id, content: trimmed, createdAt: new Date() }]);
    setComment("");
    setCommentSent(true);
    setTimeout(() => setCommentSent(false), 2000);
  }

  return (
    <div className="rounded-2xl border border-gray-700 bg-gray-800 p-5 shadow-sm md:border-gray-100 md:bg-white">
      {/* 헤더 */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{review.itemEmoji}</span>
          <div>
            <p className="text-sm font-bold text-white md:text-gray-800">{review.itemName}</p>
            <p className="text-xs text-gray-400">{review.type === "food" ? "🍚 음식" : "🎬 영화/드라마"} · {timeAgo(review.createdAt)}</p>
          </div>
        </div>
        <div className="flex shrink-0 gap-0.5">
          {[1,2,3,4,5].map((s) => (
            <span key={s} className={s <= review.rating ? "text-orange-400" : "text-gray-600 md:text-gray-200"}>⭐</span>
          ))}
        </div>
      </div>

      {/* 내용 */}
      <p className="mt-3 text-sm leading-relaxed text-gray-300 md:text-gray-600">{review.content}</p>

      {/* 액션 */}
      <div className="mt-4 flex items-center gap-3 border-t border-gray-700 pt-3 md:border-gray-100">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 rounded-xl px-3 py-1.5 text-xs font-bold transition ${
            liked ? "bg-orange-500 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600 md:bg-gray-100 md:text-gray-600 md:hover:bg-orange-50"
          }`}
        >
          👍 {likes}
        </button>
        <button
          onClick={toggleComments}
          className="flex items-center gap-1 rounded-xl bg-gray-700 px-3 py-1.5 text-xs font-bold text-gray-300 hover:bg-gray-600 md:bg-gray-100 md:text-gray-600 md:hover:bg-gray-200"
        >
          💬 댓글 {comments.length > 0 ? comments.length : ""}
        </button>
      </div>

      {/* 댓글 */}
      {showComments && (
        <div className="mt-3">
          {comments.length > 0 && (
            <div className="mb-3 flex flex-col gap-2">
              {comments.map((c) => (
                <div key={c.id} className="rounded-xl bg-gray-700 px-3 py-2 md:bg-gray-50">
                  <p className="text-xs text-gray-300 md:text-gray-600">{c.content}</p>
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
              className="flex-1 rounded-xl border border-gray-600 bg-gray-700 px-3 py-2 text-xs text-white outline-none focus:border-orange-400 md:border-gray-200 md:bg-white md:text-gray-700"
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
