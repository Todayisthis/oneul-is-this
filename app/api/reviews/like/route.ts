import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!rateLimit(`review_like:${ip}`, 30, 60_000)) {
    return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 });
  }

  const body = await req.json();
  const { reviewId } = body;

  if (typeof reviewId !== "string" || reviewId.length === 0 || reviewId.length > 128)
    return NextResponse.json({ ok: false, error: "Invalid reviewId" }, { status: 400 });

  try {
    const reviewSnap = await getDoc(doc(db, "reviews", reviewId));
    if (!reviewSnap.exists())
      return NextResponse.json({ ok: false, error: "Review not found" }, { status: 404 });
    await updateDoc(doc(db, "reviews", reviewId), { likes: increment(1) });
  } catch {
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
