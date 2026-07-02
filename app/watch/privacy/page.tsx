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
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-800">1. 수집하는 정보</h2>
            <p className="mt-2 leading-7 text-gray-600">
              오늘 뭐 보지?는 별도의 회원가입 없이 이용 가능합니다.
              서비스 개선을 위해 뽑기 이용 횟수, 별점, 공유 이벤트 등의 익명 집계 데이터를 수집합니다.
              Google Analytics 및 Firebase를 통해 접속 IP, 브라우저 종류, 방문 페이지 등 익명의 기술적 정보가 자동 수집될 수 있습니다.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-800">2. 수집 목적</h2>
            <p className="mt-2 leading-7 text-gray-600">
              수집된 데이터는 &apos;이번주 자주 추천된 작품&apos;, &apos;별점 높은 작품&apos; 등 통계 기반 콘텐츠 제공 및 서비스 개선에 사용됩니다.
              광고 서비스(카카오 애드핏)를 통한 서비스 운영 비용 충당에도 활용됩니다.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-800">3. 쿠키 및 로컬 스토리지</h2>
            <p className="mt-2 leading-7 text-gray-600">
              서비스 이용 중 브라우저 로컬 스토리지에 일부 상태 정보가 저장될 수 있습니다.
              Google Analytics, 카카오 애드핏은 서비스 분석 및 광고 제공을 위해 쿠키를 사용합니다.
              브라우저 설정에서 쿠키를 거부하거나 삭제할 수 있으나, 일부 기능이 제한될 수 있습니다.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-800">4. 이용 통계 수집 (Google Analytics)</h2>
            <p className="mt-2 leading-7 text-gray-600">
              서비스 개선을 위해 Google Analytics 4를 사용합니다. 방문 페이지, 체류 시간, 접속 국가 등 익명의 이용 통계가 수집되며, 개인을 식별할 수 있는 정보는 수집하지 않습니다.
              Google의 데이터 처리 방식은{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-orange-500 underline">Google 개인정보처리방침</a>
              을 참고하세요.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-800">5. 제3자 서비스</h2>
            <p className="mt-2 leading-7 text-gray-600">
              수집된 정보는 제3자에게 판매하거나 제공하지 않습니다.
              단, 서비스 운영을 위해 아래 제3자 서비스를 사용하며 각 서비스의 개인정보처리방침이 적용됩니다.
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 leading-7 text-gray-600">
              <li>Firebase (Google) — 데이터 저장 및 서버 인프라</li>
              <li>Google Analytics — 방문자 통계 분석</li>
              <li>카카오 애드핏 — 광고 서비스 (행동 기반 광고를 위한 쿠키 수집 가능)</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-800">6. 이용자 권리</h2>
            <p className="mt-2 leading-7 text-gray-600">
              이용자는 언제든지 본인이 남긴 별점 등의 데이터 삭제를 요청할 수 있습니다.
              요청은 아래 문의처를 통해 접수하시면 즉시 처리해드립니다.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-800">7. 운영자 및 문의</h2>
            <p className="mt-2 leading-7 text-gray-600">
              서비스 운영: 오늘은 이거다<br />
              이메일: kyuseok0818@gmail.com<br /><br />
              개인정보 관련 문의는 위 이메일로 연락해주세요.
            </p>
          </div>
        </div>
      </div>
      <WatchFooter />
    </main>
  );
}
