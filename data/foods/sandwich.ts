import type { Food } from "../foods";
import { createFood } from "@/lib/foodFactory";

export const sandwichFoods: Food[] = [
  createFood({ id: 7001, name: "크루아상샌드위치", emoji: "🥐", category: "샌드위치", cuisine: "양식", subCategory: "샌드위치", price: 9000, spicy: 0, tags: ["샌드위치", "아침", "점심", "가벼움"], situations: ["아침", "가벼움"], eatAlone: true, message: "바삭한 크루아상 샌드위치 어때?" }),
  createFood({ id: 7002, name: "클럽샌드위치", emoji: "🥪", category: "샌드위치", cuisine: "양식", subCategory: "샌드위치", price: 11000, spicy: 0, tags: ["샌드위치", "점심", "든든함"], situations: ["든든함"], eatAlone: true, message: "층층이 쌓인 클럽샌드위치 어때?" }),
  createFood({ id: 7003, name: "BLT샌드위치", emoji: "🥓", category: "샌드위치", cuisine: "양식", subCategory: "샌드위치", price: 10000, spicy: 0, tags: ["샌드위치", "점심", "아침", "가성비"], situations: ["아침", "가성비"], eatAlone: true, message: "베이컨, 상추, 토마토! BLT샌드위치 어때?" }),
  createFood({ id: 7004, name: "치킨샌드위치", emoji: "🍗", category: "샌드위치", cuisine: "양식", subCategory: "샌드위치", price: 10000, spicy: 0, tags: ["샌드위치", "점심", "가성비"], situations: ["가성비", "가벼움"], eatAlone: true, message: "든든한 치킨샌드위치 어때?" }),
  createFood({ id: 7005, name: "스테이크샌드위치", emoji: "🥩", category: "샌드위치", cuisine: "양식", subCategory: "샌드위치", price: 15000, spicy: 0, tags: ["샌드위치", "점심", "저녁", "특별한날"], situations: ["특별한날", "든든함"], eatAlone: true, message: "두툼한 스테이크 샌드위치 어때?" }),
  createFood({ id: 7006, name: "파니니", emoji: "🥪", category: "샌드위치", cuisine: "양식", subCategory: "샌드위치", price: 10000, spicy: 0, tags: ["샌드위치", "점심", "아침", "가벼움"], situations: ["아침", "데이트"], eatAlone: true, message: "노릇하게 눌린 파니니 어때?" }),
  createFood({ id: 7007, name: "햄치즈샌드위치", emoji: "🧀", category: "샌드위치", cuisine: "양식", subCategory: "샌드위치", price: 8000, spicy: 0, tags: ["샌드위치", "아침", "점심", "가성비"], situations: ["아침", "가성비"], eatAlone: true, message: "심플하고 든든한 햄치즈샌드위치 어때?" }),
  createFood({ id: 7008, name: "핫도그", emoji: "🌭", category: "샌드위치", cuisine: "양식", subCategory: "핫도그", price: 5000, spicy: 0, tags: ["샌드위치", "점심", "가성비", "포장"], situations: ["가성비"], eatAlone: true, message: "겨자 바른 핫도그 한 개 어때?" }),
  createFood({ id: 7009, name: "콘도그", emoji: "🌽", category: "샌드위치", cuisine: "양식", subCategory: "핫도그", price: 4000, spicy: 0, tags: ["샌드위치", "점심", "가성비", "포장"], situations: ["가성비"], eatAlone: true, message: "바삭한 콘도그 어때?" }),
];
