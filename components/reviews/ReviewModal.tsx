"use client";

import { useState, useMemo } from "react";
import { foods } from "@/data/foods";
import { contents } from "@/data/contents";
import { addReview } from "@/lib/reviewStats";
import { filterComment } from "@/lib/filterComment";

type Props = {
  onClose: () => void;
};

export default function ReviewModal({ onClose }: Props) {
  const [type, setType] = useState<"food" | "movie">("food");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<{ name: string; emoji: string } | null>(null);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const results = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.trim().toLowerCase();
    if (type === "food") {
      return foods.filter((f) => f.name.toLowerCase().includes(q)).slice(0, 8);
    } else {
      return contents.filter((c) => c.title.toLowerCase().includes(q)).slice(0, 8);
    }
  }, [search, type]);

  async function submit() {
    if (!selected) { setError("음식 또는 작품을 선택해주세요."); return; }
    if (rating === 0) { setError("별점을 선택해주세요."); return; }
    if (!content.trim()) { setError("후기 내용을 입력해주세요."); return; }

    const { ok, reason } = filterComment(content);
    if (!ok) { setError(reason ?? "등록할 수 없는 내용이에요."); return; }

    setError("");
    setLoading(true);
    try {
      await addReview({
        type,
        itemName: selected.name,
        itemEmoji: selected.emoji,
        rating,
        content: content.trim(),
      });
      setSubmitted(true);
    } catch {
      setError("등록 중 오류가 발생했어요. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <p className="text-4xl">🎉</p>
            <p className="text-lg font-bold text-gray-800">후기가 등록됐어요!</p>
            <p className="text-sm text-gray-500">소중한 후기 감사해요 😊</p>
            <button
              onClick={onClose}
              className="mt-2 rounded-2xl bg-orange-500 px-8 py-3 text-sm font-bold text-white"
            >
              닫기
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800">✍️ 후기 남기기</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            {/* 타입 선택 */}
            <div className="mb-4 flex gap-2">
              <button
                onClick={() => { setType("food"); setSelected(null); setSearch(""); }}
                className={`flex-1 rounded-xl py-2 text-sm font-bold transition ${
                  type === "food" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600"
                }`}
              >
                🍚 음식
              </button>
              <button
                onClick={() => { setType("movie"); setSelected(null); setSearch(""); }}
                className={`flex-1 rounded-xl py-2 text-sm font-bold transition ${
                  type === "movie" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600"
                }`}
              >
                🎬 영화/드라마
              </button>
            </div>

            {/* 검색 */}
            <div className="relative mb-4">
              <input
                type="text"
                value={selected ? `${selected.emoji} ${selected.name}` : search}
                onChange={(e) => { setSelected(null); setSearch(e.target.value); }}
                placeholder={type === "food" ? "음식 이름 검색..." : "작품 제목 검색..."}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-orange-400"
              />
              {selected && (
                <button
                  onClick={() => { setSelected(null); setSearch(""); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >✕</button>
              )}
              {/* 검색 결과 — absolute로 띄워서 레이아웃 안 밀림 */}
              {!selected && results.length > 0 && (
                <div className="absolute left-0 right-0 top-full z-10 mt-1 max-h-40 overflow-y-auto rounded-xl border border-gray-100 bg-white shadow-lg">
                  {results.map((item) => {
                    const name = type === "food" ? (item as typeof foods[0]).name : (item as typeof contents[0]).title;
                    const emoji = type === "food" ? (item as typeof foods[0]).emoji : "🎬";
                    return (
                      <button
                        key={item.id}
                        onClick={() => { setSelected({ name, emoji }); setSearch(""); }}
                        className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 hover:bg-orange-50"
                      >
                        <span>{emoji}</span>
                        <span>{name}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 별점 */}
            <div className="mb-4">
              <p className="mb-2 text-sm font-bold text-gray-700">별점</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    onClick={() => setRating(s)}
                    className={`text-2xl transition ${s <= rating ? "text-orange-400" : "text-gray-200"}`}
                  >
                    ⭐
                  </button>
                ))}
              </div>
            </div>

            {/* 내용 */}
            <div className="mb-4">
              <p className="mb-2 text-sm font-bold text-gray-700">후기 내용</p>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                maxLength={200}
                rows={4}
                placeholder="솔직한 후기를 남겨주세요! (최대 200자)"
                className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-orange-400"
              />
              <p className="mt-1 text-right text-xs text-gray-400">{content.length}/200</p>
            </div>

            {error && <p className="mb-3 text-xs text-red-400">{error}</p>}

            <button
              onClick={submit}
              disabled={loading}
              className="w-full rounded-2xl bg-orange-500 py-3 text-sm font-bold text-white disabled:opacity-50"
            >
              {loading ? "등록 중..." : "후기 등록하기"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
