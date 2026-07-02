import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "개인정보처리방침 | 오늘은 이거다",
};

export default function PrivacyPage() {
  return (
    <>
      <main className="min-h-screen bg-gray-950 px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <Link href="/" className="text-sm text-gray-400 hover:text-orange-400">← 홈으로</Link>
          <h1 className="mt-6 text-3xl font-extrabold text-white">개인정보처리방침</h1>
          <p className="mt-2 text-sm text-gray-400">최종 수정일: 2026년 7월 1일</p>

          <div className="mt-8 space-y-6 text-gray-300">
            <section className="rounded-2xl border border-gray-700 bg-gray-800 p-6">
              <h2 className="text-base font-bold text-white">1. 수집하는 정보</h2>
              <p className="mt-3 leading-8">
                오늘은 이거다는 회원가입 없이 이용 가능한 서비스입니다.
                서비스 이용 과정에서 방명록·후기 작성 시 입력하신 텍스트가 저장되며,
                별도의 개인 식별 정보(이름, 이메일, 전화번호 등)는 수집하지 않습니다.
                Google Analytics 및 Firebase를 통해 접속 IP, 브라우저 종류, 방문 페이지 등
                익명의 기술적 정보가 자동 수집될 수 있습니다.
              </p>
            </section>

            <section className="rounded-2xl border border-gray-700 bg-gray-800 p-6">
              <h2 className="text-base font-bold text-white">2. 수집 목적</h2>
              <p className="mt-3 leading-8">
                수집된 데이터는 서비스 개선 및 인기 추천 통계 제공에 활용됩니다.
                광고 서비스(카카오 애드핏)를 통한 서비스 운영 비용 충당에도 활용됩니다.
              </p>
            </section>

            <section className="rounded-2xl border border-gray-700 bg-gray-800 p-6">
              <h2 className="text-base font-bold text-white">3. 쿠키 및 로컬 스토리지</h2>
              <p className="mt-3 leading-8">
                서비스 이용 중 브라우저 로컬 스토리지에 일부 이용 기록(음식 히스토리 등)이 저장될 수 있습니다.
                Google Analytics, 카카오 애드핏은 서비스 분석 및 광고 제공을 위해 쿠키를 사용합니다.
                브라우저 설정에서 쿠키를 거부하거나 삭제할 수 있으나, 일부 기능이 제한될 수 있습니다.
              </p>
            </section>

            <section className="rounded-2xl border border-gray-700 bg-gray-800 p-6">
              <h2 className="text-base font-bold text-white">4. 이용 통계 수집 (Google Analytics)</h2>
              <p className="mt-3 leading-8">
                서비스 개선을 위해 Google Analytics 4를 사용합니다.
                방문 페이지, 체류 시간, 접속 국가 등 익명의 이용 통계가 수집되며,
                개인을 식별할 수 있는 정보는 수집하지 않습니다.
                Google의 데이터 처리 방식은{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-orange-400 underline hover:text-orange-300">Google 개인정보처리방침</a>
                을 참고하세요.
              </p>
            </section>

            <section className="rounded-2xl border border-gray-700 bg-gray-800 p-6">
              <h2 className="text-base font-bold text-white">5. 제3자 제공</h2>
              <p className="mt-3 leading-8">
                수집된 정보는 제3자에게 판매하거나 제공하지 않습니다.
                단, 서비스 운영을 위해 아래 제3자 서비스를 사용하며 각 서비스의 개인정보처리방침이 적용됩니다.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 leading-7">
                <li>Firebase (Google) — 데이터 저장 및 서버 인프라</li>
                <li>Google Analytics — 방문자 통계 분석</li>
                <li>카카오 애드핏 — 광고 서비스 (행동 기반 광고를 위한 쿠키 수집 가능)</li>
              </ul>
            </section>

            <section className="rounded-2xl border border-gray-700 bg-gray-800 p-6">
              <h2 className="text-base font-bold text-white">6. 보유 기간</h2>
              <p className="mt-3 leading-8">
                방명록 및 후기 데이터는 서비스 운영 기간 동안 보관되며,
                삭제 요청 시 즉시 처리합니다.
              </p>
            </section>

            <section className="rounded-2xl border border-gray-700 bg-gray-800 p-6">
              <h2 className="text-base font-bold text-white">7. 이용자 권리</h2>
              <p className="mt-3 leading-8">
                이용자는 언제든지 본인이 작성한 방명록·후기의 열람, 수정, 삭제를 요청할 수 있습니다.
                요청은 아래 문의처를 통해 접수하시면 즉시 처리해드립니다.
              </p>
            </section>

            <section className="rounded-2xl border border-gray-700 bg-gray-800 p-6">
              <h2 className="text-base font-bold text-white">8. 운영자 및 문의</h2>
              <p className="mt-3 leading-8">
                서비스 운영: 오늘은 이거다<br />
                이메일: kyuseok0818@gmail.com<br /><br />
                개인정보 관련 문의는{" "}
                <Link href="/contact" className="text-orange-400 underline hover:text-orange-300">문의하기</Link>
                {" "}페이지 또는 위 이메일로 연락해주세요.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
