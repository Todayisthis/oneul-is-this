import type { Food } from "../foods";
import { createFood } from "@/lib/foodFactory";

export const westernFoods: Food[] = [
  createFood({ id: 5001, name: "리소토", emoji: "🍚", category: "양식", subCategory: "리소토", cuisine: "양식", price: 14000, spicy: 0, tags: ["양식", "혼밥", "점심", "저녁"], situations: ["데이트", "가벼움"], eatAlone: true, message: "크리미한 리소토 한 그릇 어때?" }),
  createFood({ id: 5002, name: "버섯리소토", emoji: "🍄", category: "양식", subCategory: "리소토", cuisine: "양식", price: 15000, spicy: 0, tags: ["양식", "혼밥", "점심", "저녁", "건강식"], situations: ["데이트", "가벼움"], eatAlone: true, message: "향긋한 버섯 가득 버섯리소토 어때?" }),
  createFood({ id: 5003, name: "새우리소토", emoji: "🦐", category: "양식", subCategory: "리소토", cuisine: "양식", price: 16000, spicy: 0, tags: ["양식", "혼밥", "점심", "저녁", "해산물"], situations: ["데이트"], eatAlone: true, message: "탱글탱글 새우리소토 어때?" }),
  createFood({ id: 5004, name: "해산물리소토", emoji: "🦞", category: "양식", subCategory: "리소토", cuisine: "양식", price: 18000, spicy: 0, tags: ["양식", "혼밥", "저녁", "해산물", "특별한날"], situations: ["데이트", "특별한날"], eatAlone: true, message: "신선한 해산물 가득 리소토 어때?" }),
  createFood({ id: 5005, name: "트러플리소토", emoji: "🍄", category: "양식", subCategory: "리소토", cuisine: "양식", price: 22000, spicy: 0, tags: ["양식", "혼밥", "저녁", "특별한날"], situations: ["데이트", "특별한날"], eatAlone: true, message: "고급스러운 트러플 향 리소토 어때?" }),
  createFood({ id: 5006, name: "오믈렛", emoji: "🍳", category: "양식", subCategory: "오믈렛", cuisine: "양식", price: 10000, spicy: 0, tags: ["양식", "아침", "점심", "혼밥", "가성비"], situations: ["아침", "가벼움"], eatAlone: true, message: "폭신한 오믈렛으로 든든하게!" }),
  createFood({ id: 5007, name: "치즈오믈렛", emoji: "🧀", category: "양식", subCategory: "오믈렛", cuisine: "양식", price: 11000, spicy: 0, tags: ["양식", "아침", "점심", "혼밥"], situations: ["아침", "가벼움"], eatAlone: true, message: "치즈 흘러내리는 오믈렛 어때?" }),
  createFood({ id: 5008, name: "에그베네딕트", emoji: "🍳", category: "양식", subCategory: "브런치", cuisine: "양식", price: 14000, spicy: 0, tags: ["양식", "아침", "브런치", "점심"], situations: ["아침", "데이트"], eatAlone: true, message: "주말 브런치엔 에그베네딕트 어때?" }),
  createFood({ id: 5009, name: "프렌치토스트", emoji: "🍞", category: "양식", subCategory: "브런치", cuisine: "양식", price: 11000, spicy: 0, tags: ["양식", "아침", "브런치", "점심"], situations: ["아침", "가벼움"], eatAlone: true, message: "달콤한 프렌치토스트로 하루 시작!" }),
  createFood({ id: 5010, name: "팬케이크", emoji: "🥞", category: "양식", subCategory: "브런치", cuisine: "양식", price: 12000, spicy: 0, tags: ["양식", "아침", "브런치"], situations: ["아침", "데이트"], eatAlone: true, message: "시럽 뿌린 팬케이크 한 스택 어때?" }),
  createFood({ id: 5011, name: "와플", emoji: "🧇", category: "양식", subCategory: "와플", cuisine: "양식", price: 10000, spicy: 0, tags: ["양식", "아침", "브런치"], situations: ["아침", "데이트"], eatAlone: true, message: "바삭하고 달콤한 와플 어때?" }),
];
