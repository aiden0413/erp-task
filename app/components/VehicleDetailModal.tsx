"use client";

import { StatusBadge } from "@/app/components/StatusBadge";
import {
  deadlineText,
  seizureTheftView,
  shipmentView,
  taxEvidenceView,
} from "@/app/constants/vehicleStatus";
import type { Vehicle } from "@/app/types";

interface VehicleDetailModalProps {
  vehicle: Vehicle;
  onClose: () => void;
  onSubmitEvidence: (vin: string) => void;
}

export default function VehicleDetailModal({
  vehicle,
  onClose,
  onSubmitEvidence,
}: VehicleDetailModalProps) {
  const seizure = seizureTheftView[vehicle.seizureTheftStatus];
  const tax = taxEvidenceView[vehicle.taxEvidenceStatus];
  const shipment = shipmentView[vehicle.shipmentStatus];
  const deadline =
    vehicle.taxEvidenceStatus === "incomplete"
      ? deadlineText(vehicle.postEvidenceDaysRemaining)
      : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold">차량 상세</h2>
        <p className="mt-1 font-mono text-sm text-zinc-500">{vehicle.vin}</p>

        <div className="mt-4 divide-y divide-zinc-100 text-sm">
          <div className="flex items-center justify-between py-3">
            <span className="text-zinc-500">압류·도난 여부</span>
            <StatusBadge label={seizure.label} dot={seizure.dot} />
          </div>

          <div className="py-3">
            <div className="flex items-center justify-between">
              <span className="text-zinc-500">세무 증빙 여부</span>
              <StatusBadge label={tax.label} dot={tax.dot} extra={deadline} />
            </div>
            {vehicle.taxEvidenceStatus === "incomplete" ? (
              <div className="mt-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => onSubmitEvidence(vehicle.vin)}
                  className="rounded-lg bg-orange-500 px-4 py-2 text-sm text-white hover:bg-orange-600"
                >
                  사후 증빙 제출
                </button>
              </div>
            ) : null}
          </div>

          <div className="flex items-center justify-between py-3">
            <span className="text-zinc-500">선적 여부</span>
            <StatusBadge label={shipment.label} dot={shipment.dot} />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-100"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
