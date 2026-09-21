import { useState, useRef, useEffect } from "react";

interface ColumnFilterProps {
  selectedValues: string[];
  options: { label: string; value: string }[];
  onChange: (newValues: string[]) => void;
}

export function ColumnFilter({ selectedValues, options, onChange }: ColumnFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const toggle = (val: string) => {
    onChange(
      selectedValues.includes(val)
        ? selectedValues.filter((v) => v !== val)
        : [...selectedValues, val]
    );
  };

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`ml-1 text-xs ${selectedValues.length ? "text-blue-600 font-bold" : "text-zinc-400"}`}
      >
        🔽 {selectedValues.length ? `(${selectedValues.length})` : ""}
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-1 w-36 rounded border bg-white p-2 shadow-md z-10 text-xs space-y-1">
          {options.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 p-1 hover:bg-zinc-50 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedValues.includes(opt.value)}
                onChange={() => toggle(opt.value)}
              />
              {opt.label}
            </label>
          ))}
          {selectedValues.length > 0 && (
            <button
              type="button"
              onClick={() => onChange([])}
              className="w-full pt-1 mt-1 border-t text-center text-zinc-400 text-[10px]"
            >
              초기화
            </button>
          )}
        </div>
      )}
    </div>
  );
}