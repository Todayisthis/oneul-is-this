import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";
import { filterComment } from "@/lib/filterComment";
import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!rateLimit(`feed_submit:${ip}`, 5, 60_000)) {
    return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 });
  }

  const body = await req.json();
  const { foodId, foodName, foodEmoji, comment } = body;

  if (typeof foodName !== "string" || foodName.trim().length === 0 || foodName.length > 50)
    return NextResponse.json({ ok: false, error: "Invalid foodName" }, { status: 400 });
  if (typeof comment !== "string" || comment.trim().length === 0 || comment.length > 200)
    return NextResponse.json({ ok: false, error: "Invalid comment" }, { status: 400 });

  const { ok, reason } = filterComment(comment);
  if (!ok) return NextResponse.json({ ok: false, error: reason }, { status: 400 });

  await addDoc(collection(db, "feeds"), {
    foodId: Number(foodId),
    foodName: foodName.trim(),
    foodEmoji,
    comment: comment.trim(),
    createdAt: serverTimestamp(),
  });

  return NextResponse.json({ ok: true });
}
