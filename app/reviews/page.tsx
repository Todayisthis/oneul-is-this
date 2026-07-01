import type { Metadata } from "next";
import ReviewsClient from "./ReviewsClient";

export const metadata: Metadata = {
  title: "후기 게시판 | 오늘은 이거다",
  description: "오늘 뭐 먹지, 뭐 보지? 음식과 영화 후기를 공유해보세요.",
  alternates: { canonical: "https://oneul-is-this.com/reviews" },
};

export default function ReviewsPage() {
  return <ReviewsClient />;
}
