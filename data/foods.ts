export type Food = {
  id: number;
  name: string;
  category: string;
  subCategory: string;
  emoji: string;
  price: number;
  spicy: number;
  tags: string[];
  message: string;
};

export const foods: Food[] = [
  {
    id: 1,
    name: "김치찌개",
    category: "한식",
    subCategory: "찌개",
    emoji: "🍲",
    price: 9000,
    spicy: 3,
    tags: ["점심", "저녁", "혼밥"],
    message: "오늘은 뜨끈한 김치찌개가 딱입니다.",
  },
  {
    id: 2,
    name: "제육볶음",
    category: "한식",
    subCategory: "밥",
    emoji: "🥩",
    price: 9500,
    spicy: 4,
    tags: ["점심", "저녁", "든든함"],
    message: "오늘은 고민하지 말고 제육입니다.",
  },
  {
    id: 3,
    name: "돈까스",
    category: "일식",
    subCategory: "튀김",
    emoji: "🍛",
    price: 10000,
    spicy: 0,
    tags: ["점심", "혼밥", "무난함"],
    message: "실패 없는 선택, 오늘은 돈까스입니다.",
  },
  {
    id: 4,
    name: "라면",
    category: "분식",
    subCategory: "면",
    emoji: "🍜",
    price: 5000,
    spicy: 3,
    tags: ["간단", "야식", "가성비"],
    message: "오늘은 간단하게 라면으로 가도 좋습니다.",
  },
  {
    id: 5,
    name: "마라탕",
    category: "중식",
    subCategory: "국물",
    emoji: "🥘",
    price: 12000,
    spicy: 5,
    tags: ["저녁", "매운맛", "친구"],
    message: "자극이 필요한 날엔 마라탕입니다.",
  },
  {
    id: 6,
    name: "초밥",
    category: "일식",
    subCategory: "회",
    emoji: "🍣",
    price: 15000,
    spicy: 0,
    tags: ["데이트", "저녁", "깔끔함"],
    message: "오늘은 깔끔하게 초밥 어떠세요?",
  },
  {
    id: 7,
    name: "햄버거",
    category: "양식",
    subCategory: "패스트푸드",
    emoji: "🍔",
    price: 8000,
    spicy: 0,
    tags: ["간단", "점심", "혼밥"],
    message: "빠르고 든든하게 햄버거로 갑시다.",
  },
  {
    id: 8,
    name: "치킨",
    category: "치킨",
    subCategory: "배달",
    emoji: "🍗",
    price: 22000,
    spicy: 1,
    tags: ["야식", "배달", "친구"],
    message: "오늘 치킨은 핑계가 필요 없습니다.",
  },
  {
    id: 9,
    name: "소금빵",
    category: "빵",
    subCategory: "베이커리",
    emoji: "🥐",
    price: 3500,
    spicy: 0,
    tags: ["간식", "카페", "가벼움"],
    message: "오늘은 고소한 소금빵이 어울립니다.",
  },
  {
    id: 10,
    name: "아메리카노",
    category: "카페",
    subCategory: "커피",
    emoji: "☕",
    price: 4500,
    spicy: 0,
    tags: ["카페", "가벼움", "휴식"],
    message: "오늘은 커피 한 잔으로 리셋하세요.",
  },
];

export const foodCategories = [
  "전체",
  ...Array.from(new Set(foods.map((food) => food.category))),
];