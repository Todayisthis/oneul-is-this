import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual, randomBytes } from "crypto";
import { rateLimit } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  if (!rateLimit(`admin_auth:${ip}`, 5, 60_000)) {
    return NextResponse.json({ ok: false, error: "Too many attempts" }, { status: 429 });
  }

  const { password } = await req.json();
  const expected = process.env.ADMIN_PASSWORD ?? "";
  const isValid =
    password?.length === expected.length &&
    timingSafeEqual(Buffer.from(password), Buffer.from(expected));
  if (!isValid) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const token = randomBytes(32).toString("hex");
  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8시간
  });
  return res;
}
