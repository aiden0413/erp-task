// 정상 | 압류·도난
export type SeizureTheftStatus = "clear" | "blocked";

// 완비 | 사후 증빙 제출 | 해당없음 | 기한 초과
export type TaxEvidenceStatus = "complete" | "incomplete" | "not_applicable" | "overdue";

// 승인 | 조건부 선적 | 차단
export type ShipmentStatus = "approved" | "fast_track" | "hard_blocked";

export interface Vehicle {
    vin: string;
    seizureTheftStatus: SeizureTheftStatus;
    taxEvidenceStatus: TaxEvidenceStatus;
    shipmentStatus: ShipmentStatus;
    postEvidenceDaysRemaining: number | null;
}

export type Filters = {
    seizureTheftStatus: string[];
    taxEvidenceStatus: string[];
    shipmentStatus: string[];
};

export interface ColumnOption {
    label: string;
    value: string;
}

export interface FilterColumn {
    key: keyof Filters;
    title: string;
    options: ColumnOption[];
}