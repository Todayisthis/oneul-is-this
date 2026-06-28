import Link from "next/link";
import Footer from "../../components/layout/Footer";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-orange-50/40 px-4 py-8">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-6 shadow-sm">
        <Link href="/" className="text-sm text-gray-400 hover:text-orange-500">
          ← 홈으로
        </Link>

        <h1 className="mt-6 text-3xl font-bold">문의하기</h1>

        <div className="mt-6 space-y-5 leading-7 text-gray-700">
          <p>
            서비스 이용 중 불편한 점, 오류 제보, 음식 데이터 추가 요청, 기타
            문의가 있다면 아래 이메일로 연락해 주세요.
          </p>

          <div className="rounded-2xl bg-gray-50 p-4">
            <p className="font-bold text-gray-800">이메일</p>
            <p className="mt-1 text-gray-600">kyuseok0818@gmail.com</p>
          </div>

          <p>
            문의 내용에 따라 답변이 지연될 수 있으며, 서비스 개선에 필요한
            의견은 적극적으로 검토하겠습니다.
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}