import type { Vehicle } from "@/app/types";

export const mockVehicles: Vehicle[] = [
    {
        vin: "KMHXX00XXXX000001",
        seizureTheftStatus: "clear",
        taxEvidenceStatus: "incomplete",
        shipmentStatus: "fast_track",
        postEvidenceDaysRemaining: 7,
        afterTaxEvidenceStatus: "incomplete",
    },
    {
        vin: "WVWZZZ1JZXW000333",
        seizureTheftStatus: "blocked",
        taxEvidenceStatus: "not_applicable",
        shipmentStatus: "hard_blocked",
        postEvidenceDaysRemaining: null,
        afterTaxEvidenceStatus: "not_applicable",
    },
    {
        vin: "KNADN512AB1234567",
        seizureTheftStatus: "clear",
        taxEvidenceStatus: "complete",
        shipmentStatus: "approved",
        postEvidenceDaysRemaining: null,
        afterTaxEvidenceStatus: "complete",
    },
    {
        vin: "KNHXX00XXXX000002",
        seizureTheftStatus: "clear",
        taxEvidenceStatus: "incomplete",
        shipmentStatus: "fast_track",
        postEvidenceDaysRemaining: 7,
        afterTaxEvidenceStatus: "incomplete",
    },
    {
        vin: "KM8J3CA46JU000555",
        seizureTheftStatus: "clear",
        taxEvidenceStatus: "complete",
        shipmentStatus: "approved",
        postEvidenceDaysRemaining: null,
        afterTaxEvidenceStatus: "complete",
    },
    {
        vin: "JM1BL1SF5A1000444",
        seizureTheftStatus: "blocked",
        taxEvidenceStatus: "not_applicable",
        shipmentStatus: "hard_blocked",
        postEvidenceDaysRemaining: null,
        afterTaxEvidenceStatus: "not_applicable",
    },
    {
        vin: "KNAFU411BA5000666",
        seizureTheftStatus: "clear",
        taxEvidenceStatus: "incomplete",
        shipmentStatus: "fast_track",
        postEvidenceDaysRemaining: 7,
        afterTaxEvidenceStatus: "incomplete",
    },
    {
        vin: "5YJ3E1EA7KF000777",
        seizureTheftStatus: "clear",
        taxEvidenceStatus: "incomplete",
        shipmentStatus: "fast_track",
        postEvidenceDaysRemaining: 7,
        afterTaxEvidenceStatus: "incomplete",
    },
    {
        vin: "KMHCT41DBAU000888",
        seizureTheftStatus: "blocked",
        taxEvidenceStatus: "not_applicable",
        shipmentStatus: "hard_blocked",
        postEvidenceDaysRemaining: null,
        afterTaxEvidenceStatus: "not_applicable",
    },
    {
        vin: "KNAGN412BFA000999",
        seizureTheftStatus: "clear",
        taxEvidenceStatus: "complete",
        shipmentStatus: "approved",
        postEvidenceDaysRemaining: null,
        afterTaxEvidenceStatus: "complete",
    },
];

export function lookupVehicle(vin: string): Vehicle | null {
    const key = vin.trim().toUpperCase();
    return mockVehicles.find((v) => v.vin.toUpperCase() === key) ?? null;
}
