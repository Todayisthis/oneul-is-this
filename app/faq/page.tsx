import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "FAQ | 오늘은 이거다",
};

const faqs = [
  {
    q: "로그인이나 회원가입이 필요한가요?",
    a: "아니요. 오늘은 이거다는 회원가입 없이 누구나 바로 이용할 수 있어요.",
  },
  {
    q: "음식 추천 결과가 마음에 안 들면 어떻게 하나요?",
    a: "뽑기 버튼을 다시 눌러 새로운 추천을 받을 수 있어요. 특정 음식을 제외하고 싶다면 필터 설정을 활용해보세요.",
  },
  {
    q: "같은 음식이 계속 추천되는 이유가 뭔가요?",
    a: "최근 먹은 음식 기록이 있다면 해당 음식은 제외되지만, 카테고리가 좁을수록 동일한 메뉴가 반복될 수 있어요. 카테고리를 넓혀보세요.",
  },
  {
    q: "넷플릭스 작품 정보는 얼마나 자주 업데이트되나요?",
    a: "작품 목록은 JustWatch 데이터를 기반으로 주기적으로 업데이트됩니다. 최신 정보와 다소 차이가 있을 수 있어요.",
  },
  {
    q: "등록하고 싶은 음식이나 작품이 있어요.",
    a: "문의하기 페이지를 통해 건의해 주시면 검토 후 추가하겠습니다.",
  },
  {
    q: "작성한 후기나 방명록을 삭제하고 싶어요.",
    a: "현재 사용자가 직접 삭제하는 기능은 제공하지 않습니다. 문의하기 페이지로 연락 주시면 처리해드릴게요.",
  },
  {
    q: "광고가 표시되는 이유가 뭔가요?",
    a: "오늘은 이거다는 무료로 운영되는 서비스로, 서버 비용 충당을 위해 광고가 표시됩니다. 이해해 주셔서 감사해요.",
  },
];

export default function FaqPage() {
  return (
    <>
      <main className="min-h-screen bg-gray-950 px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <Link href="/" className="text-sm text-gray-400 hover:text-orange-400">← 홈으로</Link>
          <h1 className="mt-6 text-3xl font-extrabold text-white">자주 묻는 질문</h1>
          <p className="mt-2 text-gray-400">궁금한 점이 있으시면 먼저 확인해보세요.</p>

          <div className="mt-8 space-y-3">
            {faqs.map((item, i) => (
              <div key={i} className="rounded-2xl border border-gray-700 bg-gray-800 p-5">
                <p className="font-bold text-white">Q. {item.q}</p>
                <p className="mt-2 leading-7 text-gray-300">A. {item.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-gray-700 bg-gray-800 p-5 text-center">
            <p className="text-gray-400">해결이 안 되셨나요?</p>
            <Link
              href="/contact"
              className="mt-3 inline-block rounded-xl bg-orange-500 px-6 py-2.5 text-sm font-bold text-white hover:bg-orange-600"
            >
              문의하기 →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
