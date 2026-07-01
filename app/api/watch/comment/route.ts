import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";
import { filterComment } from "@/lib/filterComment";
import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!rateLimit(`watch_comment:${ip}`, 5, 60_000)) {
    return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 });
  }

  const body = await req.json();
  const { contentId, contentTitle, comment } = body;

  if (typeof contentId !== "number" && typeof contentId !== "string")
    return NextResponse.json({ ok: false, error: "Invalid contentId" }, { status: 400 });
  if (typeof contentTitle !== "string" || contentTitle.trim().length === 0 || contentTitle.length > 100)
    return NextResponse.json({ ok: false, error: "Invalid contentTitle" }, { status: 400 });
  if (typeof comment !== "string" || comment.trim().length === 0 || comment.length > 200)
    return NextResponse.json({ ok: false, error: "Invalid comment" }, { status: 400 });

  const { ok, reason } = filterComment(comment);
  if (!ok) return NextResponse.json({ ok: false, error: reason }, { status: 400 });

  await addDoc(collection(db, "feeds"), {
    foodId: Number(contentId),
    foodName: contentTitle.trim(),
    foodEmoji: "🎬",
    comment: comment.trim(),
    createdAt: serverTimestamp(),
  });

  return NextResponse.json({ ok: true });
}
