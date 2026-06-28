import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "오늘 뭐먹지? 저녁 뭐먹지? 메뉴 추천 | 오늘은 이거다",
  description: "오늘 뭐먹지? 고민될 때! 국물, 밥, 면, 치킨, 피자, 패스트푸드 등 다양한 메뉴를 랜덤으로 추천해드려요. 저녁 뭐먹지? 점심 뭐먹지? 고민 끝!",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white px-6 py-12">
      <div className="mx-auto flex min-h-[80vh] max-w-3xl flex-col items-center justify-center text-center">
        <p className="mb-4 text-sm font-semibold text-orange-500">
          AI 랜덤 추천 서비스
        </p>

        <h1 className="text-5xl font-bold text-gray-900">
          오늘은 이거다!
        </h1>

        <p className="mt-8 text-xl leading-9 text-gray-600">
          매일 똑같은 하루에 지친 당신.
          <br />
          당신의 오늘을
          <br />
          제가 대신 골라드립니다.
        </p>

        <Link
          href="/eat"
          className="mt-12 rounded-2xl bg-orange-500 px-8 py-4 text-xl font-semibold text-white transition hover:bg-orange-600"
        >
          🍚 오늘 뭐 먹지?
        </Link>

        <div className="mt-16 grid w-full gap-3 text-gray-400 sm:grid-cols-2">
          <div className="rounded-2xl bg-gray-50 p-5">🚧 오늘 뭐 보지?</div>
          <div className="rounded-2xl bg-gray-50 p-5">🚧 오늘 어디 가지?</div>
          <div className="rounded-2xl bg-gray-50 p-5">🚧 오늘 뭐 마시지?</div>
          <div className="rounded-2xl bg-gray-50 p-5">🚧 오늘 뭐 하지?</div>
        </div>

        <p className="mt-16 text-xs leading-6 text-gray-300">
          오늘 뭐먹지 · 저녁 뭐먹지 · 점심 뭐먹지 · 메뉴 추천 · 오늘 점심 · 오늘 저녁 · 랜덤 메뉴 추천
        </p>
      </div>
    </main>
  );
}