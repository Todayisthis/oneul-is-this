import { NextRequest, NextResponse } from "next/server";

const foodTranslations: Record<string, string> = {
  // 국물
  "김치찌개": "kimchi jjigae korean stew",
  "된장찌개": "doenjang jjigae korean soybean soup",
  "순두부찌개": "sundubu jjigae soft tofu stew",
  "부대찌개": "budae jjigae army stew",
  "갈비탕": "galbitang korean beef rib soup",
  "설렁탕": "seolleongtang ox bone soup",
  "감자탕": "gamjatang pork bone soup",
  "해장국": "haejangguk hangover soup",
  "미역국": "miyeok guk seaweed soup",
  "육개장": "yukgaejang spicy beef soup",
  "삼계탕": "samgyetang ginseng chicken soup",
  "곰탕": "gomtang beef bone soup",
  // 밥
  "비빔밥": "bibimbap korean rice bowl",
  "볶음밥": "bokkeumbap korean fried rice",
  "김밥": "gimbap korean rice roll",
  "덮밥": "korean rice bowl topping",
  "쌈밥": "ssambap korean wrap rice",
  "솥밥": "korean stone pot rice",
  "오므라이스": "omurice japanese omelette rice",
  "카레": "japanese curry rice",
  "규동": "gyudon japanese beef rice bowl",
  // 면
  "짜장면": "jajangmyeon black bean noodles",
  "짬뽕": "jjamppong korean spicy seafood noodle",
  "냉면": "naengmyeon korean cold noodles",
  "라면": "ramen korean instant noodles",
  "우동": "udon japanese noodle soup",
  "파스타": "pasta italian",
  "카르보나라": "carbonara pasta",
  "로제파스타": "rose sauce pasta",
  "크림파스타": "cream pasta",
  "봉골레": "vongole pasta clam",
  "쌀국수": "pho vietnamese rice noodle",
  "마라탕": "malatang chinese spicy soup",
  "팟타이": "pad thai noodles",
  // 고기
  "삼겹살": "samgyeopsal korean grilled pork belly",
  "갈비": "galbi korean grilled ribs",
  "불고기": "bulgogi korean marinated beef",
  "삼겹살구이": "korean pork belly grill bbq",
  "스테이크": "steak beef grilled",
  "등심스테이크": "ribeye steak grilled",
  "안심스테이크": "tenderloin steak",
  "티본스테이크": "t-bone steak",
  "함박스테이크": "hamburger steak",
  "폭립": "pork ribs bbq",
  "양갈비": "lamb chops grilled",
  // 분식
  "떡볶이": "tteokbokki korean spicy rice cake",
  "순대": "sundae korean blood sausage",
  "튀김": "korean fried food tempura",
  "핫도그": "corn dog hotdog",
  "토스트": "toast sandwich",
  // 치킨
  "치킨": "korean fried chicken",
  "양념치킨": "korean spicy fried chicken",
  "후라이드치킨": "crispy fried chicken",
  "간장치킨": "soy garlic korean chicken",
  // 피자
  "피자": "pizza slice",
  "페퍼로니피자": "pepperoni pizza",
  // 패스트푸드
  "버거": "hamburger burger",
  "햄버거": "hamburger",
  "치즈버거": "cheeseburger",
  // 양식
  "리소토": "risotto italian",
  "오믈렛": "omelette breakfast",
  "에그베네딕트": "eggs benedict brunch",
  "팬케이크": "pancakes syrup",
  "와플": "waffles",
  "프렌치토스트": "french toast",
  // 샐러드
  "샐러드": "fresh salad bowl",
  "시저샐러드": "caesar salad",
  "그릭샐러드": "greek salad",
  "연어샐러드": "salmon salad",
  // 샌드위치
  "샌드위치": "sandwich",
  "BLT샌드위치": "BLT sandwich",
  "클럽샌드위치": "club sandwich",
  "파니니": "panini grilled sandwich",
};

const categoryTranslations: Record<string, string> = {
  "국물": "korean soup stew warm",
  "밥": "korean rice dish bowl",
  "면": "korean noodles bowl",
  "고기": "korean grilled meat bbq",
  "분식": "korean street food snack",
  "치킨": "korean fried chicken crispy",
  "피자": "pizza cheese",
  "패스트푸드": "fast food burger fries",
  "양식": "western food restaurant",
  "샐러드": "fresh salad healthy",
  "샌드위치": "sandwich bread",
};

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name") ?? "";
  const category = req.nextUrl.searchParams.get("category") ?? "";

  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key) return NextResponse.json({ url: null });

  // 음식 이름 → 영어 번역 우선, 없으면 카테고리 번역
  const englishQuery =
    foodTranslations[name] ??
    categoryTranslations[category] ??
    `${name} food`;

  try {
    const res = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(englishQuery)}&orientation=squarish&content_filter=high`,
      { headers: { Authorization: `Client-ID ${key}` }, next: { revalidate: 3600 } }
    );
    if (!res.ok) return NextResponse.json({ url: null });
    const data = await res.json();
    return NextResponse.json({ url: data.urls?.regular ?? null });
  } catch {
    return NextResponse.json({ url: null });
  }
}
