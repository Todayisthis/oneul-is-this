import type { NextConfig } from "next";

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // unsafe-eval은 카카오 광고 SDK(ba.min.js)가 내부적으로 사용하므로 유지
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://t1.kakaocdn.net https://ka-f.kakaocdn.net https://pagead2.googlesyndication.com https://ep2.adtrafficquality.google https://googleads.g.doubleclick.net https://www.googletagservices.com https://securepubads.g.doubleclick.net",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https:",
      "connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://firestore.googleapis.com https://identitytoolkit.googleapis.com wss://*.firebaseio.com https://images.unsplash.com https://api.unsplash.com https://*.kakao.com https://*.kakaocdn.net https://*.daumcdn.net https://*.onkakao.net https://stat.tiara.kakao.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google",
      "frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://t1.kakaocdn.net https://ka-f.kakaocdn.net https://*.kakao.com https://*.daumcdn.net",
      "object-src 'none'",
      "base-uri 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.kakaocdn.net" },
      { protocol: "https", hostname: "**.kakao.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
