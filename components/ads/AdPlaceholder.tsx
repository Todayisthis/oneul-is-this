type Props = {
  label?: string;
  height?: "small" | "medium" | "large";
};

const heightClass = {
  small: "min-h-[90px]",
  medium: "min-h-[160px]",
  large: "min-h-[250px]",
};

export default function AdPlaceholder({
  label = "광고 영역",
  height = "small",
}: Props) {
  return (
    <div
      className={`my-6 flex w-full items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-4 text-sm text-gray-400 ${heightClass[height]}`}
    >
      {label}
    </div>
  );
}