"use client";

import { useState } from "react";
import { saveFoodSuggestion } from "@/lib/firebaseStats";

type Props = {
  onClose: () => void;
};

const categories = [
  "국물", "밥", "면", "고기", "분식", "치킨", "피자", "패스트푸드", "양식", "샐러드", "샌드위치", "기타",
];

export default function SuggestModal({ onClose }: Props) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("기타");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    setStatus("loading");
    try {
      await saveFoodSuggestion({ name: name.trim(), category, description: description.trim() });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">🍽 메뉴 제안하기</p>
          <button type="button" onClick={onClose} className="text-xl text-gray-400 hover:text-gray-600">✕</button>
        </div>

        {status === "done" ? (
          <div className="mt-6 text-center">
            <p className="text-4xl">🎉</p>
            <p className="mt-3 text-base font-bold">제안해줘서 고마워요!</p>
            <p className="mt-1 text-sm text-gray-500">검토 후 메뉴에 추가할게요.</p>
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
              <label className="mb-1 block text-xs font-bold text-gray-600">음식 이름 *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="예: 마라탕, 초밥, 부리또"
                maxLength={30}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-orange-400"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold text-gray-600">카테고리</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-orange-400"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold text-gray-600">설명 (선택)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="어떤 음식인지 간단히 설명해줘요"
                maxLength={200}
                rows={3}
                className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-orange-400"
              />
            </div>

            {status === "error" && (
              <p className="text-xs text-red-500">오류가 발생했어요. 다시 시도해줘요.</p>
            )}

            <button
              type="submit"
              disabled={status === "loading" || !name.trim()}
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
