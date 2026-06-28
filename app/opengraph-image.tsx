import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "오늘 뭐 먹지? - 음식 메뉴 랜덤 추천";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#fff7ed",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 120 }}>🍚</div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: "#1f2937",
            marginTop: 24,
          }}
        >
          오늘 뭐 먹지?
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#6b7280",
            marginTop: 16,
          }}
        >
          점심 · 저녁 메뉴 랜덤 추천 서비스
        </div>
        <div
          style={{
            marginTop: 40,
            background: "#f97316",
            color: "#fff",
            fontSize: 28,
            fontWeight: 700,
            padding: "16px 48px",
            borderRadius: 999,
          }}
        >
          oneul-is-this.com
        </div>
      </div>
    ),
    size
  );
}
