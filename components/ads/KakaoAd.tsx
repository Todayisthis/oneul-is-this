"use client";

import { useEffect, useRef } from "react";

let globalAdCount = 0;

export default function KakaoAd() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    globalAdCount += 1;
    const cbName = `kakaoAdFail_${globalAdCount}`;

    const ins = document.createElement("ins");
    ins.className = "kakao_ad_area";
    ins.style.display = "none";
    ins.style.width = "100%";
    ins.setAttribute("data-ad-unit", "DAN-3qhuUl7cRaH3PTPF");
    ins.setAttribute("data-ad-width", "300");
    ins.setAttribute("data-ad-height", "250");
    ins.setAttribute("data-ad-onfail", cbName);

    (window as unknown as Record<string, unknown>)[cbName] = () => {
      ins.style.display = "none";
      if (containerRef.current) containerRef.current.style.display = "none";
    };

    containerRef.current.appendChild(ins);

    // 기존 스크립트 제거 후 재삽입 → SPA 페이지 이동 시 재스캔
    const old = document.querySelector('script[data-kakao-ad]');
    if (old) old.remove();

    const script = document.createElement("script");
    script.src = "//t1.kakaocdn.net/kas/static/ba.min.js";
    script.async = true;
    script.charset = "utf-8";
    script.setAttribute("data-kakao-ad", "1");
    document.body.appendChild(script);

    return () => {
      delete (window as unknown as Record<string, unknown>)[cbName];
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
        containerRef.current.style.display = "";
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="my-4 flex w-full items-center justify-center"
    />
  );
}
