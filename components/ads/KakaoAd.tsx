"use client";

import { useEffect, useRef } from "react";

let globalAdCount = 0;
let reloadTimer: ReturnType<typeof setTimeout> | null = null;

interface KakaoAdProps {
  unitId?: string;
  width?: number;
  height?: number;
}

export default function KakaoAd({
  unitId = "DAN-3qhuUl7cRaH3PTPF",
  width = 300,
  height = 250,
}: KakaoAdProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    globalAdCount += 1;
    const cbName = `kakaoAdFail_${globalAdCount}`;

    const ins = document.createElement("ins");
    ins.className = "kakao_ad_area";
    ins.style.display = "none";
    ins.style.width = `${width}px`;
    ins.setAttribute("data-ad-unit", unitId);
    ins.setAttribute("data-ad-width", String(width));
    ins.setAttribute("data-ad-height", String(height));
    ins.setAttribute("data-ad-onfail", cbName);

    (window as unknown as Record<string, unknown>)[cbName] = () => {
      ins.style.display = "none";
      if (containerRef.current) containerRef.current.style.display = "none";
    };

    containerRef.current.appendChild(ins);

    // 모든 광고 ins가 DOM에 올라온 뒤 스크립트를 한 번만 실행
    if (reloadTimer) clearTimeout(reloadTimer);
    reloadTimer = setTimeout(() => {
      const old = document.querySelector('script[data-kakao-ad]');
      if (old) old.remove();
      const script = document.createElement("script");
      script.src = "//t1.kakaocdn.net/kas/static/ba.min.js";
      script.async = true;
      script.charset = "utf-8";
      script.setAttribute("data-kakao-ad", "1");
      document.body.appendChild(script);
      reloadTimer = null;
    }, 100);

    return () => {
      (window as unknown as Record<string, unknown>)[cbName] = () => {};
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
        containerRef.current.style.display = "";
      }
    };
  }, [unitId, width, height]);

  return (
    <div
      ref={containerRef}
      className="my-2 flex w-full items-center justify-center bg-transparent"
      style={{ minHeight: 0 }}
    />
  );
}
