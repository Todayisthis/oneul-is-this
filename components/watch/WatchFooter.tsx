import Link from "next/link";

export default function WatchFooter() {
  return (
    <footer className="mt-16 border-t border-gray-700 bg-gray-950 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 text-sm text-gray-400">
        <div className="flex flex-wrap justify-center gap-5">
          <Link href="/watch/about" className="hover:text-orange-500">서비스 소개</Link>
          <Link href="/watch/privacy" className="hover:text-orange-500">개인정보처리방침</Link>
          <Link href="/watch/contact" className="hover:text-orange-500">문의하기</Link>
          <Link href="/watch/faq" className="hover:text-orange-500">FAQ</Link>
        </div>
        <p>
          작품 정보는{" "}
          <a
            href="https://www.justwatch.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-orange-500"
          >
            JustWatch
          </a>
          를 참고합니다.
        </p>
        <p>© 2026 오늘 뭐 하지? All rights reserved.</p>
      </div>
    </footer>
  );
}
