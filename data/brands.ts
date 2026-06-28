export type FoodBrand = {
  id: string;
  name: string;
  category: string;
};

export const foodBrands: FoodBrand[] = [
  { id: "kyochon", name: "교촌", category: "치킨" },
  { id: "bbq", name: "BBQ", category: "치킨" },
  { id: "bhc", name: "bhc", category: "치킨" },
  { id: "goobne", name: "굽네", category: "치킨" },
  { id: "nene", name: "네네치킨", category: "치킨" },
  { id: "momstouch", name: "맘스터치", category: "패스트푸드" },
  { id: "mcdonalds", name: "맥도날드", category: "패스트푸드" },
  { id: "burgerking", name: "버거킹", category: "패스트푸드" },
  { id: "lotteria", name: "롯데리아", category: "패스트푸드" },
];