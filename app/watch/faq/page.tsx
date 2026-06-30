import Link from "next/link";
import WatchFooter from "@/components/watch/WatchFooter";

const faqs = [
  {
    q: "어떤 작품이 포함되어 있나요?",
    a: "현재 넷플릭스 한국에서 서비스 중인 영화·드라마 1,000개 이상을 포함합니다. 2000년 이후 출시 작품만 표시됩니다. 데이터는 JustWatch를 통해 수집되며 주기적으로 업데이트됩니다.",
  },
  {
    q: "IMDb 점수는 어디서 가져오나요?",
    a: "IMDb 점수는 JustWatch API를 통해 제공되는 정보를 사용합니다. 실제 IMDb 사이트의 점수와 소폭 차이가 있을 수 있으며, 점수가 없는 작품은 IMDb 점수 필터에서 제외됩니다.",
  },
  {
    q: "추천받은 작품을 바로 넷플릭스에서 볼 수 있나요?",
    a: "네! 추천 결과에서 '넷플릭스 →' 버튼을 누르면 해당 작품의 넷플릭스 페이지로 바로 이동합니다. 모바일에서는 넷플릭스 앱이 설치되어 있을 경우 앱이 바로 열립니다.",
  },
  {
    q: "공유하기를 누르면 광고가 나오던데, 건너뛸 수 있나요?",
    a: "별점을 먼저 주시면 광고 없이 바로 공유할 수 있어요! 별점은 서비스 품질 개선에 큰 도움이 됩니다.",
  },
  {
    q: "이번주 Top 5는 어떻게 집계되나요?",
    a: "매주 월요일 0시(KST)를 기준으로 이번 주의 뽑기 횟수와 별점을 집계합니다. 데이터는 익명으로 수집되며 개인을 식별할 수 없습니다.",
  },
  {
    q: "원하는 작품이 목록에 없어요.",
    a: "넷플릭스 서비스 종료 또는 데이터 미수집으로 일부 작품이 없을 수 있습니다. 문의하기를 통해 제보해주시면 검토 후 반영하겠습니다.",
  },
];

export default function WatchFaqPage() {
  return (
    <main className="min-h-screen bg-orange-50 px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <Link href="/watch" className="text-sm text-gray-400 hover:text-orange-500">← 오늘 뭐 보지?로 돌아가기</Link>

        <h1 className="mt-6 text-2xl font-bold text-gray-800">자주 묻는 질문 (FAQ)</h1>

        <div className="mt-6 space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="font-bold text-gray-800">Q. {faq.q}</p>
              <p className="mt-2 leading-7 text-gray-600">A. {faq.a}</p>
            </div>
          ))}
        </div>
      </div>
      <WatchFooter />
    </main>
  );
}
