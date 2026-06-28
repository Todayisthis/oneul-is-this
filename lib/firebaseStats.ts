import { db } from "./firebase";
import {
  doc,
  setDoc,
  increment,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  where,
} from "firebase/firestore";
import type { Food } from "@/data/foods";

export type PopularItem = {
  id: number;
  name: string;
  emoji: string;
  category: string;
  brand?: string;
  count: number;
  avgRating?: number;
  ratingCount?: number;
};

// 이번 주 월요일 날짜 문자열 (주 단위 리셋 기준)
function weekString() {
  const now = new Date();
  const day = now.getDay(); // 0=일, 1=월 ...
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setDate(now.getDate() + diff);
  return monday.toISOString().slice(0, 10); // e.g. "2026-06-23"
}

export async function recordFoodPick(food: Food) {
  try {
    const week = weekString();
    const ref = doc(db, "foodPicks", `${week}_${food.id}`);
    await setDoc(
      ref,
      {
        id: food.id,
        name: food.name,
        emoji: food.emoji,
        category: food.category,
        brand: food.brand ?? null,
        count: increment(1),
        week,
      },
      { merge: true }
    );
  } catch (e) {
    console.error("recordFoodPick error:", e);
  }
}

export async function recordFoodRating(food: Food, score: number) {
  try {
    const week = weekString();
    const ref = doc(db, "foodPicks", `${week}_${food.id}`);
    await setDoc(
      ref,
      {
        id: food.id,
        name: food.name,
        emoji: food.emoji,
        category: food.category,
        brand: food.brand ?? null,
        totalScore: increment(score),
        ratingCount: increment(1),
        week,
      },
      { merge: true }
    );
  } catch (e) {
    console.error("recordFoodRating error:", e);
  }
}

export async function getTopFoods(topN = 5): Promise<PopularItem[]> {
  try {
    const week = weekString();
    const q = query(
      collection(db, "foodPicks"),
      where("week", "==", week),
      orderBy("count", "desc"),
      limit(topN)
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => {
      const data = d.data();
      const totalScore = (data.totalScore as number) ?? 0;
      const ratingCount = (data.ratingCount as number) ?? 0;
      return {
        id: data.id as number,
        name: data.name as string,
        emoji: data.emoji as string,
        category: data.category as string,
        brand: data.brand ?? undefined,
        count: data.count as number,
        avgRating: ratingCount > 0 ? Math.round((totalScore / ratingCount) * 10) / 10 : undefined,
        ratingCount: ratingCount > 0 ? ratingCount : undefined,
      };
    });
  } catch (e) {
    console.error("getTopFoods error:", e);
    return [];
  }
}

export async function saveContactMessage(data: {
  name: string;
  email: string;
  message: string;
}) {
  const { addDoc, collection: col, serverTimestamp } = await import("firebase/firestore");
  await addDoc(col(db, "contacts"), {
    ...data,
    createdAt: serverTimestamp(),
  });
}
