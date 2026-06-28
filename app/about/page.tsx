import Link from "next/link";
import Footer from "../../components/layout/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-orange-50/40 px-4 py-8">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-6 shadow-sm">
        <Link href="/" className="text-sm text-gray-400 hover:text-orange-500">
          ← 홈으로
        </Link>

        <h1 className="mt-6 text-3xl font-bold">서비스 소개</h1>

        <div className="mt-6 space-y-4 leading-7 text-gray-700">
          <p>
            오늘 뭐 먹지?는 매일 반복되는 “오늘 뭐 먹을까?” 고민을 줄여주기
            위한 음식 추천 서비스입니다.
          </p>

          <p>
            국물, 밥, 면, 분식, 고기, 치킨, 피자, 패스트푸드 등 다양한 음식
            카테고리를 기반으로 메뉴를 추천합니다.
          </p>

          <p>
            사용자는 음식 분류와 브랜드를 선택한 뒤 메뉴 뽑기 버튼을 눌러
            간단하게 메뉴를 추천받을 수 있습니다.
          </p>

          <p>
            앞으로 더 많은 음식 데이터와 편의 기능을 추가하여 더 유용한 음식
            추천 서비스로 개선해 나갈 예정입니다.
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}