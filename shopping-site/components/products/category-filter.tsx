"use client";

interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onChange: (category: string) => void;
}

export function CategoryFilter({
  categories,
  selected,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {["all", ...categories].map((category) => {
        const isActive = category === selected;
        return (
          <button
            key={category}
            onClick={() => onChange(category)}
            className={`rounded-full border px-4 py-1 text-sm capitalize transition ${
              isActive
                ? "border-black bg-black text-white"
                : "border-zinc-200 text-zinc-600 hover:border-black hover:text-black"
            }`}
          >
            {category === "all" ? "全部" : category}
          </button>
        );
      })}
    </div>
  );
}

