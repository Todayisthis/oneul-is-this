import { db } from "./firebase";
import {
  doc, setDoc, increment, serverTimestamp,
  collection, query, orderBy, limit, getDocs, where,
} from "firebase/firestore";
import type { Content } from "@/data/contents";

function weekString() {
  const now = new Date(Date.now() + 9 * 60 * 60 * 1000);
  const day = now.getUTCDay();
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setUTCDate(now.getUTCDate() + diff);
  return monday.toISOString().slice(0, 10);
}

export type WatchPopularItem = {
  id: number;
  title: string;
  year: number;
  type: string;
  count: number;
  avgRating?: number;
  ratingCount?: number;
  url?: string;
};

export async function recordWatchPick(content: Content) {
  try {
    const week = weekString();
    const ref = doc(db, "watchPicks", `${week}_${content.id}`);
    await setDoc(ref, {
      id: content.id,
      title: content.title,
      year: content.year,
      type: content.type,
      url: content.url ?? null,
      count: increment(1),
      week,
      lastPickedAt: serverTimestamp(),
    }, { merge: true });
  } catch (e) {
    console.error("recordWatchPick error:", e);
  }
}

export async function recordWatchRating(content: Content, score: number) {
  try {
    const week = weekString();
    const ref = doc(db, "watchPicks", `${week}_${content.id}`);
    await setDoc(ref, {
      id: content.id,
      title: content.title,
      year: content.year,
      type: content.type,
      url: content.url ?? null,
      totalScore: increment(score),
      ratingCount: increment(1),
      week,
      lastRatedAt: serverTimestamp(),
    }, { merge: true });
  } catch (e) {
    console.error("recordWatchRating error:", e);
  }
}

async function getWeeklyWatchData(): Promise<WatchPopularItem[]> {
  const week = weekString();
  const q = query(
    collection(db, "watchPicks"),
    where("week", "==", week),
    orderBy("count", "desc"),
    limit(50)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data();
    const totalScore = (data.totalScore as number) ?? 0;
    const ratingCount = (data.ratingCount as number) ?? 0;
    return {
      id: data.id as number,
      title: data.title as string,
      year: data.year as number,
      type: data.type as string,
      count: (data.count as number) ?? 0,
      url: (data.url as string) ?? undefined,
      avgRating: ratingCount > 0 ? Math.round((totalScore / ratingCount) * 10) / 10 : undefined,
      ratingCount: ratingCount > 0 ? ratingCount : undefined,
    };
  });
}

export async function getTopWatchPicks(topN = 5): Promise<WatchPopularItem[]> {
  try {
    const items = await getWeeklyWatchData();
    return items.sort((a, b) => b.count - a.count).slice(0, topN);
  } catch (e) {
    console.error("getTopWatchPicks error:", e);
    return [];
  }
}

export async function getTopRatedWatch(topN = 5): Promise<WatchPopularItem[]> {
  try {
    const items = await getWeeklyWatchData();
    return items
      .filter((i) => i.ratingCount !== undefined && i.ratingCount >= 1)
      .sort((a, b) => (b.avgRating ?? 0) - (a.avgRating ?? 0))
      .slice(0, topN);
  } catch (e) {
    console.error("getTopRatedWatch error:", e);
    return [];
  }
}
