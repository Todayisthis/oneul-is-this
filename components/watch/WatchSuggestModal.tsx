"use client";

import { useState } from "react";

type Props = {
  onClose: () => void;
};

const genres = [
  "액션", "드라마", "코미디", "스릴러", "공포", "로맨스", "SF", "판타지", "애니메이션", "다큐멘터리", "범죄", "기타",
];

export default function WatchSuggestModal({ onClose }: Props) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"영화" | "드라마">("영화");
  const [genre, setGenre] = useState("기타");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/suggestions/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: title.trim(),
          category: `[작품][${type}] ${genre}`,
          description: description.trim(),
        }),
      });
      if (!res.ok) { setStatus("error"); return; }
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-3xl bg-gray-800 p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-white">🎬 작품 제안하기</p>
          <button type="button" onClick={onClose} className="text-xl text-gray-400 hover:text-gray-200">✕</button>
        </div>

        {status === "done" ? (
          <div className="mt-6 text-center">
            <p className="text-4xl">🎉</p>
            <p className="mt-3 text-base font-bold text-white">제안해줘서 고마워요!</p>
            <p className="mt-1 text-sm text-gray-400">검토 후 작품 목록에 추가할게요.</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full rounded-2xl bg-orange-500 py-3 text-sm font-bold text-white active:scale-95"
            >
              닫기
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
            <div>
              <label className="mb-1 block text-xs font-bold text-gray-300">작품 제목 *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="예: 오징어게임, 기생충, 나 홀로 집에"
                maxLength={50}
                className="w-full rounded-xl border border-gray-600 bg-gray-700 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-orange-400"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold text-gray-300">종류</label>
              <div className="flex gap-2">
                {(["영화", "드라마"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    className={`flex-1 rounded-xl py-2.5 text-sm font-bold transition ${
                      type === t ? "bg-orange-500 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold text-gray-300">장르</label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full rounded-xl border border-gray-600 bg-gray-700 px-4 py-3 text-sm text-white outline-none focus:border-orange-400"
              >
                {genres.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold text-gray-300">설명 (선택)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="어떤 작품인지 간단히 설명해줘요"
                maxLength={200}
                rows={3}
                className="w-full resize-none rounded-xl border border-gray-600 bg-gray-700 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-orange-400"
              />
            </div>

            {status === "error" && (
              <p className="text-xs text-red-400">오류가 발생했어요. 다시 시도해줘요.</p>
            )}

            <button
              type="submit"
              disabled={status === "loading" || !title.trim()}
              className="w-full rounded-2xl bg-orange-500 py-3 text-sm font-bold text-white active:scale-95 disabled:opacity-50"
            >
              {status === "loading" ? "제출 중..." : "제안하기"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
