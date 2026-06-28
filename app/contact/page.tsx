"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "../../components/layout/Footer";
import { saveContactMessage } from "@/lib/firebaseStats";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setStatus("sending");
    try {
      await saveContactMessage({ name: name.trim(), email: email.trim(), message: message.trim() });
      setStatus("done");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-orange-50/40 px-4 py-8">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-6 shadow-sm">
        <Link href="/" className="text-sm text-gray-400 hover:text-orange-500">
          ← 홈으로
        </Link>

        <h1 className="mt-6 text-3xl font-bold">문의하기</h1>

        <p className="mt-3 leading-7 text-gray-600">
          서비스 이용 중 불편한 점, 오류 제보, 음식 데이터 추가 요청, 기타 문의를 남겨주세요.
          검토 후 답변 드리겠습니다.
        </p>

        {status === "done" ? (
          <div className="mt-8 rounded-2xl bg-orange-50 px-6 py-8 text-center">
            <p className="text-2xl">✅</p>
            <p className="mt-3 font-bold text-gray-800">문의가 접수됐어요!</p>
            <p className="mt-1 text-sm text-gray-500">검토 후 입력하신 이메일로 답변 드릴게요.</p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-6 rounded-2xl bg-orange-500 px-6 py-3 text-sm font-bold text-white"
            >
              다시 문의하기
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
            <div>
              <label className="mb-1 block text-sm font-bold text-gray-700">이름</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="홍길동"
                required
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-orange-400"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-bold text-gray-700">이메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                required
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-orange-400"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-bold text-gray-700">문의 내용</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="문의 내용을 입력해주세요."
                required
                rows={5}
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-orange-400 resize-none"
              />
            </div>

            {status === "error" && (
              <p className="text-sm text-red-500">전송 중 오류가 발생했어요. 다시 시도해주세요.</p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-2xl bg-orange-500 py-4 text-sm font-bold text-white disabled:opacity-50"
            >
              {status === "sending" ? "전송 중..." : "문의 보내기"}
            </button>
          </form>
        )}
      </div>

      <Footer />
    </main>
  );
}
