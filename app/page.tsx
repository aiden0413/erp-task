"use client";

import { useState } from "react";
import VehicleDetailModal from "@/app/components/VehicleDetailModal";
import VinRegisterModal from "@/app/components/VinRegisterModal";
import { VehicleTable } from "@/app/components/VehicleTable";
import { mockVehicles } from "@/app/data/mockData";
import type { Vehicle, Filters } from "@/app/types";
import { initialFilters, filterVehicles } from  "@/app/utils/vehicleFilters";

export default function Home() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedVin, setSelectedVin] = useState<string | null>(null);

  const added = new Set(vehicles.map((v) => v.vin));
  const nextVin =
    mockVehicles.find((v) => !added.has(v.vin))?.vin ?? mockVehicles[0]?.vin ?? "";
  const selected = vehicles.find((v) => v.vin === selectedVin) ?? null;
  const filteredVehicles = filterVehicles(vehicles, filters);

  function register(vehicle: Vehicle) {
    setVehicles((prev) => [...prev, vehicle]);
    setIsRegisterOpen(false);
  }

  function registerAll() {
    setVehicles((prev) => {
      const existing = new Set(prev.map((v) => v.vin));
      const toAdd = mockVehicles.filter((v) => !existing.has(v.vin));
      return [...prev, ...toAdd];
    });
    setIsRegisterOpen(false);
  }

  function submitEvidence(vin: string) {
    setVehicles((prev) =>
      prev.map((v) => {
        if (v.vin !== vin) return v;
        return {
          ...v,
          taxEvidenceStatus: "complete",
          postEvidenceDaysRemaining: null,
          shipmentStatus:
            v.shipmentStatus === "fast_track" ? "approved" : v.shipmentStatus,
        };
      }),
    );
  }

  return (
    <main className="mx-auto flex min-h-full w-full max-w-5xl flex-col px-6 py-10">
      <VehicleTable
        vehicles={vehicles}
        filteredVehicles={filteredVehicles}
        filters={filters}
        onFilterChange={(key, value) =>
          setFilters((prev) => ({ ...prev, [key]: value }))
        }
        onSelectVehicle={(vin) => setSelectedVin(vin)}
        onSubmitEvidence={submitEvidence}
        onOpenRegister={() => setIsRegisterOpen(true)}
      />

      {isRegisterOpen ? (
        <VinRegisterModal
          initialVin={nextVin}
          existingVins={[...added]}
          onClose={() => setIsRegisterOpen(false)}
          onRegister={register}
          onRegisterAll={registerAll}
        />
      ) : null}

      {selected ? (
        <VehicleDetailModal
          vehicle={selected}
          onClose={() => setSelectedVin(null)}
          onSubmitEvidence={submitEvidence}
        />
      ) : null}
    </main>
  );
}