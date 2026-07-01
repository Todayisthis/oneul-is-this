import type { Metadata } from "next";
import FeatureCards from "@/components/home/FeatureCards";
import LiveReviews from "@/components/home/LiveReviews";
import Footer from "@/components/layout/Footer";
import KakaoAd from "@/components/ads/KakaoAd";

export const metadata: Metadata = {
  title: "오늘 뭐먹지? 오늘 뭐보지? 메뉴·넷플릭스 랜덤 추천 | 오늘은 이거다",
  description:
    "오늘 뭐먹지? 뭐보지? 고민될 때! 음식 메뉴 랜덤 추천부터 넷플릭스 작품 추천까지. 한 번의 클릭으로 결정 끝!",
  alternates: { canonical: "https://oneul-is-this.com" },
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "오늘은 이거다",
  url: "https://oneul-is-this.com",
  description: "뭐 먹지? 뭐 보지? 매일 반복되는 고민을 한 번의 클릭으로 해결하는 랜덤 추천 서비스.",
  applicationCategory: "LifestyleApplication",
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

          {/* 스크롤 유도 */}
          <div className="absolute bottom-10 flex flex-col items-center gap-3">
            <p className="text-sm font-medium text-gray-400">어떤 서비스인지 알아보기</p>
            <div className="flex flex-col items-center gap-1">
              <div className="h-8 w-0.5 animate-pulse bg-gradient-to-b from-orange-500 to-transparent" />
              <span className="animate-bounce text-2xl text-orange-500">↓</span>
            </div>
          </div>
        </section>

        {/* 히어로 아래 — PC에서 좌우 광고 포함 3컬럼 */}
        <div className="lg:grid lg:grid-cols-[160px_1fr_160px] lg:items-start lg:gap-4">

          {/* 왼쪽 광고 (PC 전용) */}
          <div className="hidden lg:flex lg:flex-col lg:items-center lg:sticky lg:top-8 lg:pt-12 lg:self-start">
            <KakaoAd unitId="DAN-Rx4jX8tclansKt6T" width={160} height={600} />
          </div>

          {/* 메인 콘텐츠 */}
          <div>
            {/* 기능 카드 */}
            <section className="mx-auto max-w-4xl px-6 pb-24 pt-12">
              <p className="mb-3 text-center text-sm font-medium text-orange-400">서비스 소개</p>
              <h2 className="mb-10 text-center text-3xl font-bold text-white">
                무엇을 도와드릴까요?
              </h2>
              <FeatureCards />
            </section>

            {/* 실시간 후기 */}
            <LiveReviews />

            {/* SEO 텍스트 */}
            <section className="mx-auto max-w-3xl space-y-6 px-6 pb-24 text-left">
              <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8">
                <h2 className="text-xl font-bold text-white">오늘 뭐 먹지? 고민, 이제 그만</h2>
                <p className="mt-4 leading-8 text-gray-400">
                  매일 점심시간마다 동료들과 &quot;오늘 뭐 먹지?&quot;로 시작하는 10분짜리 회의,
                  익숙하지 않으신가요? 국물·찌개, 밥·덮밥, 면류, 분식, 고기·구이, 치킨, 피자 등
                  다양한 카테고리에서 원하는 종류를 선택하면 딱 하나를 골라드립니다.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8">
                <h2 className="text-xl font-bold text-white">오늘 뭐 보지? 넷플릭스 추천도 여기서</h2>
                <p className="mt-4 leading-8 text-gray-400">
                  넷플릭스를 켜고 30분째 뭘 볼지 고르다가 결국 유튜브를 보게 된 경험, 다들 있으시죠?
                  현재 넷플릭스 한국에서 서비스 중인 1,000개 이상의 작품 중에서 장르·IMDb 점수·제작 국가를
                  선택하면 딱 하나를 추천해드려요. 추천 결과에서 바로 넷플릭스로 이동도 가능합니다.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8">
                <h2 className="text-xl font-bold text-white">결정 피로, 왜 생길까?</h2>
                <p className="mt-4 leading-8 text-gray-400">
                  심리학 연구에 따르면 선택지가 너무 많으면 오히려 결정이 어려워지는
                  &apos;선택의 역설&apos;이 발생합니다. 오늘은 이거다는 이 문제를 해결하기 위해 만들어졌습니다.
                </p>
              </div>

              <p className="text-center text-xs leading-6 text-gray-700">
                오늘 뭐먹지 · 저녁 뭐먹지 · 점심 뭐먹지 · 메뉴 추천 · 오늘 뭐보지 · 넷플릭스 추천 · 랜덤 추천
              </p>
            </section>
          </div>

          {/* 오른쪽 광고 (PC 전용) */}
          <div className="hidden lg:flex lg:flex-col lg:items-center lg:sticky lg:top-8 lg:pt-12 lg:self-start">
            <KakaoAd unitId="DAN-Rx4jX8tclansKt6T" width={160} height={600} />
          </div>

        </div>
      </main>
      <div className="bg-gray-950">
        <div className="hidden lg:flex justify-center py-4">
          <KakaoAd unitId="DAN-v96On6dbt3Krp7Pw" width={728} height={90} />
        </div>
        <Footer />
      </div>
    </>
  );
}
