"use client";

import VehicleDetailModal from "@/app/components/VehicleDetailModal";
import VinRegisterModal from "@/app/components/VinRegisterModal";
import { VehicleTable } from "@/app/components/VehicleTable";
import { mockVehicles } from "@/app/data/mockData";
import { useVehicleStore } from "@/app/store/useVehicleStore";

export default function Home() {
  const {
    vehicles,
    currentDate,
    isRegisterOpen,
    selectedVin,
    register,
    registerAll,
    submitEvidence,
    advanceDay,
    setIsRegisterOpen,
    setSelectedVin,
  } = useVehicleStore();

  const added = new Set(vehicles.map((v) => v.vin));
  const nextVin =
    mockVehicles.find((v) => !added.has(v.vin))?.vin ?? mockVehicles[0]?.vin ?? "";
  const selected = vehicles.find((v) => v.vin === selectedVin) ?? null;

  return (
    <main className="mx-auto flex min-h-full w-full max-w-5xl flex-col px-6 py-10 gap-4">
      {/* 테이블 상단에 현재 날짜 및 [+1일 경과] 버튼 배치 */}
      <div className="h-16 flex items-center justify-between rounded-xl bg-zinc-100 p-4 border border-zinc-200">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            ERP 시스템 시뮬레이션 기준일
          </span>
          <span className="text-sm font-bold text-zinc-800">{currentDate}</span>
        </div>
        <button
          type="button"
          onClick={advanceDay}
          className="h-8 inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm border border-zinc-300 hover:bg-zinc-50 transition-colors cursor-pointer"
        >
          <span>날짜 +1일 경과 시뮬레이션</span>
        </button>
      </div>

      {/* 테이블 컴포넌트 */}
      <VehicleTable />

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