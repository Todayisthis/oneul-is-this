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
  description:
    "점심, 저녁 뭐 먹을지 고민될 때! 카테고리별 랜덤 음식 추천 서비스.",
  applicationCategory: "FoodApplication",
  operatingSystem: "Web",
  inLanguage: "ko",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "KRW",
  },
  publisher: {
    "@type": "Organization",
    name: "오늘 뭐 하지?",
    url: "https://oneul-is-this.com",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <main className="min-h-screen bg-white px-6 py-12">
        <div className="mx-auto flex min-h-[80vh] max-w-3xl flex-col items-center justify-center text-center">
          <p className="mb-4 text-sm font-semibold text-orange-500">
            AI 랜덤 추천 서비스
          </p>

          <h1 className="text-5xl font-bold text-gray-900">오늘은 이거다!</h1>

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
            <Link
              href="/watch"
              className="rounded-2xl bg-white p-5 text-gray-700 shadow-sm transition hover:bg-orange-50 hover:text-orange-600"
            >
              🎬 오늘 뭐 보지?
            </Link>
            <div className="rounded-2xl bg-gray-50 p-5">
              🚧 오늘 어디 가지?{" "}
              <span className="ml-1 rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-400">
                개발중
              </span>
            </div>
            <div className="rounded-2xl bg-gray-50 p-5">
              🚧 오늘 뭐 마시지?{" "}
              <span className="ml-1 rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-400">
                개발중
              </span>
            </div>
            <div className="rounded-2xl bg-gray-50 p-5">
              🚧 오늘 뭐 하지?{" "}
              <span className="ml-1 rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-400">
                개발중
              </span>
            </div>
          </div>

          <p className="mt-16 text-xs leading-6 text-gray-300">
            오늘 뭐먹지 · 저녁 뭐먹지 · 점심 뭐먹지 · 메뉴 추천 · 오늘 점심
            · 오늘 저녁 · 랜덤 메뉴 추천
          </p>
        </div>

        {/* 콘텐츠 섹션 */}
        <section className="mx-auto mt-16 max-w-3xl space-y-10 px-2 pb-16 text-left">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">오늘 뭐 먹지? 고민, 이제 그만</h2>
            <p className="mt-4 leading-8 text-gray-600">
              매일 점심시간마다 동료들과 "오늘 뭐 먹지?"로 시작하는 10분짜리 회의, 익숙하지 않으신가요?
              또는 퇴근 후 배달앱을 열어놓고 30분 동안 아무것도 고르지 못한 경험이 있으신가요?
              오늘은 이거다는 그 반복되는 고민을 단 한 번의 클릭으로 해결해드립니다.
            </p>
            <p className="mt-4 leading-8 text-gray-600">
              국물·찌개, 밥·덮밥, 면류, 분식, 고기·구이, 치킨, 피자, 패스트푸드 등
              다양한 카테고리에서 원하는 종류를 선택하면 그에 맞는 메뉴를 랜덤으로 추천해드립니다.
              마음에 들지 않으면 다시 뽑기를 누르면 그만입니다.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">메뉴 결정, 왜 이렇게 어려울까?</h2>
            <p className="mt-4 leading-8 text-gray-600">
              심리학 연구에 따르면 사람은 하루에 수백 가지 이상의 결정을 내립니다.
              그 중 음식 선택은 생각보다 많은 정신적 에너지를 소모합니다.
              선택지가 너무 많으면 오히려 결정이 어려워지는 '선택의 역설'이 발생하기 때문입니다.
            </p>
            <p className="mt-4 leading-8 text-gray-600">
              오늘은 이거다는 이 문제를 해결하기 위해 만들어졌습니다.
              원하는 종류를 대략적으로 정해두면, 나머지는 저희가 대신 골라드립니다.
              결정 피로를 줄이고 소중한 시간을 아끼세요.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">이런 상황에서 사용해보세요</h2>
            <ul className="mt-4 space-y-3 leading-8 text-gray-600">
              <li>• 점심시간에 팀원들과 메뉴를 고르기 힘들 때</li>
              <li>• 저녁에 혼자 배달 음식을 고르지 못하고 있을 때</li>
              <li>• 항상 같은 음식만 먹어서 새로운 메뉴에 도전하고 싶을 때</li>
              <li>• 가족 모임에서 메뉴 선택으로 의견이 갈릴 때</li>
              <li>• 특정 카테고리 안에서 다양하게 먹고 싶을 때</li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
