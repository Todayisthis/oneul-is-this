import Link from "next/link";
import Footer from "../../components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침 | 오늘은 이거다",
  description: "오늘은 이거다 서비스의 개인정보처리방침을 안내합니다.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-orange-50 px-4 py-8">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm">
        <Link href="/" className="text-sm text-gray-400 hover:text-orange-500">
          ← 홈으로
        </Link>

        <h1 className="mt-6 text-3xl font-bold text-gray-900">개인정보처리방침</h1>
        <p className="mt-2 text-sm text-gray-400">최종 업데이트: 2026년 7월 1일</p>

        <div className="mt-8 space-y-8 leading-8 text-gray-700">

          <p>
            오늘은 이거다(이하 "서비스")는 사용자의 개인정보를 중요하게 생각하며,
            「개인정보 보호법」 등 관련 법령을 준수하기 위해 노력합니다.
            본 방침은 서비스가 어떤 정보를 수집하고 어떻게 이용하는지 안내합니다.
          </p>

          <section>
            <h2 className="text-xl font-bold text-gray-900">1. 수집하는 개인정보</h2>
            <p className="mt-3">
              본 서비스는 회원가입 기능을 제공하지 않으며, 이름·전화번호·주소 등의
              직접적인 개인정보를 필수로 수집하지 않습니다. 문의하기를 통해 이메일을
              입력하는 경우, 해당 이메일은 문의 답변 목적으로만 사용됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">2. 브라우저 저장 정보</h2>
            <p className="mt-3">
              음식 추천 기록, 평점, 최근 선택 기록 등 일부 정보는 사용자의 브라우저
              localStorage에 저장될 수 있습니다. 해당 정보는 서버로 전송되지 않으며,
              사용자가 브라우저 데이터를 삭제하면 함께 삭제됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">3. 광고 서비스 및 쿠키</h2>
            <p className="mt-3">
              본 서비스는 카카오 애드핏(Kakao AdFit) 광고 서비스를 사용합니다.
              광고 서비스는 쿠키(Cookie) 및 유사 기술을 사용하여 사용자의 관심사에
              맞는 광고를 제공할 수 있습니다. 광고와 관련된 개인정보 처리에 대한
              자세한 사항은 카카오 개인정보처리방침을 참고하시기 바랍니다.
            </p>
            <p className="mt-3">
              향후 Google AdSense 등 추가적인 제3자 광고 서비스가 사용될 수 있으며,
              이 경우 해당 광고 제공자의 개인정보처리방침이 함께 적용됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">4. 서비스 이용 데이터</h2>
            <p className="mt-3">
              서비스 품질 개선을 위해 음식 추천 횟수, 평점 등의 익명 통계 데이터가
              서버에 저장될 수 있습니다. 해당 데이터는 특정 개인을 식별할 수 없는
              형태로 처리되며, 서비스 개선 목적으로만 활용됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">5. 개인정보의 보유 및 파기</h2>
            <p className="mt-3">
              문의를 통해 수집된 이메일 등의 정보는 문의 처리 완료 후 지체 없이
              파기합니다. 브라우저에 저장된 정보는 사용자가 직접 브라우저 설정에서
              삭제할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">6. 개인정보 관련 문의</h2>
            <p className="mt-3">
              개인정보 관련 문의는{" "}
              <Link href="/contact" className="font-bold text-orange-500 hover:underline">
                문의하기
              </Link>{" "}
              페이지를 통해 접수할 수 있습니다.
            </p>
          </section>

        </div>
      </div>
      <Footer />
    </main>
  );
}
