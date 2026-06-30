import Link from "next/link";
import WatchFooter from "@/components/watch/WatchFooter";

export default function WatchAboutPage() {
  return (
    <main className="min-h-screen bg-orange-50 px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <Link href="/watch" className="text-sm text-gray-400 hover:text-orange-500">← 오늘 뭐 보지?로 돌아가기</Link>

        <h1 className="mt-6 text-2xl font-bold text-gray-800">🎬 서비스 소개</h1>

        <div className="mt-6 space-y-6">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800">오늘 뭐 보지?는 어떤 서비스인가요?</h2>
            <p className="mt-3 leading-7 text-gray-600">
              넷플릭스를 켜고 30분째 뭘 볼지 고르다가 결국 유튜브를 켜버린 경험, 다들 있으시죠?
              <strong> 오늘 뭐 보지?</strong>는 그 반복되는 결정 피로를 단 한 번의 클릭으로 해결해드리는 서비스입니다.
            </p>
            <p className="mt-3 leading-7 text-gray-600">
              현재 넷플릭스 한국 서비스 중인 1,000개 이상의 작품에서 원하는 장르, IMDb 점수, 제작 국가를 선택하면
              랜덤으로 딱 하나를 추천해드립니다. 추천 결과에서 바로 넷플릭스 앱 또는 웹으로 이동할 수 있어요.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800">주요 기능</h2>
            <ul className="mt-3 space-y-2 text-gray-600">
              <li className="flex gap-2"><span>🎭</span><span>장르별 필터 — 액션, 로맨스, 공포, SF 등 15가지</span></li>
              <li className="flex gap-2"><span>⭐</span><span>IMDb 점수별 필터 — 원하는 수준의 작품만 추천</span></li>
              <li className="flex gap-2"><span>🌏</span><span>제작 국가별 필터 — 한국, 미국, 일본 등</span></li>
              <li className="flex gap-2"><span>🏆</span><span>IMDb Top 10 / 한국·미국 Top 3 바로 보기</span></li>
              <li className="flex gap-2"><span>🔥</span><span>이번주 자주 추천된 작품 Top 5 (실시간)</span></li>
              <li className="flex gap-2"><span>📤</span><span>추천 작품 공유하기</span></li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800">작품 데이터 출처</h2>
            <p className="mt-3 leading-7 text-gray-600">
              작품 정보(제목, 장르, 연도, IMDb 점수, 제작 국가, 넷플릭스 링크)는{" "}
              <a href="https://www.justwatch.com" target="_blank" rel="noopener noreferrer" className="text-orange-500 underline">JustWatch</a>를
              참고하여 수집됩니다. IMDb 점수는 JustWatch를 통해 제공되는 정보를 사용하며,
              실제 IMDb 사이트와 소폭 차이가 있을 수 있습니다.
            </p>
          </div>
        </div>
      </div>
      <WatchFooter />
    </main>
  );
}
