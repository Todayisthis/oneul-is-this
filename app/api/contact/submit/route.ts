import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";
import { filterComment } from "@/lib/filterComment";
import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!rateLimit(`contact_submit:${ip}`, 3, 60_000)) {
    return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 });
  }

  const body = await req.json();
  const { name, email, message } = body;

  if (typeof message !== "string" || message.trim().length === 0 || message.length > 1000)
    return NextResponse.json({ ok: false, error: "Invalid message" }, { status: 400 });
  if (typeof name === "string" && name.trim().length > 50)
    return NextResponse.json({ ok: false, error: "Name too long" }, { status: 400 });
  if (email !== undefined && email !== "" && (typeof email !== "string" || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)))
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });

  const { ok, reason } = filterComment(message);
  if (!ok) return NextResponse.json({ ok: false, error: reason }, { status: 400 });

  try {
    await addDoc(collection(db, "contacts"), {
      name: (name ?? "").trim(),
      email: (email ?? "").trim(),
      message: message.trim(),
      createdAt: serverTimestamp(),
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
