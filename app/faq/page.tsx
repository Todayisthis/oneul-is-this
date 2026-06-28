import Link from "next/link";
import Footer from "../../components/layout/Footer";

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-orange-50 px-4 py-8">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-6 shadow-sm">
        <Link href="/" className="text-sm text-gray-400 hover:text-orange-500">
          ← 홈으로
        </Link>

        <h1 className="mt-6 text-3xl font-bold">FAQ</h1>

        <div className="mt-6 space-y-6 leading-7 text-gray-700">
          <section>
            <h2 className="text-xl font-bold">
              Q. 오늘 뭐 먹지?는 어떤 서비스인가요?
            </h2>
            <p className="mt-2">
              음식 분류와 브랜드를 선택하면 조건에 맞는 메뉴를 랜덤으로
              추천해주는 서비스입니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold">
              Q. 추천 결과는 어떻게 정해지나요?
            </h2>
            <p className="mt-2">
              현재는 선택한 음식 분류와 브랜드 조건에 맞는 메뉴 중에서 무작위로
              추천됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold">
              Q. 브랜드 메뉴도 추천되나요?
            </h2>
            <p className="mt-2">
              네. 치킨, 피자, 패스트푸드 등 일부 카테고리는 브랜드 메뉴도 함께
              추천할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold">
              Q. 음식 데이터를 추가 요청할 수 있나요?
            </h2>
            <p className="mt-2">
              네. 문의하기 페이지에 안내된 이메일을 통해 추가하고 싶은 음식이나
              브랜드를 제안할 수 있습니다.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}