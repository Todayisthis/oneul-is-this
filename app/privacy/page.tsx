import Link from "next/link";
import Footer from "../../components/layout/Footer";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-orange-50/40 px-4 py-8">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-6 shadow-sm">
        <Link href="/" className="text-sm text-gray-400 hover:text-orange-500">
          ← 홈으로
        </Link>

        <h1 className="mt-6 text-3xl font-bold">개인정보처리방침</h1>

        <div className="mt-6 space-y-5 leading-7 text-gray-700">
          <p>
            오늘 뭐 먹지?는 사용자의 개인정보를 중요하게 생각하며, 관련 법령을
            준수하기 위해 노력합니다.
          </p>

          <section>
            <h2 className="text-xl font-bold">1. 수집하는 개인정보</h2>
            <p className="mt-2">
              현재 본 서비스는 회원가입 기능을 제공하지 않으며, 이름, 전화번호,
              주소 등의 직접적인 개인정보를 필수로 수집하지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold">2. 브라우저 저장 정보</h2>
            <p className="mt-2">
              음식 추천 기록, 평점, 최근 선택 기록 등 일부 정보는 사용자의
              브라우저 localStorage에 저장될 수 있습니다. 해당 정보는 서버로
              전송되지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold">3. 광고 및 쿠키</h2>
            <p className="mt-2">
              향후 Google AdSense 등 제3자 광고 서비스가 사용될 수 있습니다.
              이 경우 광고 제공자는 쿠키를 사용하여 맞춤형 광고를 제공할 수
              있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold">4. 개인정보 관련 문의</h2>
            <p className="mt-2">
              개인정보 관련 문의는 문의하기 페이지에 안내된 이메일을 통해
              접수할 수 있습니다.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}