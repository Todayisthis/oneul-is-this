import type { Food } from "@/data/foods";

type Props = {
  food: Food | null;
  isRolling: boolean;
  isHoldingFinal: boolean;
  messageIndex: number;
};

const messages = [
  "🤔 고민하는 중...",
  "🍚 맛있는 메뉴 찾는 중...",
  "🔥 최고의 메뉴를 고르는 중...",
  "😋 거의 다 왔어요...",
  "🎉 곧 결정됩니다!",
];

export default function RouletteCard({
  food,
  isRolling,
  isHoldingFinal,
  messageIndex,
}: Props) {
  if (!food) return null;

  return (
    <div className="w-full rounded-3xl border border-gray-800 bg-gray-900 p-8 text-center shadow-sm md:border-none md:bg-white">
      <div className={isRolling ? "scale-105 transition" : "transition"}>
        <div className="text-6xl">{food.emoji}</div>

        <h2 className="mt-4 text-3xl font-bold text-white md:text-gray-900">{food.name}</h2>

        <p className="mt-2 text-gray-400 md:text-gray-500">
          {food.brand ? food.brand : food.category}
        </p>

        {(isRolling || isHoldingFinal) && (
          <p className="mt-6 text-lg font-semibold text-orange-500">
            {messages[messageIndex % messages.length]}
          </p>
        )}
      </div>
    </div>
  );
}