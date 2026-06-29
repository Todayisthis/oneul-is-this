import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query");
  if (!query) return NextResponse.json({ url: null });

  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key) return NextResponse.json({ url: null });

  try {
    const res = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=squarish&content_filter=high`,
      { headers: { Authorization: `Client-ID ${key}` }, next: { revalidate: 3600 } }
    );
    if (!res.ok) return NextResponse.json({ url: null });
    const data = await res.json();
    return NextResponse.json({ url: data.urls?.regular ?? null });
  } catch {
    return NextResponse.json({ url: null });
  }
}
