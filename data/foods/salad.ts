import type { Food } from "../foods";
import { createFood } from "@/lib/foodFactory";

export const saladFoods: Food[] = [
  createFood({ id: 6001, name: "시저샐러드", emoji: "🥗", category: "샐러드", cuisine: "양식", subCategory: "샐러드", price: 12000, spicy: 0, tags: ["샐러드", "점심", "건강식", "가벼움"], situations: ["건강", "가벼움", "데이트"], eatAlone: true, message: "바삭한 크루통 가득 시저샐러드 어때?" }),
  createFood({ id: 6002, name: "콥샐러드", emoji: "🥗", category: "샐러드", cuisine: "양식", subCategory: "샐러드", price: 14000, spicy: 0, tags: ["샐러드", "점심", "건강식", "든든함"], situations: ["건강", "든든함"], eatAlone: true, message: "재료 가득 콥샐러드로 든든하게!" }),
  createFood({ id: 6003, name: "그릭샐러드", emoji: "🫒", category: "샐러드", cuisine: "양식", subCategory: "샐러드", price: 12000, spicy: 0, tags: ["샐러드", "점심", "건강식", "가벼움"], situations: ["건강", "가벼움"], eatAlone: true, message: "올리브와 페타치즈 그릭샐러드 어때?" }),
  createFood({ id: 6004, name: "카프레제", emoji: "🍅", category: "샐러드", cuisine: "양식", subCategory: "샐러드", price: 13000, spicy: 0, tags: ["샐러드", "점심", "건강식", "가벼움"], situations: ["데이트", "가벼움"], eatAlone: true, message: "모짜렐라와 토마토의 카프레제 어때?" }),
  createFood({ id: 6005, name: "연어샐러드", emoji: "🐟", category: "샐러드", cuisine: "양식", subCategory: "샐러드", price: 15000, spicy: 0, tags: ["샐러드", "점심", "건강식", "해산물"], situations: ["건강", "데이트"], eatAlone: true, message: "신선한 연어 가득 샐러드 어때?" }),
  createFood({ id: 6006, name: "치킨샐러드", emoji: "🍗", category: "샐러드", cuisine: "양식", subCategory: "샐러드", price: 13000, spicy: 0, tags: ["샐러드", "점심", "건강식", "든든함"], situations: ["건강", "가벼움"], eatAlone: true, message: "단백질 가득 치킨샐러드 어때?" }),
  createFood({ id: 6007, name: "리코타샐러드", emoji: "🧀", category: "샐러드", cuisine: "양식", subCategory: "샐러드", price: 14000, spicy: 0, tags: ["샐러드", "점심", "건강식", "가벼움"], situations: ["데이트", "가벼움"], eatAlone: true, message: "부드러운 리코타치즈 샐러드 어때?" }),
  createFood({ id: 6008, name: "참치샐러드", emoji: "🐟", category: "샐러드", cuisine: "양식", subCategory: "샐러드", price: 11000, spicy: 0, tags: ["샐러드", "점심", "건강식", "가성비"], situations: ["건강", "가성비"], eatAlone: true, message: "고단백 참치샐러드 한 그릇 어때?" }),
  createFood({ id: 6009, name: "퀴노아샐러드", emoji: "🌾", category: "샐러드", cuisine: "양식", subCategory: "샐러드", price: 14000, spicy: 0, tags: ["샐러드", "점심", "건강식", "가벼움"], situations: ["건강", "가벼움"], eatAlone: true, message: "슈퍼푸드 퀴노아샐러드로 건강하게!" }),
];
