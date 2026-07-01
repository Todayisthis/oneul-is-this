import { foodCategories } from "@/data/foods";
import { categoryEmoji } from "@/lib/foodEmoji";

type Props = {
  selected: string;
  onChange: (category: string) => void;
  disabled?: boolean;
};

export default function CategorySelector({ selected, onChange, disabled }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
      {foodCategories.map((category) => (
        <button
          key={category}
          type="button"
          disabled={disabled}
          onClick={() => onChange(category)}
          className={`rounded-full px-4 py-2 text-sm font-bold transition select-none cursor-pointer ${
            selected === category
              ? "bg-orange-500 text-white"
              : "bg-gray-700 text-gray-300 md:bg-gray-100 md:text-gray-600"
          } ${disabled ? "opacity-60" : ""}`}
        >
          {category === "전체" ? "🍽️ 전체" : `${categoryEmoji[category]} ${category}`}
        </button>
      ))}
    </div>
  );
}