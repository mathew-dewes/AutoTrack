"use client";

import { Button } from "@/components/ui/button";
import { deleteVehicle } from "@/lib/db/mutations/vehicles";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { startTransition } from "react";

export default function DeleteVehicleButton({ vehicle_id }: { vehicle_id: string }) {
    const queryClient = useQueryClient();
    const router = useRouter()

    return (
        <Button
            onClick={() => {
                startTransition(async () => {
                    const res = await deleteVehicle(vehicle_id);

                    if (!res?.error) {
                        queryClient.invalidateQueries({ queryKey: ["vehicles"] });
                        queryClient.removeQueries({ queryKey: ["vehicle", vehicle_id] });
                        router.push("/vehicles")
                    }
                })
            }}
        >Remove Vehicle</Button>
    )
}