import { foodCategories } from "@/data/foods";

type Props = {
  selected: string;
  onChange: (category: string) => void;
  disabled?: boolean;
};

export default function CategorySelector({ selected, onChange, disabled }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
      {foodCategories.map((category) => (
        <div
          key={category}
          role="button"
          tabIndex={0}
          onPointerUp={() => {
            if (!disabled) onChange(category);
          }}
          className={`rounded-full px-4 py-2 text-sm font-bold transition select-none cursor-pointer ${
            selected === category
              ? "bg-orange-500 text-white"
              : "bg-gray-100 text-gray-600"
          } ${disabled ? "opacity-60" : ""}`}
          style={{ touchAction: "manipulation" }}
        >
          {category}
        </div>
      ))}
    </div>
  );
}