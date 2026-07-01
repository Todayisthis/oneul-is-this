import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  increment,
  query,
  orderBy,
  limit,
  serverTimestamp,
  where,
} from "firebase/firestore";

export type Review = {
  id: string;
  type: "food" | "movie";
  itemName: string;
  itemEmoji: string;
  rating: number;
  content: string;
  likes: number;
  createdAt: Date;
};

export type ReviewComment = {
  id: string;
  reviewId: string;
  content: string;
  createdAt: Date;
};

export async function addReview(data: Omit<Review, "id" | "likes" | "createdAt">) {
  await addDoc(collection(db, "reviews"), {
    ...data,
    likes: 0,
    createdAt: serverTimestamp(),
  });
}

export async function getReviews(count = 20): Promise<Review[]> {
  try {
    const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"), limit(count));
    const snap = await getDocs(q);
    return snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        type: data.type,
        itemName: data.itemName,
        itemEmoji: data.itemEmoji,
        rating: data.rating,
        content: data.content,
        likes: data.likes ?? 0,
        createdAt: data.createdAt?.toDate?.() ?? new Date(),
      };
    });
  } catch {
    return [];
  }
}

export async function getRecentReviews(count = 2): Promise<Review[]> {
  return getReviews(count);
}

export async function likeReview(reviewId: string) {
  await updateDoc(doc(db, "reviews", reviewId), { likes: increment(1) });
}

export async function addReviewComment(reviewId: string, content: string) {
  await addDoc(collection(db, "review_comments"), {
    reviewId,
    content,
    createdAt: serverTimestamp(),
  });
}

export async function getReviewComments(reviewId: string): Promise<ReviewComment[]> {
  try {
    const q = query(
      collection(db, "review_comments"),
      where("reviewId", "==", reviewId)
    );
    const snap = await getDocs(q);
    return snap.docs
      .map((d) => {
        const data = d.data();
        return {
          id: d.id,
          reviewId: data.reviewId,
          content: data.content,
          createdAt: data.createdAt?.toDate?.() ?? new Date(),
        };
      })
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  } catch {
    return [];
  }
}
