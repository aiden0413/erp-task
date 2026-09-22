import { create } from "zustand";
import type { Vehicle, Filters, FilterColumn } from "@/app/types";
import { mockVehicles } from "@/app/data/mockData";

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
      { label: "미비", value: "incomplete" },
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
  {
    key: "afterTaxEvidenceStatus",
    title: "사후 세무 증빙",
    options: [
      { label: "완료", value: "complete" },
      { label: "미비", value: "incomplete" },
      { label: "해당없음", value: "not_applicable" },
      { label: "기한 초과", value: "overdue" },
    ],
  },
];

export const initialFilters: Filters = {
  seizureTheftStatus: [],
  taxEvidenceStatus: [],
  shipmentStatus: [],
  afterTaxEvidenceStatus: [],
};

interface VehicleStoreState {
  vehicles: Vehicle[];
  filters: Filters;
  currentDate: string;
  isRegisterOpen: boolean;
  selectedVin: string | null;
  
  // Actions
  setFilter: (key: keyof Filters, values: string[]) => void;
  resetFilters: () => void;
  register: (vehicle: Vehicle) => void;
  registerAll: () => void;
  submitEvidence: (vin: string) => void;
  advanceDay: () => void;
  setIsRegisterOpen: (isOpen: boolean) => void;
  setSelectedVin: (vin: string | null) => void;
  getFilteredVehicles: () => Vehicle[];
}

export const useVehicleStore = create<VehicleStoreState>((set, get) => ({
  vehicles: [],
  filters: initialFilters,
  currentDate: "2026-09-22",
  isRegisterOpen: false,
  selectedVin: null,

  setFilter: (key, values) =>
    set((state) => ({
      filters: { ...state.filters, [key]: values },
    })),
  resetFilters: () => set({ filters: initialFilters }),
  
  register: (vehicle) =>
    set((state) => ({
      vehicles: [...state.vehicles, vehicle],
      isRegisterOpen: false,
    })),

  registerAll: () =>
    set((state) => {
      const existing = new Set(state.vehicles.map((v) => v.vin));
      const toAdd = mockVehicles.filter((v) => !existing.has(v.vin));
      return { vehicles: [...state.vehicles, ...toAdd], isRegisterOpen: false };
    }),

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
          taxEvidenceStatus: (isOverdue ? "overdue" : v.taxEvidenceStatus) as any,
          shipmentStatus: (isOverdue ? "hard_blocked" : v.shipmentStatus) as any,
        };
      });

      return { currentDate: nextDateStr, vehicles: updatedVehicles };
    }),

  setIsRegisterOpen: (isOpen) => set({ isRegisterOpen: isOpen }),
  setSelectedVin: (vin) => set({ selectedVin: vin }),

  getFilteredVehicles: () => {
    const { vehicles, filters } = get();
    return vehicles.filter((v) => {
      const matchSeizure =
        filters.seizureTheftStatus.length === 0 ||
        filters.seizureTheftStatus.includes(v.seizureTheftStatus);

      const matchTax =
        filters.taxEvidenceStatus.length === 0 ||
        filters.taxEvidenceStatus.includes(v.taxEvidenceStatus);

      const matchShipment =
        filters.shipmentStatus.length === 0 ||
        filters.shipmentStatus.includes(v.shipmentStatus);

      const matchAfterTax =
        filters.afterTaxEvidenceStatus.length === 0 ||
        filters.afterTaxEvidenceStatus.includes(v.afterTaxEvidenceStatus);

      return matchSeizure && matchTax && matchShipment && matchAfterTax;
    });
  },
}));