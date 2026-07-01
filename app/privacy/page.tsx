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
              </p>
            </section>

            <section className="rounded-2xl border border-gray-700 bg-gray-800 p-6">
              <h2 className="text-base font-bold text-white">2. 수집 목적</h2>
              <p className="mt-3 leading-8">
                수집된 데이터는 서비스 개선 및 인기 추천 통계 제공에 활용됩니다.
              </p>
            </section>

            <section className="rounded-2xl border border-gray-700 bg-gray-800 p-6">
              <h2 className="text-base font-bold text-white">3. 제3자 제공</h2>
              <p className="mt-3 leading-8">
                수집된 정보는 제3자에게 제공하지 않습니다.
                단, 서비스 운영을 위해 Firebase(Google) 인프라를 사용하며,
                카카오 애드핏 광고 네트워크가 일부 쿠키 정보를 수집할 수 있습니다.
              </p>
            </section>

            <section className="rounded-2xl border border-gray-700 bg-gray-800 p-6">
              <h2 className="text-base font-bold text-white">4. 보유 기간</h2>
              <p className="mt-3 leading-8">
                방명록 및 후기 데이터는 서비스 운영 기간 동안 보관되며,
                삭제 요청 시 즉시 처리합니다.
              </p>
            </section>

            <section className="rounded-2xl border border-gray-700 bg-gray-800 p-6">
              <h2 className="text-base font-bold text-white">5. 문의</h2>
              <p className="mt-3 leading-8">
                개인정보 관련 문의는{" "}
                <Link href="/contact" className="text-orange-400 underline hover:text-orange-300">문의하기</Link>
                {" "}페이지를 이용해주세요.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
