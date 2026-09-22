"use client";

import { useVehicleStore } from "@/app/store/useVehicleStore";

export default function TaxDeadlineBanner() {
    const vehicles = useVehicleStore((state) => state.vehicles);
    const onlyTarget = useVehicleStore((state) => state.onlyTarget);
    const setOnlyTarget = useVehicleStore((state) => state.setOnlyTarget);

    // 기한 초과
    const overdueVehicles = vehicles.filter((v) => {
        return (
            (v.postEvidenceDaysRemaining !== null && v.postEvidenceDaysRemaining < 0)
        );
    });

    // 3일 이내 임박
    const urgentVehicles = vehicles.filter((v) => {
        return (
            v.postEvidenceDaysRemaining !== null &&
            v.postEvidenceDaysRemaining >= 0 &&
            v.postEvidenceDaysRemaining <= 3
        );
    });

    return (
        <div className="w-full h-20 bg-red-50 border-y border-red-200 px-6 py-4 text-sm text-red-900 shadow-sm select-none flex items-center">
            <div className="w-full flex flex-row items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 font-semibold">
                        <span className="flex h-2 w-2 rounded-full bg-red-600" />
                        <span>사후 세무 증빙 제출 기한 알림</span>
                    </div>
                    <p className="text-xs text-red-700">
                        사후 세무 증빙 제출 기한이 초과되었거나 마감이 임박한 차량이 존재합니다. 빠른 시일 내에 증빙 서류를 제출해 주세요.
                    </p>
                </div>

                <div className="flex items-center gap-3 self-end md:self-center shrink-0">
                    <div className="flex items-center gap-2 text-xs">
                        {overdueVehicles.length > 0 && (
                            <span className="rounded-md bg-red-600 px-2.5 py-1 font-medium text-white">
                                기한 초과 {overdueVehicles.length}대
                            </span>
                        )}
                        {urgentVehicles.length > 0 && (
                            <span className="rounded-md bg-amber-500 px-2.5 py-1 font-medium text-white">
                                기한 임박(3일 내) {urgentVehicles.length}대
                            </span>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={() => setOnlyTarget((prev) => !prev)}
                        className="rounded-lg w-32 px-3 py-1.5 text-xs font-medium text-white transition-colors cursor-pointer border border-red-200 bg-red-600 hover:bg-red-100 hover:text-black"
                    >
                        {onlyTarget ? "전체 목록 보기" : "대상 차량 모아보기"}
                    </button>
                </div>
            </div>
        </div>
    );
}