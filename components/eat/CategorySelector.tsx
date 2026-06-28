import { foodCategories } from "@/data/foods";

type Props = {
  selected: string;
  onChange: (category: string) => void;
  disabled?: boolean;
};

export default function CategorySelector({
  selected,
  onChange,
  disabled,
}: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
      {foodCategories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          disabled={disabled}
          className={`rounded-full px-4 py-2 text-sm font-bold transition sm:px-5 ${
            selected === category
              ? "bg-orange-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          } ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}