import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";
import { getAdminDb } from "@/lib/firebaseAdmin";
import { contents } from "@/data/contents";
import { FieldValue } from "firebase-admin/firestore";

const validContentIds = new Set(contents.map((c) => c.id));

function weekString() {
  const now = new Date(Date.now() + 9 * 60 * 60 * 1000);
  const day = now.getUTCDay();
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setUTCDate(now.getUTCDate() + diff);
  return monday.toISOString().slice(0, 10);
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!rateLimit(`watch_pick:${ip}`, 30, 60_000)) {
    return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 });
  }

  const body = await req.json();
  const { contentId, rating } = body;

  if (!validContentIds.has(Number(contentId)))
    return NextResponse.json({ ok: false, error: "Invalid contentId" }, { status: 400 });

  const content = contents.find((c) => c.id === Number(contentId))!;
  const week = weekString();
  const ref = getAdminDb().collection("watchPicks").doc(`${week}_${content.id}`);

  if (typeof rating === "number" && rating >= 1 && rating <= 5) {
    await ref.set({
      id: content.id, title: content.title, year: content.year,
      type: content.type, url: content.url ?? null,
      count: FieldValue.increment(0),
      totalScore: FieldValue.increment(rating),
      ratingCount: FieldValue.increment(1),
      week, lastRatedAt: FieldValue.serverTimestamp(),
    }, { merge: true });
  } else {
    await ref.set({
      id: content.id, title: content.title, year: content.year,
      type: content.type, url: content.url ?? null,
      count: FieldValue.increment(1),
      week, lastPickedAt: FieldValue.serverTimestamp(),
    }, { merge: true });
  }

  return NextResponse.json({ ok: true });
}
