import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "오늘 뭐먹지? 저녁 뭐먹지? 메뉴 추천 | 오늘은 이거다",
  description:
    "오늘 뭐먹지? 고민될 때! 국물, 밥, 면, 치킨, 피자, 양식 등 다양한 메뉴를 랜덤으로 추천해드려요. 저녁 뭐먹지? 점심 뭐먹지? 고민 끝!",
  alternates: { canonical: "https://oneul-is-this.com" },
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "오늘 뭐 먹지?",
  url: "https://oneul-is-this.com",
  description: "점심, 저녁 뭐 먹을지 고민될 때! 카테고리별 랜덤 음식 추천 서비스.",
  applicationCategory: "FoodApplication",
  operatingSystem: "Web",
  inLanguage: "ko",
  offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
  publisher: { "@type": "Organization", name: "오늘 뭐 하지?", url: "https://oneul-is-this.com" },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <main className="min-h-screen bg-gray-950 text-white">

        {/* 히어로 */}
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
          {/* 배경 글로우 */}
          <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500 opacity-10 blur-[120px]" />

          <p className="mb-4 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-sm font-medium text-orange-400">
            결정 못하는 당신을 위한 서비스
          </p>

          <h1 className="mt-2 text-6xl font-extrabold tracking-tight text-white sm:text-7xl">
            오늘은<br />
            <span className="text-orange-500">이거다!</span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-8 text-gray-400">
            뭐 먹지? 뭐 보지? 매일 반복되는 고민.<br />
            이제 한 번의 클릭으로 해결하세요.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="/eat"
              className="rounded-2xl bg-orange-500 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600"
            >
              🍚 오늘 뭐 먹지?
            </Link>
            <Link
              href="/watch"
              className="rounded-2xl border border-gray-700 bg-gray-900 px-8 py-4 text-lg font-bold text-white transition hover:border-orange-500/50 hover:bg-gray-800"
            >
              🎬 오늘 뭐 보지?
            </Link>
          </div>

          <div className="mt-16 flex items-center gap-2 text-sm text-gray-600">
            <span>스크롤해서 더 보기</span>
            <span className="animate-bounce">↓</span>
          </div>
        </section>

        {/* 기능 카드 */}
        <section className="mx-auto max-w-4xl px-6 pb-24 pt-8">
          <h2 className="mb-10 text-center text-2xl font-bold text-gray-300">
            지금 이용 가능한 서비스
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/eat"
              className="group rounded-2xl border border-gray-800 bg-gray-900 p-6 transition hover:border-orange-500/40 hover:bg-gray-800"
            >
              <div className="mb-4 text-4xl">🍚</div>
              <h3 className="text-xl font-bold text-white">오늘 뭐 먹지?</h3>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                국물·찌개, 밥·덮밥, 면류, 치킨, 피자 등<br />
                카테고리별 랜덤 메뉴 추천
              </p>
              <span className="mt-4 inline-block text-sm font-medium text-orange-500 group-hover:underline">
                바로 가기 →
              </span>
            </Link>

            <Link
              href="/watch"
              className="group rounded-2xl border border-gray-800 bg-gray-900 p-6 transition hover:border-orange-500/40 hover:bg-gray-800"
            >
              <div className="mb-4 text-4xl">🎬</div>
              <h3 className="text-xl font-bold text-white">오늘 뭐 보지?</h3>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                넷플릭스에서 서비스 중인 작품 중<br />
                장르별 랜덤 추천 + 바로 보기
              </p>
              <span className="mt-4 inline-block text-sm font-medium text-orange-500 group-hover:underline">
                바로 가기 →
              </span>
            </Link>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 opacity-50">
              <div className="mb-4 text-4xl">📍</div>
              <h3 className="text-xl font-bold text-gray-500">오늘 어디 가지?</h3>
              <p className="mt-2 text-sm text-gray-600">개발 중</p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 opacity-50">
              <div className="mb-4 text-4xl">☕</div>
              <h3 className="text-xl font-bold text-gray-500">오늘 뭐 마시지?</h3>
              <p className="mt-2 text-sm text-gray-600">개발 중</p>
            </div>
          </div>
        </section>

        {/* SEO 텍스트 */}
        <section className="mx-auto max-w-3xl space-y-10 px-6 pb-24 text-left">
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8">
            <h2 className="text-xl font-bold text-white">오늘 뭐 먹지? 고민, 이제 그만</h2>
            <p className="mt-4 leading-8 text-gray-400">
              매일 점심시간마다 동료들과 &quot;오늘 뭐 먹지?&quot;로 시작하는 10분짜리 회의,
              익숙하지 않으신가요? 오늘은 이거다는 그 반복되는 고민을 단 한 번의 클릭으로 해결해드립니다.
            </p>
            <p className="mt-4 leading-8 text-gray-400">
              국물·찌개, 밥·덮밥, 면류, 분식, 고기·구이, 치킨, 피자, 패스트푸드 등
              다양한 카테고리에서 원하는 종류를 선택하면 랜덤으로 추천해드립니다.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8">
            <h2 className="text-xl font-bold text-white">메뉴 결정, 왜 이렇게 어려울까?</h2>
            <p className="mt-4 leading-8 text-gray-400">
              심리학 연구에 따르면 선택지가 너무 많으면 오히려 결정이 어려워지는
              &apos;선택의 역설&apos;이 발생합니다. 오늘은 이거다는 이 문제를 해결하기 위해 만들어졌습니다.
            </p>
          </div>

          <p className="text-center text-xs leading-6 text-gray-700">
            오늘 뭐먹지 · 저녁 뭐먹지 · 점심 뭐먹지 · 메뉴 추천 · 오늘 점심 · 오늘 저녁 · 랜덤 메뉴 추천
          </p>
        </section>
      </main>
    </>
  );
}
