import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";
import { filterComment } from "@/lib/filterComment";
import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const VALID_CATEGORIES = new Set(["음식", "영화", "드라마", "기타"]);

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!rateLimit(`suggestion_submit:${ip}`, 5, 60_000)) {
    return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 });
  }

  const body = await req.json();
  const { name, category, description } = body;

  if (typeof name !== "string" || name.trim().length === 0 || name.length > 100)
    return NextResponse.json({ ok: false, error: "Invalid name" }, { status: 400 });
  if (typeof description === "string" && description.length > 500)
    return NextResponse.json({ ok: false, error: "Description too long" }, { status: 400 });

  const safeCategory = VALID_CATEGORIES.has(category) ? category : "기타";

  const { ok, reason } = filterComment(name + " " + (description ?? ""));
  if (!ok) return NextResponse.json({ ok: false, error: reason }, { status: 400 });

  try {
    await addDoc(collection(db, "suggestions"), {
      name: name.trim(),
      category: safeCategory,
      description: (description ?? "").trim(),
      createdAt: serverTimestamp(),
      status: "pending",
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
