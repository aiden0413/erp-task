"use client";

import { useState, type FormEvent } from "react";
import { Modal } from "@/app/components/common/Modal";
import { lookupVehicle, mockVehicles } from "@/app/data/mockData";
import { useVehicleStore } from "@/app/store/useVehicleStore";

export default function VinRegisterModal() {
  const isRegisterOpen = useVehicleStore((state) => state.isRegisterOpen);
  const vehicles = useVehicleStore((state) => state.vehicles);
  const setIsRegisterOpen = useVehicleStore((state) => state.setIsRegisterOpen);
  const register = useVehicleStore((state) => state.register);
  const registerAll = useVehicleStore((state) => state.registerAll);

  const added = new Set(vehicles.map((v) => v.vin));
  const nextVin =
    mockVehicles.find((v) => !added.has(v.vin))?.vin ?? mockVehicles[0]?.vin ?? "";

  const [vinInput, setVinInput] = useState(nextVin);
  const [error, setError] = useState<string | null>(null);

  // 모달이 열릴 때 input 초기화
  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) setVinInput(nextVin);
    setIsRegisterOpen(isOpen);
    setError(null);
  };

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found = lookupVehicle(vinInput);
    if (!found) {
      setError("등록된 Mock VIN이 없습니다.");
      return;
    }
    if (added.has(found.vin)) {
      setError("이미 목록에 추가된 VIN입니다.");
      return;
    }

    register(found);
  }

  return (
    <Modal
      isOpen={isRegisterOpen}
      onClose={() => handleOpenChange(false)}
      title="VIN 등록"
    >
      <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-4">
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
            onClick={() => handleOpenChange(false)}
            className="rounded-lg px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-100 cursor-pointer"
          >
            취소
          </button>
          <button
            type="button"
            onClick={registerAll}
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm text-zinc-800 hover:bg-zinc-100 cursor-pointer"
          >
            일괄 등록
          </button>
          <button
            type="submit"
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-700 cursor-pointer"
          >
            등록
          </button>
        </div>
      </form>
    </Modal>
  );
}