"use client";

import { useState, useEffect } from "react";
import VehicleDetailModal from "@/app/components/VehicleDetailModal";
import VinRegisterModal from "@/app/components/VinRegisterModal";
import VehicleTable from "@/app/components/VehicleTable";
import SimulationBar from "@/app/components/SimulationBar";
import TaxDeadlineBanner from "@/app/components/TaxDeadlineBanner";
import { useVehicleStore } from "@/app/store/useVehicleStore";

export default function Home() {
    const vehicles = useVehicleStore((state) => state.vehicles);
    const onlyTarget = useVehicleStore((state) => state.onlyTarget);
    const setOnlyTarget = useVehicleStore((state) => state.setOnlyTarget);
    const hasTarget = vehicles.some((v) => {
        return (
            (v.postEvidenceDaysRemaining !== null && v.postEvidenceDaysRemaining <= 0) ||
            (v.postEvidenceDaysRemaining !== null && v.postEvidenceDaysRemaining > 0 && v.postEvidenceDaysRemaining <= 3)
        );
    });

    useEffect(() => {
        if (!hasTarget && onlyTarget) {
            setOnlyTarget(false);
        }
    }, [hasTarget, onlyTarget, setOnlyTarget]);

    const [isRendered, setIsRendered] = useState(hasTarget);
    const [isAnimating, setIsAnimating] = useState(hasTarget);

    useEffect(() => {
        if (hasTarget) {
            setIsRendered(true);
            const timer = setTimeout(() => setIsAnimating(true), 20);
            return () => clearTimeout(timer);
        } else {
            setIsAnimating(false);
            const timer = setTimeout(() => {
                setIsRendered(false);
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [hasTarget]);

    return (
        <div className="w-full select-none">
            <div
                style={{
                    maxHeight: isAnimating ? "80px" : "0px",
                    transition: "max-height 0.4s ease-in-out",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        transform: isAnimating ? "translateY(0)" : "translateY(-100%)",
                        transition: "transform 0.4s ease-in-out",
                    }}
                >
                    {/* 상단 배너 */}
                    {isRendered && <TaxDeadlineBanner />}
                </div>
            </div>

            <main>
                <div className="mx-auto flex min-h-full w-full max-w-5xl flex-col p-6 gap-4">
                    {/* 시뮬레이션 바 */}
                    <SimulationBar />
                    {/* 테이블 */}
                    <VehicleTable />
                </div>
                
                {/* VIN 등록 모달 */}
                <VinRegisterModal />
                {/* 테이블 상세보기 모달 */}
                <VehicleDetailModal />
            </main>
        </div>
    );
}