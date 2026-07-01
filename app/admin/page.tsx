"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

type FeedItem = { id: string; foodName: string; foodEmoji: string; comment: string; createdAt: Date };
type ReviewItem = { id: string; itemName: string; itemEmoji: string; rating: number; content: string; type: string; createdAt: Date };
type CommentItem = { id: string; reviewId: string; content: string; createdAt: Date };

function timeAgo(date: Date) {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return "방금";
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  return `${Math.floor(diff / 86400)}일 전`;
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [pwError, setPwError] = useState("");
  const [loading, setLoading] = useState(false);

  const [tab, setTab] = useState<"feeds" | "reviews" | "comments">("feeds");
  const [feeds, setFeeds] = useState<FeedItem[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("admin_authed") === "1") setAuthed(true);
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      sessionStorage.setItem("admin_authed", "1");
      setAuthed(true);
    } else {
      setPwError("비밀번호가 틀렸어요.");
    }
  }

  async function loadFeeds() {
    setDataLoading(true);
    const q = query(collection(db, "feeds"), orderBy("createdAt", "desc"), limit(100));
    const snap = await getDocs(q);
    setFeeds(snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        foodName: data.foodName,
        foodEmoji: data.foodEmoji,
        comment: data.comment,
        createdAt: data.createdAt?.toDate?.() ?? new Date(),
      };
    }));
    setDataLoading(false);
  }

  async function loadReviews() {
    setDataLoading(true);
    const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"), limit(100));
    const snap = await getDocs(q);
    setReviews(snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        itemName: data.itemName,
        itemEmoji: data.itemEmoji,
        rating: data.rating,
        content: data.content,
        type: data.type,
        createdAt: data.createdAt?.toDate?.() ?? new Date(),
      };
    }));
    setDataLoading(false);
  }

  async function loadComments() {
    setDataLoading(true);
    const q = query(collection(db, "review_comments"), orderBy("createdAt", "desc"), limit(200));
    const snap = await getDocs(q);
    setComments(snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        reviewId: data.reviewId,
        content: data.content,
        createdAt: data.createdAt?.toDate?.() ?? new Date(),
      };
    }));
    setDataLoading(false);
  }

  useEffect(() => {
    if (!authed) return;
    if (tab === "feeds") loadFeeds();
    else if (tab === "reviews") loadReviews();
    else loadComments();
  }, [authed, tab]);

  async function deleteFeed(id: string) {
    if (!confirm("이 방명록을 삭제할까요?")) return;
    await deleteDoc(doc(db, "feeds", id));
    setFeeds((prev) => prev.filter((f) => f.id !== id));
  }

  async function deleteReview(id: string) {
    if (!confirm("이 후기를 삭제할까요?")) return;
    await deleteDoc(doc(db, "reviews", id));
    setReviews((prev) => prev.filter((r) => r.id !== id));
  }

  async function deleteComment(id: string) {
    if (!confirm("이 댓글을 삭제할까요?")) return;
    await deleteDoc(doc(db, "review_comments", id));
    setComments((prev) => prev.filter((c) => c.id !== id));
  }

  function logout() {
    sessionStorage.removeItem("admin_authed");
    setAuthed(false);
    setPassword("");
  }

  if (!authed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-950 px-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm rounded-2xl border border-gray-700 bg-gray-800 p-8">
          <h1 className="mb-6 text-center text-xl font-bold text-white">🔐 관리자 로그인</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호 입력"
            className="w-full rounded-xl border border-gray-600 bg-gray-700 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-orange-400"
          />
          {pwError && <p className="mt-2 text-xs text-red-400">{pwError}</p>}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded-xl bg-orange-500 py-3 text-sm font-bold text-white disabled:opacity-50"
          >
            {loading ? "확인 중..." : "로그인"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">🛠 관리자 페이지</h1>
          <button onClick={logout} className="rounded-xl border border-gray-600 px-4 py-2 text-sm text-gray-300 hover:text-white">
            로그아웃
          </button>
        </div>

        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setTab("feeds")}
            className={`rounded-xl px-5 py-2 text-sm font-bold transition ${tab === "feeds" ? "bg-orange-500 text-white" : "bg-gray-700 text-gray-300"}`}
          >
            💬 방명록 ({feeds.length})
          </button>
          <button
            onClick={() => setTab("reviews")}
            className={`rounded-xl px-5 py-2 text-sm font-bold transition ${tab === "reviews" ? "bg-orange-500 text-white" : "bg-gray-700 text-gray-300"}`}
          >
            ⭐ 후기 ({reviews.length})
          </button>
          <button
            onClick={() => setTab("comments")}
            className={`rounded-xl px-5 py-2 text-sm font-bold transition ${tab === "comments" ? "bg-orange-500 text-white" : "bg-gray-700 text-gray-300"}`}
          >
            🗨 댓글 ({comments.length})
          </button>
        </div>

        {dataLoading ? (
          <p className="py-12 text-center text-gray-400">불러오는 중...</p>
        ) : tab === "comments" ? (
          <div className="flex flex-col gap-3">
            {comments.length === 0 && <p className="py-12 text-center text-gray-400">댓글이 없어요.</p>}
            {comments.map((c) => (
              <div key={c.id} className="flex items-start gap-4 rounded-2xl border border-gray-700 bg-gray-800 p-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-300">{c.content}</p>
                  <p className="mt-1 text-xs text-gray-500">후기 ID: {c.reviewId} · {timeAgo(c.createdAt)}</p>
                </div>
                <button
                  onClick={() => deleteComment(c.id)}
                  className="shrink-0 rounded-lg bg-red-500/20 px-3 py-1.5 text-xs font-bold text-red-400 hover:bg-red-500 hover:text-white transition"
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
        ) : tab === "feeds" ? (
          <div className="flex flex-col gap-3">
            {feeds.length === 0 && <p className="py-12 text-center text-gray-400">방명록이 없어요.</p>}
            {feeds.map((f) => (
              <div key={f.id} className="flex items-start gap-4 rounded-2xl border border-gray-700 bg-gray-800 p-4">
                <span className="text-2xl">{f.foodEmoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white">{f.foodName}</p>
                  <p className="mt-0.5 text-sm text-gray-300">{f.comment}</p>
                  <p className="mt-1 text-xs text-gray-500">{timeAgo(f.createdAt)}</p>
                </div>
                <button
                  onClick={() => deleteFeed(f.id)}
                  className="shrink-0 rounded-lg bg-red-500/20 px-3 py-1.5 text-xs font-bold text-red-400 hover:bg-red-500 hover:text-white transition"
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {reviews.length === 0 && <p className="py-12 text-center text-gray-400">후기가 없어요.</p>}
            {reviews.map((r) => (
              <div key={r.id} className="flex items-start gap-4 rounded-2xl border border-gray-700 bg-gray-800 p-4">
                <span className="text-2xl">{r.itemEmoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-white">{r.itemName}</p>
                    <span className="text-xs text-gray-500">{r.type === "food" ? "🍚 음식" : "🎬 영화/드라마"}</span>
                  </div>
                  <div className="mt-0.5 flex gap-0.5">
                    {[1,2,3,4,5].map((s) => (
                      <span key={s} className={s <= r.rating ? "text-orange-400" : "text-gray-600"} style={{fontSize:13}}>★</span>
                    ))}
                  </div>
                  <p className="mt-1 text-sm text-gray-300">{r.content}</p>
                  <p className="mt-1 text-xs text-gray-500">{timeAgo(r.createdAt)}</p>
                </div>
                <button
                  onClick={() => deleteReview(r.id)}
                  className="shrink-0 rounded-lg bg-red-500/20 px-3 py-1.5 text-xs font-bold text-red-400 hover:bg-red-500 hover:text-white transition"
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
