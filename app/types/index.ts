// 압류·도난
export type SeizureTheftStatus = "clear" | "blocked";

// 세무 증빙
export type TaxEvidenceStatus = "complete" | "incomplete" | "not_applicable" | "overdue";

// 선적 여부
export type ShipmentStatus = "approved" | "fast_track" | "hard_blocked";

// 사후 세무 증빙
export type AfterTaxEvidenceStatus = "complete" | "incomplete" | "not_applicable" | "overdue";

export interface Vehicle {
  vin: string;
  seizureTheftStatus: SeizureTheftStatus;
  taxEvidenceStatus: TaxEvidenceStatus;
  shipmentStatus: ShipmentStatus;
  postEvidenceDaysRemaining: number | null;
  afterTaxEvidenceStatus: AfterTaxEvidenceStatus;
}

export type Filters = {
  seizureTheftStatus: string[];
  taxEvidenceStatus: string[];
  shipmentStatus: string[];
  afterTaxEvidenceStatus: string[];
};
