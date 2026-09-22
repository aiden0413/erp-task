"use client";

import VehicleDetailModal from "@/app/components/VehicleDetailModal";
import VinRegisterModal from "@/app/components/VinRegisterModal";
import { VehicleTable } from "@/app/components/VehicleTable";
import { SimulationBar } from "@/app/components/SimulationBar";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-full w-full max-w-5xl flex-col px-6 py-10 gap-4">
      {/* 시뮬레이션 컨트롤바 컴포넌트 */}
      <SimulationBar />

      {/* 테이블 컴포넌트 */}
      <VehicleTable />

      {/* 등록 모달, 상세보기 모달 */}
      <VinRegisterModal />
      <VehicleDetailModal />
    </main>
  );
}