import { NextRequest } from "next/server";
import { getAdminDb } from "@/lib/firebaseAdmin";

export async function isAdminAuthed(req: NextRequest): Promise<boolean> {
  const session = req.cookies.get("admin_session")?.value;
  if (!session || session.length !== 64) return false;
  try {
    const doc = await getAdminDb().collection("admin_sessions").doc(session).get();
    if (!doc.exists) return false;
    const { expiresAt } = doc.data()!;
    return expiresAt.toDate() > new Date();
  } catch {
    return false;
  }
}
