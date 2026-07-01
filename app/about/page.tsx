import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "서비스 소개 | 오늘은 이거다",
  description: "오늘 뭐 먹지? 뭐 보지? 매일 반복되는 고민을 한 번의 클릭으로 해결하는 랜덤 추천 서비스입니다.",
};

export default function AboutPage() {
  return (
    <>
      <main className="min-h-screen bg-gray-950 px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <Link href="/" className="text-sm text-gray-400 hover:text-orange-400">← 홈으로</Link>

          <h1 className="mt-6 text-3xl font-extrabold text-white">서비스 소개</h1>
          <p className="mt-2 text-gray-400">오늘은 이거다 — 매일 반복되는 결정 고민을 대신 해드립니다.</p>

          <div className="mt-10 space-y-6">
            <section className="rounded-2xl border border-gray-700 bg-gray-800 p-6">
              <h2 className="text-lg font-bold text-orange-400">🍚 오늘 뭐 먹지?</h2>
              <p className="mt-3 leading-8 text-gray-300">
                매일 점심·저녁마다 반복되는 &quot;오늘 뭐 먹지?&quot; 고민을 단 한 번의 클릭으로 해결합니다.
                국물·찌개, 밥·덮밥, 면류, 분식, 고기·구이, 치킨, 피자, 패스트푸드 등 다양한 카테고리에서
                원하는 종류를 선택하면 딱 하나의 메뉴를 추천해드려요.
                최근 먹은 음식을 자동으로 기억해 같은 메뉴가 반복되지 않도록 도와주고,
                먹고 싶지 않은 음식은 제외할 수도 있어요.
              </p>
            </section>

            <section className="rounded-2xl border border-gray-700 bg-gray-800 p-6">
              <h2 className="text-lg font-bold text-orange-400">🎬 오늘 뭐 보지?</h2>
              <p className="mt-3 leading-8 text-gray-300">
                넷플릭스를 켜고 30분째 뭘 볼지 고르다가 결국 유튜브를 보게 된 경험, 다들 있으시죠?
                현재 넷플릭스 한국에서 서비스 중인 1,000개 이상의 작품 중에서 장르·제작 국가를 선택하면
                딱 하나를 추천해드려요. 액션·로맨스·코미디·스릴러·다큐멘터리 등 원하는 장르를
                여러 개 동시에 선택하면 그 조건을 모두 충족하는 작품만 추려드립니다.
                추천 결과에서 넷플릭스로 바로 이동도 가능해요.
              </p>
            </section>

            <section className="rounded-2xl border border-gray-700 bg-gray-800 p-6">
              <h2 className="text-lg font-bold text-white">결정 피로, 왜 생길까?</h2>
              <p className="mt-3 leading-8 text-gray-300">
                심리학 연구에 따르면 선택지가 너무 많으면 오히려 결정이 어려워지는
                선택의 역설이 발생합니다. 오늘은 이거다는 이 문제를 해결하기 위해 만들어졌습니다.
                복잡한 고민 없이 바로 결정하고, 남은 시간을 더 즐겁게 보내세요.
              </p>
            </section>

            <section className="rounded-2xl border border-gray-700 bg-gray-800 p-6">
              <h2 className="text-lg font-bold text-white">✍️ 후기 게시판</h2>
              <p className="mt-3 leading-8 text-gray-300">
                추천받은 음식이나 작품을 실제로 즐겨본 뒤 솔직한 후기를 남겨보세요.
                다른 사용자들의 생생한 후기도 함께 확인할 수 있어요.
              </p>
            </section>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/eat" className="rounded-2xl bg-orange-500 px-6 py-3 text-sm font-bold text-white hover:bg-orange-600">
              🍚 뭐 먹지? 바로 가기
            </Link>
            <Link href="/watch" className="rounded-2xl border border-gray-600 bg-gray-800 px-6 py-3 text-sm font-bold text-white hover:border-orange-500">
              🎬 뭐 보지? 바로 가기
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
