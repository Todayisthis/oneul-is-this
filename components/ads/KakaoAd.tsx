"use client";

import { useEffect, useRef, useState } from "react";

let adCount = 0;

export default function KakaoAd() {
  const insRef = useRef<HTMLModElement>(null);
  const callbackName = useRef<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    adCount += 1;
    const cbName = `kakaoAdFail_${adCount}`;
    callbackName.current = cbName;

    (window as unknown as Record<string, unknown>)[cbName] = () => {
      if (insRef.current) {
        insRef.current.style.display = "none";
      }
    };

    if (insRef.current) {
      insRef.current.setAttribute("data-ad-onfail", cbName);
    }

    const existing = document.querySelector(
      'script[src="https://t1.kakaocdn.net/kas/static/ba.min.js"]'
    );
    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://t1.kakaocdn.net/kas/static/ba.min.js";
      script.async = true;
      script.charset = "utf-8";
      document.body.appendChild(script);
    }

    return () => {
      delete (window as unknown as Record<string, unknown>)[cbName];
    };
  }, []);

  if (!mounted) return <div className="my-4" style={{ minHeight: 258 }} />;

  return (
    <div className="my-4 flex w-full items-center justify-center">
      <ins
        ref={insRef}
        className="kakao_ad_area"
        style={{ display: "none", width: "100%" }}
        data-ad-unit="DAN-3qhuUl7cRaH3PTPF"
        data-ad-width="300"
        data-ad-height="250"
      />
    </div>
  );
}
