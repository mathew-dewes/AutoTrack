"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingCard from "@/components/web/LoadingCard";
import { convertToMoney } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";




async function fetchVehicleSummary(vehicle_id: string) {
    const res = await fetch(`/api/vehicles/${vehicle_id}/summary`);
    if (!res.ok) {
        if (res.status === 401) throw new Error("Unauthorized. Please log in.");
        throw new Error(`Failed to fetch vehicles: ${res.statusText}`);
    }



    return res.json();
}

export default function VehicleSummary({ vehicle_id }:
    { vehicle_id: string }
) {

    const { data: metrics, error, isLoading, isError } =
        useQuery({
            queryKey: [`vehicle-${vehicle_id}-summary`],
            queryFn: () => fetchVehicleSummary(vehicle_id),
            staleTime: 1000 * 30,
            enabled: !!vehicle_id,
        },);

    if (error) {
        console.log(error);

    }

    if (isLoading) return <LoadingCard/>
    if (isError) return <p>There was an error</p>
    if (!metrics) return <p>Vehicle doesn&apos;t exist</p>

    return (
        <Card className="w-full h-50">
            <CardHeader>
                <CardTitle>Vehicle Summary</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <div className="flex gap-1">
                        <p >Odometer:</p>
                         <p className="text-muted-foreground">{Number(metrics.current_odometer).toLocaleString()} KM</p>
                    </div>
                    <div className="flex gap-1">
                        <p>Total distance traveled:</p>
                         <p className="text-muted-foreground">{Number(metrics.distance_traveled).toLocaleString()} KM</p>
                    </div>
                    <div className="flex gap-1">
                        <p>Total fuel spend:</p>
                      <p className="text-muted-foreground">{convertToMoney(Number(metrics.fuel_cost))}</p>
                    </div>
                    <div className="flex gap-1">
                        <p>Total repair spend:</p>
                      <p className="text-muted-foreground">{convertToMoney(Number(metrics.repair_costs))}</p>
                    </div>
                    <div className="flex gap-1">
                        <p>Fuel economy:</p>
                 <p className="text-muted-foreground">{Number(metrics.km_per_litre).toFixed(2)} KM/L</p>
                    </div>
                     
                   
                    
                </div>

            </CardContent>

        </Card>
    )
}