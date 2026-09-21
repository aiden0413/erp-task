/** 압류·도난 */
export type SeizureTheftStatus = "clear" | "blocked";

/** 세무 증빙 */
export type TaxEvidenceStatus = "complete" | "incomplete" | "not_applicable";

/** 선적 */
export type ShipmentStatus = "approved" | "fast_track" | "hard_blocked";

export interface Vehicle {
  vin: string;
  seizureTheftStatus: SeizureTheftStatus;
  taxEvidenceStatus: TaxEvidenceStatus;
  shipmentStatus: ShipmentStatus;
  /** 미비(Fast-Track)일 때만 설정 */
  postEvidenceDaysRemaining: number | null;
}

export type Filters = {
  seizureTheftStatus: string[];
  taxEvidenceStatus: string[];
  shipmentStatus: string[];
};
