import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";
import { getAdminDb } from "@/lib/firebaseAdmin";
import { foods } from "@/data/foods";
import { FieldValue } from "firebase-admin/firestore";

const validFoodIds = new Set(foods.map((f) => f.id));

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
  if (!rateLimit(`food_pick:${ip}`, 30, 60_000)) {
    return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 });
  }

  const body = await req.json();
  const { foodId, rating } = body;

  if (!validFoodIds.has(Number(foodId)))
    return NextResponse.json({ ok: false, error: "Invalid foodId" }, { status: 400 });

  const food = foods.find((f) => f.id === Number(foodId))!;
  const week = weekString();
  const ref = getAdminDb().collection("foodPicks").doc(`${week}_${food.id}`);

  if (typeof rating === "number" && rating >= 1 && rating <= 5) {
    await ref.set({
      id: food.id, name: food.name, emoji: food.emoji,
      category: food.category, brand: food.brand ?? null,
      count: FieldValue.increment(0),
      totalScore: FieldValue.increment(rating),
      ratingCount: FieldValue.increment(1),
      week, lastRatedAt: FieldValue.serverTimestamp(),
    }, { merge: true });
  } else {
    await ref.set({
      id: food.id, name: food.name, emoji: food.emoji,
      category: food.category, brand: food.brand ?? null,
      count: FieldValue.increment(1),
      week, lastPickedAt: FieldValue.serverTimestamp(),
    }, { merge: true });
  }

  return NextResponse.json({ ok: true });
}
