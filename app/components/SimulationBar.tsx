"use client";

import { useVehicleStore } from "@/app/store/useVehicleStore";

// 날짜 시뮬레이션 바
export default function SimulationBar() {
    const currentDate = useVehicleStore((state) => state.currentDate);
    const advanceDay = useVehicleStore((state) => state.advanceDay);

    return (
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
    );
}