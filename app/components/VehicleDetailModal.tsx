"use client";

import { Modal } from "@/app/components/common/Modal";
import { StatusBadge } from "@/app/components/common/StatusBadge";
import {
    deadlineText,
    seizureTheftView,
    shipmentView,
    taxEvidenceView,
} from "@/app/constants/vehicleStatus";
import { useVehicleStore } from "@/app/store/useVehicleStore";
import { mockVehicles } from "@/app/data/mockData";

export default function VehicleDetailModal() {
    const selectedVin = useVehicleStore((state) => state.selectedVin);
    const vehicles = useVehicleStore((state) => state.vehicles);
    const setSelectedVin = useVehicleStore((state) => state.setSelectedVin);
    const submitEvidence = useVehicleStore((state) => state.submitEvidence);

    // 전체 차량(mock 포함)에서 상세 정보를 찾거나 등록된 차량에서 찾기
    const vehicle = vehicles.find((v) => v.vin === selectedVin) ?? mockVehicles.find((v) => v.vin === selectedVin) ?? null;

    if (!vehicle) return null;

    const seizure = seizureTheftView[vehicle.seizureTheftStatus];
    const tax = taxEvidenceView[vehicle.taxEvidenceStatus];
    const shipment = shipmentView[vehicle.shipmentStatus];
    const deadline =
        vehicle.taxEvidenceStatus === "incomplete"
            ? deadlineText(vehicle.postEvidenceDaysRemaining)
            : null;

    return (
        <Modal
            isOpen={Boolean(selectedVin)}
            onClose={() => setSelectedVin(null)}
            title="차량 상세"
        >
            <p className="font-mono text-sm text-zinc-500">{vehicle.vin}</p>

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
                                onClick={() => submitEvidence(vehicle.vin)}
                                className="rounded-lg bg-orange-500 px-4 py-2 text-sm text-white hover:bg-orange-600 cursor-pointer"
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
                    onClick={() => setSelectedVin(null)}
                    className="rounded-lg px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-100 cursor-pointer"
                >
                    닫기
                </button>
            </div>
        </Modal>
    );
}