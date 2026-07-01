import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebaseAdmin";
import { isAdminAuthed } from "@/lib/adminAuth";

const ALLOWED = ["feeds", "reviews", "review_comments"] as const;
type Col = (typeof ALLOWED)[number];

function isAllowed(col: string | null): col is Col {
  return ALLOWED.includes(col as Col);
}

export async function GET(req: NextRequest) {
  if (!isAdminAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const col = req.nextUrl.searchParams.get("collection");
  if (!isAllowed(col)) return NextResponse.json({ error: "Invalid collection" }, { status: 400 });

  const snap = await getAdminDb().collection(col).orderBy("createdAt", "desc").limit(200).get();
  const docs = snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      ...data,
      createdAt: data.createdAt?.toDate?.()?.toISOString() ?? null,
    };
  });

  return NextResponse.json({ docs });
}

export async function DELETE(req: NextRequest) {
  if (!isAdminAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const col = req.nextUrl.searchParams.get("collection");
  const id = req.nextUrl.searchParams.get("id");
  if (!isAllowed(col) || !id) return NextResponse.json({ error: "Invalid params" }, { status: 400 });

  await getAdminDb().collection(col).doc(id).delete();
  return NextResponse.json({ ok: true });
}
