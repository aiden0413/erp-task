"use client";

import { useState, useEffect, type FormEvent } from "react";
import { Modal } from "@/app/components/common/Modal";
import { lookupVehicle, mockVehicles } from "@/app/data/mockData";
import { useVehicleStore } from "@/app/store/useVehicleStore";
import type { Vehicle } from "@/app/types";

export default function VinRegisterModal() {
  const isRegisterOpen = useVehicleStore((state) => state.isRegisterOpen);
  const vehicles = useVehicleStore((state) => state.vehicles);
  const setIsRegisterOpen = useVehicleStore((state) => state.setIsRegisterOpen);
  const registerVehicles = useVehicleStore((state) => state.registerVehicles);

  const added = new Set(vehicles.map((v) => v.vin));
  const nextVin =
    mockVehicles.find((v) => !added.has(v.vin))?.vin ?? mockVehicles[0]?.vin ?? "";

  const [vinInput, setVinInput] = useState(nextVin);
  const [error, setError] = useState<string | null>(null);
  
  const [blockedVehicles, setBlockedVehicles] = useState<Vehicle[] | null>(null);

  useEffect(() => {
    if (isRegisterOpen) {
      setVinInput(nextVin);
      setError(null);
      setBlockedVehicles(null);
    }
  }, [isRegisterOpen]);

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) setVinInput(nextVin);
    setIsRegisterOpen(isOpen);
    setError(null);
    setBlockedVehicles(null);
  };

  // 단일 등록 
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

    const addedList = registerVehicles([found]);
    const addedVehicle = addedList[0];
    if (!addedVehicle) return;

    if (addedVehicle.seizureTheftStatus !== "clear") {
      setBlockedVehicles([addedVehicle]);
    } else {
      setIsRegisterOpen(false);
    }
  }

  // 일괄 등록 
  function handleRegisterAll() {
    const remainingVehicles = mockVehicles.filter((v) => !added.has(v.vin));
    
    if (remainingVehicles.length === 0) {
      setError("MOCK VIN이 모두 등록되었습니다.");
      return;
    }

    const addedVehicles = registerVehicles(remainingVehicles);
    if (addedVehicles.length === 0) return;

    const dangerousList = addedVehicles.filter((v) => v.seizureTheftStatus !== "clear");

    if (dangerousList.length > 0) {
      setBlockedVehicles(dangerousList);
    } else {
      setIsRegisterOpen(false);
    }
  }

  return (
    <Modal
      isOpen={isRegisterOpen}
      onClose={() => handleOpenChange(false)}
      title={blockedVehicles ? "주의: 압류·도난 차량 등록됨" : "VIN 등록"}
    >
      {blockedVehicles ? (
        // 경고 모달
        <div className="flex flex-col gap-4 mt-2">
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-800 border border-red-200 flex flex-col gap-2">
            <p className="font-semibold">
              압류·도난 차량 {blockedVehicles.length}대 감지
            </p>
            <p className="text-xs text-red-700">
              등록된 차량 중 압류·도난 이력이 있는 차량이 총 {blockedVehicles.length}대 포함되어 있습니다.
            </p>
            <p className="font-mono text-[11px] text-red-600 break-all bg-white/60 p-2 rounded border border-red-100">
              대상 VIN: {blockedVehicles.map((v) => v.vin).join(", ")}
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleOpenChange(false)}
            className="w-full rounded-lg bg-zinc-900 py-2.5 text-sm text-white font-medium hover:bg-zinc-700 cursor-pointer"
          >
            확인
          </button>
        </div>
      ) : (
        // 입력 폼 모달 
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
              onClick={handleRegisterAll}
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
      )}
    </Modal>
  );
}