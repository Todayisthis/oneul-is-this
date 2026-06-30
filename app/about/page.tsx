import Link from "next/link";
import Footer from "../../components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "서비스 소개 | 오늘은 이거다",
  description:
    "오늘 뭐먹지? 고민될 때 사용하는 랜덤 메뉴 추천 서비스 '오늘은 이거다'를 소개합니다. 국물, 밥, 면, 치킨, 피자 등 다양한 음식을 추천해드립니다.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-orange-50 px-4 py-8">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm">
        <Link href="/" className="text-sm text-gray-400 hover:text-orange-500">
          ← 홈으로
        </Link>

        <h1 className="mt-6 text-3xl font-bold text-gray-900">서비스 소개</h1>

        <div className="mt-8 space-y-8 leading-8 text-gray-700">

          <section>
            <h2 className="text-xl font-bold text-gray-900">오늘은 이거다란?</h2>
            <p className="mt-3">
              '오늘은 이거다'는 매일 반복되는 "오늘 뭐 먹을까?" 고민을 해결해주는 랜덤 메뉴 추천 서비스입니다.
              점심시간마다 동료들과 메뉴를 고르느라 시간을 낭비하거나, 저녁에 혼자 뭘 먹을지 몰라 배달앱을 30분째
              뒤지고 있다면, 이 서비스가 딱 맞습니다.
            </p>
            <p className="mt-3">
              버튼 하나로 오늘의 메뉴를 결정해드립니다. 국물, 밥, 면, 분식, 고기, 치킨, 피자, 패스트푸드 등
              다양한 카테고리 중에서 원하는 조건을 선택하면 그에 맞는 음식을 랜덤으로 추천해드립니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">이런 분들에게 추천해요</h2>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-orange-500">•</span>
                <span>점심·저녁 메뉴를 고르는 데 너무 많은 시간을 쓰는 분</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-orange-500">•</span>
                <span>항상 같은 메뉴만 먹어서 새로운 음식에 도전하고 싶은 분</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-orange-500">•</span>
                <span>가족이나 친구들과 메뉴 선택으로 갈등이 생기는 분</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-orange-500">•</span>
                <span>배달앱에서 어떤 음식을 시킬지 결정 장애가 있는 분</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-orange-500">•</span>
                <span>특정 카테고리 안에서 다양한 메뉴를 골고루 먹고 싶은 분</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">이용 방법</h2>
            <ol className="mt-3 space-y-3">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">1</span>
                <span>상단의 <strong>'오늘 뭐 먹지?'</strong> 버튼을 클릭해 추천 페이지로 이동합니다.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">2</span>
                <span>음식 카테고리(국물, 밥, 면, 분식 등)를 선택합니다. 여러 개도 선택 가능합니다.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">3</span>
                <span>브랜드 메뉴를 원하면 브랜드 필터도 선택할 수 있습니다.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">4</span>
                <span><strong>'메뉴 뽑기'</strong> 버튼을 누르면 조건에 맞는 메뉴가 랜덤으로 추천됩니다.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">5</span>
                <span>마음에 들지 않으면 다시 뽑기를 눌러 새로운 메뉴를 추천받을 수 있습니다.</span>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">추천 음식 카테고리</h2>
            <p className="mt-3">
              현재 서비스에서 추천 가능한 음식 카테고리는 다음과 같습니다.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {["🍲 국물·찌개", "🍚 밥·덮밥", "🍜 면·파스타", "🥟 분식", "🥩 고기·구이", "🍗 치킨", "🍕 피자", "🍔 패스트푸드", "🥗 샐러드·건강식", "🍱 도시락·편의점", "🍣 일식", "🌮 양식·중식"].map((item) => (
                <div key={item} className="rounded-xl bg-orange-50 px-4 py-3 text-sm font-medium text-gray-700">
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">앞으로의 계획</h2>
            <p className="mt-3">
              현재는 음식 추천 기능을 중심으로 서비스를 제공하고 있습니다. 앞으로는 더 많은 음식 데이터를 추가하고,
              사용자 맞춤 추천 기능, 오늘 뭐 볼지(영화·드라마), 오늘 어디 갈지(장소 추천),
              오늘 뭐 마실지(음료 추천) 등 다양한 일상 결정을 도와주는 서비스로 확장할 예정입니다.
            </p>
            <p className="mt-3">
              음식 데이터 추가 요청이나 서비스 개선 의견은 언제든지 문의하기 페이지를 통해 보내주세요.
              더 유용한 서비스가 될 수 있도록 지속적으로 개선해나가겠습니다.
            </p>
          </section>

        </div>
      </div>
      <Footer />
    </main>
  );
}
