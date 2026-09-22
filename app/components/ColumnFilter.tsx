import { useState, useRef, useEffect } from "react";
import { Filter } from "lucide-react";

interface ColumnFilterProps {
  selectedValues: string[];
  options: { label: string; value: string }[];
  onChange: (newValues: string[]) => void;
  align?: "left" | "right";
}

export function ColumnFilter({ selectedValues, options, onChange, align = "left" }: ColumnFilterProps) {
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
    <div className="h-4 relative inline-block" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-1 ml-1 text-xs transition-colors ${
          selectedValues.length ? "text-blue-600 font-bold" : "text-zinc-400 hover:text-zinc-600"
        }`}
      >
        <Filter className="h-4 w-4 shrink-0" />
        <span className="inline-block w-4 text-left">
          {selectedValues.length ? `(${selectedValues.length})` : ""}
        </span>  
      </button>

      {isOpen && (
        <div className={`absolute flex flex-col gap-1 w-36 rounded border bg-white p-2 shadow-md z-10 text-xs ${align === "right" ? "right-0" : "left-0"}`}>
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
              className="w-full border-t pt-2 text-center text-zinc-400 text-[10px]"
            >
              초기화
            </button>
          )}
        </div>
      )}
    </div>
  );
}