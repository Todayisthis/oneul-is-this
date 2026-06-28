import { db } from "./firebase";
import {
  doc,
  getDoc,
  setDoc,
  increment,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import type { Food } from "@/data/foods";

export async function recordFoodPick(food: Food) {
  try {
    const ref = doc(db, "foodPicks", String(food.id));
    await setDoc(
      ref,
      {
        id: food.id,
        name: food.name,
        emoji: food.emoji,
        category: food.category,
        brand: food.brand ?? null,
        count: increment(1),
      },
      { merge: true }
    );
  } catch (e) {
    console.error("recordFoodPick error:", e);
  }
}

export async function getTopFoods(topN = 10): Promise<
  { id: number; name: string; emoji: string; category: string; brand?: string; count: number }[]
> {
  try {
    const q = query(
      collection(db, "foodPicks"),
      orderBy("count", "desc"),
      limit(topN)
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => d.data() as any);
  } catch (e) {
    console.error("getTopFoods error:", e);
    return [];
  }
}
