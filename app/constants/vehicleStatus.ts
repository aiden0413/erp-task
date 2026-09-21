import type {
  SeizureTheftStatus,
  ShipmentStatus,
  TaxEvidenceStatus,
} from "@/app/types";

export const color = {
  green: "bg-emerald-500",
  orange: "bg-orange-400",
  red: "bg-red-500",
} as const;

type StatusView = {
  label: string;
  dot: string;
};

export const seizureTheftView: Record<SeizureTheftStatus, StatusView> = {
  clear: { label: "정상", dot: color.green },
  blocked: { label: "압류/도난", dot: color.red },
};

export const taxEvidenceView: Record<TaxEvidenceStatus, StatusView> = {
  complete: { label: "완비", dot: color.green },
  incomplete: { label: "미비", dot: color.orange },
  not_applicable: { label: "해당없음", dot: color.red },
  overdue: { label: "기한 초과", dot: color.red },
};

export const shipmentView: Record<ShipmentStatus, StatusView> = {
  approved: { label: "승인", dot: color.green },
  fast_track: { label: "조건부 선적", dot: color.orange },
  hard_blocked: { label: "차단", dot: color.red },
};

/** 사후 증빙 컬럼용 (taxEvidenceStatus와 동일 키, 표시 문구만 다름) */
export const postEvidenceView: Record<TaxEvidenceStatus, StatusView> = {
  complete: { label: "완료", dot: color.green },
  incomplete: { label: "제출필요", dot: color.orange },
  not_applicable: { label: "해당없음", dot: color.red },
};

export function deadlineText(days: number | null): string | null {
  if (days === null) return null;
  if (days <= 0) return days === 0 ? "D-Day" : `D+${Math.abs(days)} 초과`;
  return `D-${days}`;
}
