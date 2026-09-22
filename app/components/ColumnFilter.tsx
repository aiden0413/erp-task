import { useState, useRef, useEffect } from "react";
import { Filter, ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import { Filters } from "@/app/types/index";
import { useVehicleStore } from "@/app/store/useVehicleStore";

interface ColumnFilterProps {
  columnKey: keyof Filters;
  options: { label: string; value: string }[];
  align?: "left" | "right";
}

export function ColumnFilter({ columnKey, options, align = "left" }: ColumnFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const sortOrder = useVehicleStore((state) => state.sortOrder);
  const toggleSortOrder = useVehicleStore((state) => state.toggleSortOrder);
  const selectedValues = useVehicleStore(
    (state) => (state.filters as Record<string, string[]>)[columnKey] ?? []
  );
  const setFilter = useVehicleStore((state) => state.setFilter);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const toggle = (val: string) => {
    const next = selectedValues.includes(val)
      ? selectedValues.filter((v) => v !== val)
      : [...selectedValues, val];
    
    setFilter(columnKey, next);
  };

  return (
    <div className="h-4 relative inline-block select-none" ref={ref}>
      {columnKey === "taxEvidenceStatus" && (
        <button
            type="button"
            onClick={toggleSortOrder}
            className={`inline-flex items-center text-xs transition-colors cursor-pointer ${
              sortOrder ? "text-blue-600" : "text-zinc-400 hover:text-zinc-600"
            }`}
            title="D-Day 정렬"
          >
            {sortOrder === "asc" ? (
              <ArrowUp className="h-4 w-4 shrink-0" />
            ) : sortOrder === "desc" ? (
              <ArrowDown className="h-4 w-4 shrink-0" />
            ) : (
              <ArrowUpDown className="h-4 w-4 shrink-0" />
            )}
          </button>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center ml-1 text-xs transition-colors ${
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
              onClick={() => setFilter(columnKey, [])}
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