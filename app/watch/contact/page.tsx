"use client";

import { useState } from "react";
import Link from "next/link";
import WatchFooter from "@/components/watch/WatchFooter";

export default function WatchContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { saveContactMessage } = await import("@/lib/firebaseStats");
      await saveContactMessage(form);
      setSubmitted(true);
    } catch {
      alert("전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  }

  return (
    <main className="min-h-screen bg-orange-50 px-4 py-8">
      <div className="mx-auto max-w-xl">
        <Link href="/watch" className="text-sm text-gray-400 hover:text-orange-500">← 오늘 뭐 보지?로 돌아가기</Link>

        <h1 className="mt-6 text-2xl font-bold text-gray-800">문의하기</h1>
        <p className="mt-1 text-sm text-gray-500">
          작품 추가 요청, 오류 신고, 기타 문의를 남겨주세요.
        </p>

        {submitted ? (
          <div className="mt-8 rounded-2xl bg-white p-8 text-center shadow-sm">
            <p className="text-4xl">✅</p>
            <p className="mt-3 text-lg font-bold text-gray-800">문의가 접수됐어요!</p>
            <p className="mt-1 text-sm text-gray-500">빠른 시일 내에 검토 후 반영하겠습니다.</p>
            <Link
              href="/watch"
              className="mt-6 inline-block rounded-xl bg-orange-500 px-6 py-2.5 text-sm font-bold text-white hover:bg-orange-600"
            >
              뒤로가기
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">이름 (선택)</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="홍길동"
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-orange-400"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">이메일 (선택)</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="example@email.com"
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-orange-400"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">문의 내용 *</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="문의 내용을 입력해주세요."
                    className="w-full resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-orange-400"
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-orange-500 py-3 text-sm font-bold text-white hover:bg-orange-600"
            >
              문의 보내기
            </button>
          </form>
        )}
      </div>
      <WatchFooter />
    </main>
  );
}
