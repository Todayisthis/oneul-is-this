import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";
import { filterComment } from "@/lib/filterComment";
import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { foods } from "@/data/foods";
import { contents } from "@/data/contents";

const foodMap = new Map(foods.map((f) => [f.id, f]));
const contentMap = new Map(contents.map((c) => [c.id, c]));

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!rateLimit(`review_submit:${ip}`, 5, 60_000)) {
    return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 });
  }

  const body = await req.json();
  const { type, itemId, rating, content } = body;

  if (!["food", "movie"].includes(type)) return NextResponse.json({ ok: false, error: "Invalid type" }, { status: 400 });
  if (!Number.isFinite(rating) || rating < 1 || rating > 5) return NextResponse.json({ ok: false, error: "Invalid rating" }, { status: 400 });
  if (typeof content !== "string" || content.trim().length === 0 || content.length > 500) return NextResponse.json({ ok: false, error: "Invalid content" }, { status: 400 });

  let itemName: string;
  let itemEmoji: string;
  if (type === "food") {
    const food = foodMap.get(Number(itemId));
    if (!food) return NextResponse.json({ ok: false, error: "Invalid itemId" }, { status: 400 });
    itemName = food.name;
    itemEmoji = food.emoji;
  } else {
    const c = contentMap.get(Number(itemId));
    if (!c) return NextResponse.json({ ok: false, error: "Invalid itemId" }, { status: 400 });
    itemName = c.title;
    itemEmoji = "🎬";
  }

  const { ok, reason } = filterComment(content);
  if (!ok) return NextResponse.json({ ok: false, error: reason }, { status: 400 });

  try {
    await addDoc(collection(db, "reviews"), {
      type,
      itemName,
      itemEmoji,
      rating,
      content: content.trim(),
      likes: 0,
      createdAt: serverTimestamp(),
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
