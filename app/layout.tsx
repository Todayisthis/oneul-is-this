import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://oneul-is-this.com"),
  title: {
    default: "오늘 뭐 먹지? 뭐 보지? | 음식·넷플릭스 랜덤 추천 | 오늘은 이거다",
    template: "%s | 오늘은 이거다",
  },
  description:
    "오늘 뭐 먹지? 뭐 보지? 고민될 때! 음식 메뉴 랜덤 추천부터 넷플릭스 작품 추천까지. 한 번의 클릭으로 결정 끝!",
  keywords: [
    "오늘 뭐 먹지",
    "오늘 뭐 보지",
    "음식 추천",
    "메뉴 추천",
    "점심 메뉴 추천",
    "저녁 메뉴 추천",
    "랜덤 음식",
    "오늘의 메뉴",
    "뭐 먹을까",
    "넷플릭스 추천",
    "넷플릭스 뭐볼까",
    "오늘 볼만한 영화",
    "넷플릭스 영화 추천",
    "넷플릭스 드라마 추천",
    "랜덤 추천",
  ],
  authors: [{ name: "오늘 뭐 하지?" }],
  creator: "오늘 뭐 하지?",
  openGraph: {
    title: "오늘 뭐 먹지? | 음식 메뉴 랜덤 추천",
    description:
      "점심, 저녁 뭐 먹을지 고민될 때! 카테고리별 랜덤 음식 추천 서비스.",
    url: "https://oneul-is-this.com",
    siteName: "오늘 뭐 먹지?",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "오늘 뭐 먹지? - 음식 메뉴 랜덤 추천",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "오늘 뭐 먹지? | 음식 메뉴 랜덤 추천",
    description: "점심, 저녁 뭐 먹을지 고민될 때! 랜덤으로 오늘의 메뉴를 추천해드려요.",
    images: ["/og-image.svg"],
  },
  alternates: {
    canonical: "https://oneul-is-this.com",
  },
  verification: {
    google: "mLLe59N63bwrm-c-hUhsSlLKUCJrTxDYK_7Skqj5UWk",
    other: {
      "naver-site-verification": ["52009dc868f35b78a0e25eab06f50b7a5efa2510"],
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${notoSansKr.variable} h-full antialiased`}
      style={{ backgroundColor: "#fff7ed" }}
    >
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6637875835027720"
          crossOrigin="anonymous"
        />
        <script src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js" async />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
