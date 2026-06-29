import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://oneul-is-this.com"),
  title: {
    default: "오늘 뭐 먹지? | 음식 메뉴 랜덤 추천",
    template: "%s | 오늘 뭐 먹지?",
  },
  description:
    "점심, 저녁 뭐 먹을지 고민될 때! 국물, 밥, 면, 고기, 치킨, 양식 등 카테고리별 랜덤 음식 추천 서비스.",
  keywords: [
    "오늘 뭐 먹지",
    "음식 추천",
    "메뉴 추천",
    "점심 메뉴 추천",
    "저녁 메뉴 추천",
    "랜덤 음식",
    "오늘의 메뉴",
    "뭐 먹을까",
    "음식 고르기",
    "식사 추천",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6637875835027720"
          crossOrigin="anonymous"
        />
        <script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"
          integrity="sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4"
          crossOrigin="anonymous"
          defer
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
