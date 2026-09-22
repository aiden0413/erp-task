import { create } from "zustand";
import type { Vehicle, Filters, FilterColumn, TaxEvidenceStatus, } from "@/app/types";

export const filterColumns: FilterColumn[] = [
    {
        key: "seizureTheftStatus",
        title: "압류·도난 여부",
        options: [
            { label: "정상", value: "clear" },
            { label: "압류/도난", value: "blocked" },
        ],
    },
    {
        key: "taxEvidenceStatus",
        title: "세무 증빙 여부",
        options: [
            { label: "완비", value: "complete" },
            { label: "사후 증빙 제출", value: "incomplete" },
            { label: "해당없음", value: "not_applicable" },
            { label: "기한 초과", value: "overdue" },
        ],
    },
    {
        key: "shipmentStatus",
        title: "선적 여부",
        options: [
            { label: "승인", value: "approved" },
            { label: "조건부 선적", value: "fast_track" },
            { label: "차단", value: "hard_blocked" },
        ],
    },
];

export const initialFilters: Filters = {
    seizureTheftStatus: [],
    taxEvidenceStatus: [],
    shipmentStatus: [],
};

interface VehicleStoreState {
    vehicles: Vehicle[]; // 차량 목록
    filters: Filters; // 필터 옵션
    currentDate: string; // 현재 날짜
    isRegisterOpen: boolean; // VIN 등록 모달 열림 여부
    selectedVin: string | null; // 선택된 차량 VIN
    sortOrder: "asc" | "desc" | null; // D-Day 정렬 순서
    onlyTarget: boolean; // 타겟 차량(세무증빙 기한초과, D-day 3일 이하)만 보기 여부

    // Actions
    setFilter: (key: keyof Filters, values: string[]) => void; // 필터 설정
    resetFilters: () => void; // 필터 초기화
    registerVehicles: (vehicles: Vehicle[]) => Vehicle[]; // 차량 등록
    submitEvidence: (vin: string) => void; // 세무 증빙 제출버튼
    advanceDay: () => void; // 날짜 1일 증가
    setIsRegisterOpen: (isOpen: boolean) => void; // VIN 등록 모달 열림 여부
    setSelectedVin: (vin: string | null) => void; // 선택된 차량의 VIN (상세 보기 모달에 사용)
    getFilteredVehicles: () => Vehicle[]; // 필터링된 차량 목록
    toggleSortOrder: () => void; // 정렬 순서 토글 (기본, 오름차순, 내림차순 순으로 변경)
    setOnlyTarget: (val: boolean | ((prev: boolean) => boolean)) => void; // 타겟 차량(세무증빙 기한초과, D-day 3일 이하)만 보기 설정
}

export const useVehicleStore = create<VehicleStoreState>((set, get) => ({
    vehicles: [],
    filters: initialFilters,
    currentDate: "2026-09-22",
    isRegisterOpen: false,
    selectedVin: null,
    sortOrder: null,
    onlyTarget: false,

    setFilter: (key, values) =>
        set((state) => ({
            filters: { ...state.filters, [key]: values },
        })),
    resetFilters: () => set({ filters: initialFilters }),

    registerVehicles: (newVehicles: Vehicle[]) => {
        let addedVehicles: Vehicle[] = [];
        set((state) => {
            const existing = new Set(state.vehicles.map((v) => v.vin));
            addedVehicles = newVehicles.filter((v) => !existing.has(v.vin));
            return {
                vehicles: [...state.vehicles, ...addedVehicles],
            };
        });
        return addedVehicles;
    },

    submitEvidence: (vin) =>
        set((state) => ({
            vehicles: state.vehicles.map((v) => {
                if (v.vin !== vin) return v;
                return {
                    ...v,
                    taxEvidenceStatus: "complete",
                    postEvidenceDaysRemaining: null,
                    shipmentStatus: v.shipmentStatus === "fast_track" ? "approved" : v.shipmentStatus,
                };
            }),
        })),

    advanceDay: () =>
        set((state) => {
            const dateObj = new Date(state.currentDate);
            dateObj.setDate(dateObj.getDate() + 1);
            const nextDateStr = dateObj.toISOString().split("T")[0];

            const updatedVehicles = state.vehicles.map((v) => {
                if (v.postEvidenceDaysRemaining === null) return v;
                const nextDays = v.postEvidenceDaysRemaining - 1;
                const isOverdue = nextDays < 0;
                return {
                    ...v,
                    postEvidenceDaysRemaining: nextDays,
                    taxEvidenceStatus: (isOverdue ? "overdue" : v.taxEvidenceStatus) as TaxEvidenceStatus,
                };
            });

            return { currentDate: nextDateStr, vehicles: updatedVehicles };
        }),

    setIsRegisterOpen: (isOpen) => set({ isRegisterOpen: isOpen }),
    setSelectedVin: (vin) => set({ selectedVin: vin }),

    getFilteredVehicles: () => {
        const { vehicles, filters, sortOrder, onlyTarget } = get();

        const filtered = vehicles.filter((v) => {
            const matchSeizure =
                filters.seizureTheftStatus.length === 0 ||
                filters.seizureTheftStatus.includes(v.seizureTheftStatus);

            const matchTax =
                filters.taxEvidenceStatus.length === 0 ||
                filters.taxEvidenceStatus.includes(v.taxEvidenceStatus);

            const matchShipment =
                filters.shipmentStatus.length === 0 ||
                filters.shipmentStatus.includes(v.shipmentStatus);

            const baseMatch = matchSeizure && matchTax && matchShipment;
            if (!baseMatch) return false;

            if (onlyTarget) {
                 const isOverdue = (v.postEvidenceDaysRemaining !== null && v.postEvidenceDaysRemaining <= 0);
                const isUrgent =
                    v.postEvidenceDaysRemaining !== null &&
                    v.postEvidenceDaysRemaining > 0 &&
                    v.postEvidenceDaysRemaining <= 3;
                return isOverdue || isUrgent;
            }

            return true;
        });

        if (sortOrder !== null) {
            filtered.sort((a, b) => {
                const daysA = a.postEvidenceDaysRemaining ?? 999;
                const daysB = b.postEvidenceDaysRemaining ?? 999;
                return sortOrder === "asc" ? daysA - daysB : daysB - daysA;
            });
        }

        return filtered;
    },

    toggleSortOrder: () => {
        set((state) => {
            if (state.sortOrder === null) return { sortOrder: "asc" };
            if (state.sortOrder === "asc") return { sortOrder: "desc" };
            return { sortOrder: null };
        });
    },

    setOnlyTarget: (val) => set((state) => ({ 
        onlyTarget: typeof val === "function" ? val(state.onlyTarget) : val 
    })),
}));