import type { Vehicle, Filters } from "@/app/types";

export interface ColumnOption {
  label: string;
  value: string;
}

export interface FilterColumn {
  key: keyof Filters;
  title: string;
  options: ColumnOption[];
}

/* 테이블 헤더 및 드롭다운 필터 옵션 정의 */
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
  afterTaxEvidenceStatus: [],
};

export function filterVehicles(vehicles: Vehicle[], filters: Filters): Vehicle[] {
  return vehicles.filter((v) => {
    // 1. 압류·도난 필터 체크
    const matchSeizure =
      filters.seizureTheftStatus.length === 0 ||
      filters.seizureTheftStatus.includes(v.seizureTheftStatus);

    // 2. 세무 증빙 필터 체크
    const matchTax =
      filters.taxEvidenceStatus.length === 0 ||
      filters.taxEvidenceStatus.includes(v.taxEvidenceStatus);

    // 3. 선적 여부 필터 체크
    const matchShipment =
      filters.shipmentStatus.length === 0 ||
      filters.shipmentStatus.includes(v.shipmentStatus);

    // 4. 사후 세무 증빙 필터 체크
    const matchAfterTax =
      filters.afterTaxEvidenceStatus.length === 0 ||
      filters.afterTaxEvidenceStatus.includes(v.afterTaxEvidenceStatus);

    return matchSeizure && matchTax && matchShipment && matchAfterTax;
  });
}