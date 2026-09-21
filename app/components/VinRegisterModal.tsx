"use client";

import { useState, type FormEvent } from "react";
import { lookupVehicle } from "@/app/data/mockData";
import type { Vehicle } from "@/app/types";

interface VinRegisterModalProps {
  initialVin: string;
  existingVins: string[];
  onClose: () => void;
  onRegister: (vehicle: Vehicle) => void;
  onRegisterAll: () => void;
}

export default function VinRegisterModal({
  initialVin,
  existingVins,
  onClose,
  onRegister,
  onRegisterAll,
}: VinRegisterModalProps) {
  const [vinInput, setVinInput] = useState(initialVin);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found = lookupVehicle(vinInput);
    if (!found) {
      setError("등록된 Mock VIN이 없습니다.");
      return;
    }
    if (existingVins.includes(found.vin)) {
      setError("이미 목록에 추가된 VIN입니다.");
      return;
    }

    onRegister(found);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="text-lg font-semibold">VIN 등록</h2>

        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-zinc-700">차대번호 (VIN)</span>
            <input
              autoFocus
              value={vinInput}
              onChange={(e) => {
                setVinInput(e.target.value);
                setError(null);
              }}
              placeholder="VIN을 입력하세요"
              className="rounded-lg border border-zinc-300 px-3 py-2 font-mono text-sm outline-none focus:border-zinc-900"
            />
          </label>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <div className="flex flex-wrap justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-100"
            >
              취소
            </button>
            <button
              type="button"
              onClick={onRegisterAll}
              className="rounded-lg border border-zinc-300 px-4 py-2 text-sm text-zinc-800 hover:bg-zinc-100"
            >
              일괄 등록
            </button>
            <button
              type="submit"
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-700"
            >
              등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
