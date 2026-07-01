import type { RecommendMode } from "@/lib/recommendEngine";

const modes: {
  id: RecommendMode;
  label: string;
  description: string;
}[] = [
  { id: "smart", label: "⭐ 만족도 반영", description: "별점 + 인기도" },
  { id: "excludeRecent", label: "🔄 최근 제외", description: "최근 메뉴 제외" },
  { id: "popular", label: "🔥 인기", description: "인기 메뉴 우선" },
  { id: "random", label: "🎲 랜덤", description: "완전 랜덤" },
];

type Props = {
  selected: RecommendMode;
  onChange: (mode: RecommendMode) => void;
  disabled?: boolean;
};

export default function RecommendModeSelector({
  selected,
  onChange,
  disabled,
}: Props) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 sm:gap-3">
      {modes.map((mode) => (
        <button
          key={mode.id}
          type="button"
          disabled={disabled}
          onClick={() => onChange(mode.id)}
          className={`rounded-2xl p-4 text-left transition select-none cursor-pointer ${
            selected === mode.id
              ? "bg-orange-500 text-white"
              : "bg-gray-700 text-gray-300"
          } ${disabled ? "opacity-60" : ""}`}
        >
          <p className="text-sm font-extrabold">{mode.label}</p>
          <p
            className={`mt-1 text-xs ${
              selected === mode.id ? "text-orange-50" : "text-gray-400"
            }`}
          >
            {mode.description}
          </p>
        </button>
      ))}
    </div>
  );
}