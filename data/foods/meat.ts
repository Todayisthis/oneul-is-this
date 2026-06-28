import type { Food } from "../foods";
import { createFood } from "@/lib/foodFactory";

export const meatFoods: Food[] = [
  createFood({ id: 4001, name: "돈가스", category: "고기", subCategory: "돈가스", cuisine: "일식", price: 10000, spicy: 0, tags: ["고기", "점심", "저녁", "혼밥"], situations: ["든든함"], message: "바삭한 돈가스 어때?" }),
  createFood({ id: 4002, name: "치즈돈가스", category: "고기", subCategory: "돈가스", cuisine: "일식", price: 12000, spicy: 0, tags: ["고기", "점심", "저녁", "혼밥"], situations: ["든든함"], message: "치즈 가득 돈가스로 든든하게!" }),
  createFood({ id: 4003, name: "생선가스", category: "고기", subCategory: "돈가스", cuisine: "일식", price: 11000, spicy: 0, tags: ["고기", "점심", "저녁", "혼밥"], situations: ["가벼움"], message: "담백한 생선가스도 좋아!" }),
  createFood({ id: 4004, name: "치킨가스", category: "고기", subCategory: "돈가스", cuisine: "일식", price: 11000, spicy: 0, tags: ["고기", "점심", "저녁", "혼밥"], situations: ["든든함"], message: "바삭한 치킨가스로 가자!" }),

  createFood({ id: 4005, name: "돼지고기김치볶음", category: "고기", subCategory: "볶음", cuisine: "한식", price: 11000, spicy: 2, tags: ["고기", "밥", "점심", "저녁", "매운맛"], situations: ["든든함"], message: "밥이랑 찰떡인 돼지고기김치볶음!" }),
  createFood({ id: 4006, name: "보쌈", category: "고기", subCategory: "구이", cuisine: "한식", price: 25000, spicy: 0, tags: ["고기", "저녁", "술안주", "모임"], situations: ["친구와", "가족과"], eatAlone: false, message: "푸짐하게 보쌈 한 접시 어때?" }),
  createFood({ id: 4007, name: "두부김치", category: "고기", subCategory: "볶음", cuisine: "한식", price: 12000, spicy: 2, tags: ["고기", "저녁", "술안주", "매운맛"], situations: ["친구와"], message: "두부김치로 가볍게 술안주 느낌!" }),

  createFood({ id: 4008, name: "LA갈비", category: "고기", subCategory: "갈비", cuisine: "한식", price: 25000, spicy: 0, tags: ["고기", "저녁", "가족", "모임"], situations: ["가족과", "주말"], eatAlone: false, message: "달짝지근한 LA갈비 어때?" }),
  createFood({ id: 4009, name: "돼지갈비찜", category: "고기", subCategory: "갈비", cuisine: "한식", price: 18000, spicy: 1, tags: ["고기", "저녁", "든든함"], situations: ["가족과"], message: "부드러운 돼지갈비찜으로 든든하게!" }),
  createFood({ id: 4010, name: "소갈비찜", category: "고기", subCategory: "갈비", cuisine: "한식", price: 25000, spicy: 1, tags: ["고기", "저녁", "든든함"], situations: ["가족과", "몸보신"], message: "진하게 먹고 싶을 땐 소갈비찜!" }),
  createFood({ id: 4011, name: "찜갈비", category: "고기", subCategory: "갈비", cuisine: "한식", price: 22000, spicy: 2, tags: ["고기", "저녁", "매운맛"], situations: ["든든함"], message: "매콤한 찜갈비로 제대로 먹자!" }),
  createFood({ id: 4012, name: "매운갈비찜", category: "고기", subCategory: "갈비", cuisine: "한식", price: 22000, spicy: 3, tags: ["고기", "저녁", "매운맛"], situations: ["스트레스"], message: "스트레스 받을 땐 매운갈비찜!" }),
  createFood({ id: 4013, name: "숯불갈비", category: "고기", subCategory: "갈비", cuisine: "한식", price: 18000, spicy: 0, tags: ["고기", "저녁", "회식", "모임"], situations: ["친구와", "가족과"], eatAlone: false, message: "숯불 향 가득한 갈비 가자!" }),

  createFood({ id: 4014, name: "불고기", category: "고기", subCategory: "구이", cuisine: "한식", price: 13000, spicy: 0, tags: ["고기", "밥", "점심", "저녁"], situations: ["든든함"], message: "달달한 불고기로 든든하게!" }),
  createFood({ id: 4015, name: "떡갈비", category: "고기", subCategory: "구이", cuisine: "한식", price: 13000, spicy: 0, tags: ["고기", "밥", "점심", "저녁"], situations: ["든든함"], message: "부드러운 떡갈비 한 끼!" }),

  createFood({ id: 4016, name: "소곱창", category: "고기", subCategory: "곱창", cuisine: "한식", price: 22000, spicy: 0, tags: ["고기", "저녁", "술안주", "모임"], situations: ["친구와"], eatAlone: false, message: "고소한 소곱창 먹으러 가자!" }),
  createFood({ id: 4017, name: "돼지알곱창", category: "고기", subCategory: "곱창", cuisine: "한식", price: 13000, spicy: 2, tags: ["고기", "저녁", "야식", "술안주", "매운맛"], situations: ["친구와"], message: "매콤한 돼지알곱창 어때?" }),
  createFood({ id: 4018, name: "돼지야채곱창", category: "고기", subCategory: "곱창", cuisine: "한식", price: 13000, spicy: 2, tags: ["고기", "저녁", "야식", "술안주", "매운맛"], situations: ["친구와"], message: "야채곱창으로 매콤하게!" }),
  createFood({ id: 4019, name: "막창", category: "고기", subCategory: "곱창", cuisine: "한식", price: 16000, spicy: 0, tags: ["고기", "저녁", "술안주", "모임"], situations: ["친구와"], eatAlone: false, message: "쫄깃한 막창으로 가자!" }),

  createFood({ id: 4020, name: "육회", category: "고기", subCategory: "육회", cuisine: "한식", price: 18000, spicy: 0, tags: ["고기", "저녁", "술안주"], situations: ["친구와", "연인과"], message: "고소한 육회로 특별하게!" }),
  createFood({ id: 4021, name: "육사시미", category: "고기", subCategory: "육회", cuisine: "한식", price: 25000, spicy: 0, tags: ["고기", "저녁", "술안주"], situations: ["친구와", "연인과"], eatAlone: false, message: "깔끔하게 육사시미 어때?" }),
  createFood({ id: 4022, name: "육전", category: "고기", subCategory: "구이", cuisine: "한식", price: 15000, spicy: 0, tags: ["고기", "저녁", "술안주"], situations: ["비오는날", "친구와"], message: "고소한 육전으로 기분 좋게!" }),

  createFood({ id: 4023, name: "어복쟁반", category: "고기", subCategory: "전골", cuisine: "한식", price: 30000, spicy: 0, tags: ["고기", "국물", "저녁", "모임"], situations: ["추운날", "가족과"], eatAlone: false, message: "푸짐한 어복쟁반으로 따뜻하게!" }),

  createFood({ id: 4024, name: "닭갈비", category: "고기", subCategory: "닭요리", cuisine: "한식", price: 13000, spicy: 2, tags: ["고기", "저녁", "매운맛", "모임"], situations: ["친구와", "스트레스"], eatAlone: false, message: "매콤한 닭갈비로 든든하게!" }),
  createFood({ id: 4025, name: "닭도리탕", category: "고기", subCategory: "닭요리", cuisine: "한식", price: 18000, spicy: 2, tags: ["고기", "국물", "저녁", "매운맛"], situations: ["추운날", "가족과"], eatAlone: false, message: "얼큰한 닭도리탕 어때?" }),
  createFood({ id: 4026, name: "닭똥집", category: "고기", subCategory: "닭요리", cuisine: "한식", price: 12000, spicy: 1, tags: ["고기", "저녁", "야식", "술안주"], situations: ["친구와"], message: "쫄깃한 닭똥집으로 한잔 느낌!" }),
  createFood({ id: 4027, name: "닭발", category: "고기", subCategory: "닭요리", cuisine: "한식", price: 15000, spicy: 3, tags: ["고기", "야식", "술안주", "매운맛"], situations: ["스트레스", "친구와"], message: "맵게 당기는 날엔 닭발!" }),
];