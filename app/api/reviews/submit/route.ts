import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";
import { filterComment } from "@/lib/filterComment";
import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!rateLimit(`review_submit:${ip}`, 5, 60_000)) {
    return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 });
  }

  const body = await req.json();
  const { type, itemName, itemEmoji, rating, content } = body;

  if (!["food", "movie"].includes(type)) return NextResponse.json({ ok: false, error: "Invalid type" }, { status: 400 });
  if (typeof itemName !== "string" || itemName.length > 100) return NextResponse.json({ ok: false, error: "Invalid itemName" }, { status: 400 });
  if (typeof content !== "string" || content.trim().length === 0 || content.length > 500) return NextResponse.json({ ok: false, error: "Invalid content" }, { status: 400 });
  if (typeof rating !== "number" || rating < 1 || rating > 5) return NextResponse.json({ ok: false, error: "Invalid rating" }, { status: 400 });

  const { ok, reason } = filterComment(content);
  if (!ok) return NextResponse.json({ ok: false, error: reason }, { status: 400 });

  await addDoc(collection(db, "reviews"), {
    type,
    itemName: itemName.trim(),
    itemEmoji,
    rating,
    content: content.trim(),
    likes: 0,
    createdAt: serverTimestamp(),
  });

  return NextResponse.json({ ok: true });
}
