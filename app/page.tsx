"use client";

import { useState } from "react";
import VehicleDetailModal from "@/app/components/VehicleDetailModal";
import VinRegisterModal from "@/app/components/VinRegisterModal";
import { VehicleTable } from "@/app/components/VehicleTable";
import { mockVehicles } from "@/app/data/mockData";
import type { Vehicle, Filters } from "@/app/types";
import { initialFilters, filterVehicles } from "@/app/utils/vehicleFilters";

export default function Home() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedVin, setSelectedVin] = useState<string | null>(null);

  // 시뮬레이션 기준일 상태 추가 (오늘 날짜 기준)
  const [currentDate, setCurrentDate] = useState<string>("2026-09-22");

  const added = new Set(vehicles.map((v) => v.vin));
  const nextVin =
    mockVehicles.find((v) => !added.has(v.vin))?.vin ?? mockVehicles[0]?.vin ?? "";
  const selected = vehicles.find((v) => v.vin === selectedVin) ?? null;
  const filteredVehicles = filterVehicles(vehicles, filters);

  function register(vehicle: Vehicle) {
    setVehicles((prev) => [...prev, vehicle]);
    setIsRegisterOpen(false);
  }

  function registerAll() {
    setVehicles((prev) => {
      const existing = new Set(prev.map((v) => v.vin));
      const toAdd = mockVehicles.filter((v) => !existing.has(v.vin));
      return [...prev, ...toAdd];
    });
    setIsRegisterOpen(false);
  }

  function submitEvidence(vin: string) {
    setVehicles((prev) =>
      prev.map((v) => {
        if (v.vin !== vin) return v;
        return {
          ...v,
          taxEvidenceStatus: "complete",
          postEvidenceDaysRemaining: null,
          shipmentStatus:
            v.shipmentStatus === "fast_track" ? "approved" : v.shipmentStatus,
        };
      }),
    );
  }

  // 날짜를 +1일 시뮬레이션하는 함수
  function handleAdvanceDay() {
    const dateObj = new Date(currentDate);
    dateObj.setDate(dateObj.getDate() + 1);
    const nextDateStr = dateObj.toISOString().split("T")[0];
    setCurrentDate(nextDateStr);

    // 차량들의 사후 증빙 기한을 1씩 감소
    setVehicles((prev) =>
      prev.map((v) => {
        if (v.postEvidenceDaysRemaining === null) return v;

        const nextDays = v.postEvidenceDaysRemaining - 1;
        const isOverdue = nextDays < 0;

        return {
          ...v,
          postEvidenceDaysRemaining: nextDays,
          taxEvidenceStatus: isOverdue ? "overdue" : v.taxEvidenceStatus,
          shipmentStatus: isOverdue ? "hard_blocked" : v.shipmentStatus,
        };
      }),
    );
  }

  return (
    <main className="mx-auto flex min-h-full w-full max-w-5xl flex-col px-6 py-10">
      {/* 테이블 상단에 현재 날짜 및 [+1일 경과] 버튼 배치 */}
      <div className="mb-4 flex items-center justify-between rounded-xl bg-zinc-100 px-4 py-3 border border-zinc-200">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">ERP 시스템 시뮬레이션 기준일</span>
          <span className="text-sm font-bold text-zinc-800">{currentDate}</span>
        </div>
        <button
          type="button"
          onClick={handleAdvanceDay}
          className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm border border-zinc-300 hover:bg-zinc-50 transition-colors cursor-pointer"
        >
          <span>날짜 +1일 경과 시뮬레이션</span>
        </button>
      </div>

      {/* 테이블 컴포넌트 */}
      <VehicleTable
        vehicles={vehicles}
        filteredVehicles={filteredVehicles}
        filters={filters}
        onFilterChange={(key, value) =>
          setFilters((prev) => ({ ...prev, [key]: value }))
        }
        onSelectVehicle={(vin) => setSelectedVin(vin)}
        onSubmitEvidence={submitEvidence}
        onOpenRegister={() => setIsRegisterOpen(true)}
      />

      {/* VIN 등록 모달 컴포넌트 */}
      {isRegisterOpen ? (
        <VinRegisterModal
          initialVin={nextVin}
          existingVins={[...added]}
          onClose={() => setIsRegisterOpen(false)}
          onRegister={register}
          onRegisterAll={registerAll}
        />
      ) : null}

      {/* 테이블 row 상세 모달 컴포넌트 */}
      {selected ? (
        <VehicleDetailModal
          vehicle={selected}
          onClose={() => setSelectedVin(null)}
          onSubmitEvidence={submitEvidence}
        />
      ) : null}
    </main>
  );
}