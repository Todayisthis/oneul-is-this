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
} from "firebase/firestore";
import type { Food } from "@/data/foods";

export type PopularItem = {
  id: number;
  name: string;
  emoji: string;
  category: string;
  brand?: string;
  count: number;
};

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

export async function getTopFoods(topN = 10): Promise<PopularItem[]> {
  try {
    const q = query(
      collection(db, "foodPicks"),
      orderBy("count", "desc"),
      limit(topN)
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => {
      const data = d.data();
      return {
        id: data.id as number,
        name: data.name as string,
        emoji: data.emoji as string,
        category: data.category as string,
        brand: data.brand ?? undefined,
        count: data.count as number,
      };
    });
  } catch (e) {
    console.error("getTopFoods error:", e);
    return [];
  }
}
