import Link from "next/link";
import WatchFooter from "@/components/watch/WatchFooter";

export default function WatchPrivacyPage() {
  return (
    <main className="min-h-screen bg-orange-50 px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <Link href="/watch" className="text-sm text-gray-400 hover:text-orange-500">← 오늘 뭐 보지?로 돌아가기</Link>

        <h1 className="mt-6 text-2xl font-bold text-gray-800">개인정보처리방침</h1>
        <p className="mt-2 text-sm text-gray-400">최종 업데이트: 2026년 7월 1일</p>

        <div className="mt-6 space-y-5">
          {[
            {
              title: "1. 수집하는 정보",
              body: "오늘 뭐 보지?는 별도의 회원가입 없이 이용 가능합니다. 서비스 개선을 위해 뽑기 이용 횟수, 별점, 공유 이벤트 등의 익명 집계 데이터를 수집합니다. 개인을 식별할 수 있는 정보는 수집하지 않습니다.",
            },
            {
              title: "2. 수집 목적",
              body: "수집된 데이터는 '이번주 자주 추천된 작품', '별점 높은 작품' 등 통계 기반 콘텐츠 제공에만 사용됩니다.",
            },
            {
              title: "3. 쿠키 및 로컬 스토리지",
              body: "서비스 이용 중 브라우저 로컬 스토리지에 일부 상태 정보가 저장될 수 있습니다. 브라우저 설정에서 언제든지 삭제 가능합니다.",
            },
            {
              title: "4. 제3자 서비스",
              body: "작품 데이터는 JustWatch API를 통해 수집됩니다. 서비스 운영에 Firebase(Google)를 사용하며, Google의 개인정보처리방침이 적용됩니다. 광고 서비스 이용 시 광고 제공업체의 정책이 적용될 수 있습니다.",
            },
            {
              title: "5. 문의",
              body: "개인정보 관련 문의는 문의하기 페이지를 통해 접수해주세요.",
            },
          ].map((s) => (
            <div key={s.title} className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-base font-bold text-gray-800">{s.title}</h2>
              <p className="mt-2 leading-7 text-gray-600">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
      <WatchFooter />
    </main>
  );
}
