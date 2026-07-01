import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebaseAdmin";

export async function POST(req: NextRequest) {
  const session = req.cookies.get("admin_session")?.value;
  if (session && session.length === 64) {
    try {
      await getAdminDb().collection("admin_sessions").doc(session).delete();
    } catch {
      // 실패해도 쿠키는 삭제
    }
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}
