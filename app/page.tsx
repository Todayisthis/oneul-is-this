import Link from "next/link";

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
      </div>
    </main>
  );
}