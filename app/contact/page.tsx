import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "문의하기 | 오늘은 이거다",
};

export default function ContactPage() {
  return (
    <>
      <main className="min-h-screen bg-gray-950 px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <Link href="/" className="text-sm text-gray-400 hover:text-orange-400">← 홈으로</Link>
          <h1 className="mt-6 text-3xl font-extrabold text-white">문의하기</h1>
          <p className="mt-2 text-gray-400">서비스 이용 중 불편한 점이나 건의사항을 알려주세요.</p>

          <div className="mt-8 space-y-4">
            <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6">
              <h2 className="text-base font-bold text-white">📧 이메일 문의</h2>
              <p className="mt-3 leading-8 text-gray-300">
                아래 이메일로 문의해 주시면 빠르게 답변드리겠습니다.
              </p>
              <a
                href="mailto:kyuseok0818@gmail.com"
                className="mt-3 inline-block rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-600"
              >
                kyuseok0818@gmail.com
              </a>
            </div>

            <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6">
              <h2 className="text-base font-bold text-white">💬 자주 묻는 질문</h2>
              <p className="mt-3 leading-8 text-gray-300">
                문의 전에 FAQ를 먼저 확인해보시면 빠르게 해결되실 수도 있어요.
              </p>
              <Link
                href="/faq"
                className="mt-3 inline-block rounded-xl border border-gray-600 px-5 py-2.5 text-sm font-bold text-gray-300 hover:border-orange-500 hover:text-orange-400"
              >
                FAQ 보러 가기 →
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
