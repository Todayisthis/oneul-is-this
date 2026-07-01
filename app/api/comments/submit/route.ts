import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";
import { filterComment } from "@/lib/filterComment";
import { db } from "@/lib/firebase";
import { addDoc, collection, doc, getDoc, serverTimestamp } from "firebase/firestore";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!rateLimit(`comment_submit:${ip}`, 10, 60_000)) {
    return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 });
  }

  const body = await req.json();
  const { reviewId, content } = body;

  if (typeof reviewId !== "string" || reviewId.length === 0 || reviewId.length > 128)
    return NextResponse.json({ ok: false, error: "Invalid reviewId" }, { status: 400 });
  if (typeof content !== "string" || content.trim().length === 0 || content.length > 300)
    return NextResponse.json({ ok: false, error: "Invalid content" }, { status: 400 });

  const reviewSnap = await getDoc(doc(db, "reviews", reviewId));
  if (!reviewSnap.exists())
    return NextResponse.json({ ok: false, error: "Review not found" }, { status: 404 });

  const { ok, reason } = filterComment(content);
  if (!ok) return NextResponse.json({ ok: false, error: reason }, { status: 400 });

  await addDoc(collection(db, "review_comments"), {
    reviewId,
    content: content.trim(),
    createdAt: serverTimestamp(),
  });

  return NextResponse.json({ ok: true });
}
