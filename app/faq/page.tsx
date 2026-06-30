import Link from "next/link";
import Footer from "../../components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "자주 묻는 질문 | 오늘은 이거다",
  description:
    "오늘은 이거다 서비스에 대한 자주 묻는 질문을 확인하세요. 메뉴 추천 방식, 이용 방법, 음식 데이터 제안 등 궁금한 점을 안내해드립니다.",
};

const faqs = [
  {
    q: "오늘 뭐 먹지?는 어떤 서비스인가요?",
    a: "음식 카테고리와 브랜드를 선택하면 조건에 맞는 메뉴를 랜덤으로 추천해주는 서비스입니다. 매일 반복되는 메뉴 고민을 빠르게 해결해드립니다.",
  },
  {
    q: "추천 결과는 어떻게 정해지나요?",
    a: "사용자가 선택한 음식 카테고리와 브랜드 조건에 맞는 메뉴 중에서 무작위로 추천됩니다. 매번 다른 결과가 나올 수 있어 다양한 메뉴를 경험할 수 있습니다.",
  },
  {
    q: "브랜드 메뉴도 추천되나요?",
    a: "네. 치킨, 피자, 패스트푸드 등 일부 카테고리는 브랜드 메뉴도 함께 추천할 수 있습니다. 브랜드 필터를 선택하면 해당 브랜드의 메뉴만 추천받을 수 있습니다.",
  },
  {
    q: "음식 데이터를 추가 요청할 수 있나요?",
    a: "네. 문의하기 페이지에 안내된 이메일을 통해 추가하고 싶은 음식이나 브랜드를 제안할 수 있습니다. 검토 후 반영 여부를 결정합니다.",
  },
  {
    q: "마음에 드는 메뉴가 없으면 어떻게 하나요?",
    a: "다시 뽑기 버튼을 눌러 새로운 메뉴를 추천받을 수 있습니다. 원하는 메뉴가 나올 때까지 여러 번 시도해보세요.",
  },
  {
    q: "여러 카테고리를 동시에 선택할 수 있나요?",
    a: "네. 여러 카테고리를 동시에 선택하면 선택한 모든 카테고리 중에서 랜덤으로 추천됩니다. 먹고 싶은 종류가 여러 개일 때 유용합니다.",
  },
  {
    q: "추천 기록을 저장할 수 있나요?",
    a: "네. 추천받은 메뉴 기록은 브라우저에 저장됩니다. 오른쪽(또는 하단)의 히스토리 영역에서 최근 추천 기록을 확인할 수 있습니다.",
  },
  {
    q: "음식에 평점을 줄 수 있나요?",
    a: "네. 추천받은 음식에 별점을 남길 수 있습니다. 평점 데이터는 인기 메뉴 순위에 반영됩니다.",
  },
  {
    q: "인기 메뉴는 어떻게 정해지나요?",
    a: "많은 사용자들이 추천받은 횟수와 높은 평점을 기준으로 인기 메뉴 순위가 결정됩니다. 실시간으로 업데이트됩니다.",
  },
  {
    q: "모바일에서도 사용할 수 있나요?",
    a: "네. PC와 모바일 모두에서 사용 가능하도록 반응형으로 제작되어 있습니다. 스마트폰 브라우저에서도 동일하게 이용할 수 있습니다.",
  },
  {
    q: "앞으로 어떤 기능이 추가될 예정인가요?",
    a: "오늘 뭐 볼지(영화·드라마 추천), 오늘 어디 갈지(장소 추천), 오늘 뭐 마실지(음료 추천) 등 다양한 일상 결정을 도와주는 기능을 준비 중입니다.",
  },
  {
    q: "서비스 이용 요금이 있나요?",
    a: "아니요. 오늘은 이거다 서비스는 완전 무료로 제공됩니다. 회원가입 없이 바로 이용할 수 있습니다.",
  },
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-orange-50 px-4 py-8">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm">
        <Link href="/" className="text-sm text-gray-400 hover:text-orange-500">
          ← 홈으로
        </Link>

        <h1 className="mt-6 text-3xl font-bold text-gray-900">자주 묻는 질문</h1>
        <p className="mt-2 text-gray-500">서비스 이용에 대해 자주 묻는 질문들을 모았습니다.</p>

        <div className="mt-8 space-y-6">
          {faqs.map((faq, i) => (
            <section key={i} className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
              <h2 className="font-bold text-gray-900">Q. {faq.q}</h2>
              <p className="mt-2 leading-7 text-gray-700">A. {faq.a}</p>
            </section>
          ))}
        </div>

        <div className="mt-8 rounded-2xl bg-orange-50 p-5 text-sm text-gray-600">
          <p>더 궁금한 점이 있으시면 <Link href="/contact" className="font-bold text-orange-500 hover:underline">문의하기</Link> 페이지를 통해 연락주세요.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
