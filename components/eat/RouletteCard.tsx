import { rouletteMessages } from "@/data/messages";
import type { Food } from "@/data/foods";

type Props = {
  food: Food | null;
  isRolling: boolean;
  isHoldingFinal: boolean;
  messageIndex: number;
};

export default function RouletteCard({
  food,
  isRolling,
  isHoldingFinal,
  messageIndex,
}: Props) {
  return (
    <div className="rounded-[2rem] bg-orange-50 px-5 py-10 text-center">
      <div
        className={`text-7xl transition ${
          isRolling
            ? "animate-bounce"
            : isHoldingFinal
            ? "scale-125"
            : "scale-110"
        }`}
      >
        {food?.emoji ?? "🎲"}
      </div>

      <p className="mt-6 text-base font-bold text-orange-500">
        {isRolling
          ? rouletteMessages[messageIndex]
          : isHoldingFinal
          ? "잠깐만요... 거의 정해졌습니다."
          : "✨ 오늘은 이거다!"}
      </p>
    </div>
  );
}