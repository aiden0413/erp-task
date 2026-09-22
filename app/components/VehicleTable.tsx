"use client";

import { ColumnFilter } from "@/app/components/ColumnFilter";
import { StatusBadge } from "@/app/components/StatusBadge";
import {
  deadlineText,
  seizureTheftView,
  shipmentView,
  taxEvidenceView,
} from "@/app/constants/vehicleStatus";
import { useVehicleStore, filterColumns } from "@/app/store/useVehicleStore";

export function VehicleTable() {
  const { vehicles, filters, setFilter, setSelectedVin, submitEvidence, setIsRegisterOpen, getFilteredVehicles } =
    useVehicleStore();

  const filteredVehicles = getFilteredVehicles();

  return (
    <div className="w-full">
      <div className="rounded-xl border border-zinc-200 bg-white shadow-sm">
        <table className="w-full table-fixed border-collapse text-left text-sm">
          <colgroup>
            <col className="w-[24%]" />
            <col className="w-[19%]" />
            <col className="w-[19%]" />
            <col className="w-[19%]" />
            <col className="w-[19%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50/75 text-xs font-semibold text-zinc-600">
              <th className="p-4 align-middle">VIN</th>
              {filterColumns.map((column, idx) => (
                <th key={`${column.key}-${idx}`} className="p-4 align-middle font-medium">
                  <div className="inline-flex items-center justify-between gap-1">
                    {column.title}
                    <ColumnFilter
                      selectedValues={filters[column.key]}
                      options={column.options}
                      onChange={(newValues) => setFilter(column.key, newValues)}
                      align={idx === filterColumns.length - 1 ? "right" : "left"}
                    />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 text-zinc-700">
            {vehicles.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-zinc-400">
                  테이블 하단 + 버튼으로 차량(VIN)을 등록하세요
                </td>
              </tr>
            ) : filteredVehicles.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-zinc-400">
                  조건에 맞는 차량이 없습니다
                </td>
              </tr>
            ) : (
              filteredVehicles.map((vehicle) => {
                const seizure = seizureTheftView[vehicle.seizureTheftStatus];
                const tax = taxEvidenceView[vehicle.taxEvidenceStatus];
                const shipment = shipmentView[vehicle.shipmentStatus];
                const deadline =
                  vehicle.taxEvidenceStatus === "incomplete"
                    ? deadlineText(vehicle.postEvidenceDaysRemaining)
                    : null;

                const isRisk =
                  vehicle.seizureTheftStatus === "blocked" ||
                  vehicle.taxEvidenceStatus === "overdue";

                return (
                  <tr
                    key={vehicle.vin}
                    onClick={() => setSelectedVin(vehicle.vin)}
                    className={`cursor-pointer transition-colors ${
                      isRisk ? "bg-red-100/90 hover:bg-red-200/90" : "hover:bg-zinc-50/80"
                    }`}
                  >
                    <td className="px-4 py-3.5 font-mono text-xs font-medium text-zinc-900">
                      <span className={isRisk ? "font-bold text-red-900" : ""}>
                        {vehicle.vin}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusBadge label={seizure.label} dot={seizure.dot} />
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusBadge label={tax.label} dot={tax.dot} extra={deadline} />
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusBadge label={shipment.label} dot={shipment.dot} />
                    </td>
                    <td className="px-4 py-3.5">
                      {vehicle.taxEvidenceStatus === "incomplete" ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            submitEvidence(vehicle.vin);
                          }}
                          className="inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium bg-orange-500 text-white border border-orange-200 hover:bg-orange-100 hover:text-black transition-colors"
                        >
                          사후 증빙 제출 &gt;
                        </button>
                      ) : (
                        <StatusBadge label={tax.label} dot={tax.dot} />
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center">
        <button
          type="button"
          onClick={() => setIsRegisterOpen(true)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-xl text-zinc-700 shadow-sm transition-all hover:bg-zinc-50 hover:border-zinc-300 hover:scale-105 active:scale-95"
          aria-label="VIN 추가"
        >
          +
        </button>
      </div>
    </div>
  );
}