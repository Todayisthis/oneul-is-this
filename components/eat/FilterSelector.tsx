import { brands } from "@/data/brands";
import type { RecommendFilters } from "@/lib/recommendEngine";

type Props = {
  filters: RecommendFilters;
  onChange: (filters: RecommendFilters) => void;
  disabled?: boolean;
};

export default function FilterSelector({
  filters,
  onChange,
  disabled,
}: Props) {
  return (
    <div className="space-y-3 text-left">
      <p className="text-sm font-bold text-white md:text-gray-700">브랜드</p>

      <select
        disabled={disabled}
        value={filters.brand ?? "전체"}
        onChange={(e) =>
          onChange({
            brand: e.target.value as RecommendFilters["brand"],
          })
        }
        className="w-full rounded-xl bg-gray-800 px-4 py-3 text-sm font-bold text-white md:bg-gray-100 md:text-gray-700"
      >
        <option value="전체">전체</option>

        {brands.map((brand) => (
          <option key={brand.name} value={brand.name}>
            {brand.name}
          </option>
        ))}
      </select>

      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange({ brand: "전체" })}
        className="w-full rounded-xl bg-gray-800 px-3 py-3 text-sm font-bold text-gray-300 md:bg-gray-200 md:text-gray-600"
      >
        브랜드 초기화
      </button>
    </div>
  );
}