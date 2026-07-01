"use client";

import { useEffect, useRef } from "react";

let globalAdCount = 0;

export default function KakaoAd() {
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    if (!containerRef.current) return;
    initializedRef.current = true;

    globalAdCount += 1;
    const cbName = `kakaoAdFail_${globalAdCount}`;
    const unitId = `kakao-ad-unit-${globalAdCount}`;

    const ins = document.createElement("ins");
    ins.className = "kakao_ad_area";
    ins.id = unitId;
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

    if (!document.querySelector('script[src="//t1.kakaocdn.net/kas/static/ba.min.js"]')) {
      const script = document.createElement("script");
      script.src = "//t1.kakaocdn.net/kas/static/ba.min.js";
      script.async = true;
      script.charset = "utf-8";
      document.body.appendChild(script);
    } else {
      // 스크립트 이미 있으면 직접 트리거
      const w = window as unknown as Record<string, () => void>;
      if (typeof w.kakao_ad === "function") {
        try { w.kakao_ad(); } catch {}
      }
    }

    return () => {
      delete (window as unknown as Record<string, unknown>)[cbName];
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="my-4 flex w-full items-center justify-center"
    />
  );
}
