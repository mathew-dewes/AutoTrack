"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingCard from "@/components/web/LoadingCard";
import NullCard from "@/components/web/NullCard";
import { convertToMoney } from "@/lib/utils";
import { FleetSummaryType } from "@/lib/validation/types";
import { useQuery } from "@tanstack/react-query";


async function fetchFleetSummary(): Promise<FleetSummaryType> {
    const res = await fetch(`/api/dashboard/fleet-summary`);
    if (!res.ok) {
        if (res.status === 401) throw new Error("Unauthorized. Please log in.");
        throw new Error(`Failed to fetch vehicles: ${res.statusText}`);
    }



    return res.json();
}

export default function FleetSummary(){

            const { data: metrics, error, isLoading, isError } =
        useQuery({
            queryKey: [`fleet-summary`],
            queryFn: () => fetchFleetSummary(),
            staleTime: 1000 * 30,
        },);

    if (error) {
        console.log(error);

    }

    if (isLoading) return <LoadingCard/>
    if (isError) return <p>There was an error</p>
    if (!metrics) return <NullCard title="Fleet Summary" description="You have no fuel logs. Please add them to see metrics"/>

    
    return (
         <Card className="w-full h-60">
            <CardHeader>
                <CardTitle>Fleet Summary</CardTitle>
            </CardHeader>
            <CardContent>
                     <div className="space-y-2">
                                         <div className="flex gap-1">
                                             <p >Total vehicles:</p>
                                              <p className="text-muted-foreground">{metrics.total_vehicles}</p>
                                         </div>
                                         <div className="flex gap-1">
                                             <p >Total distance traveled:</p>
                                              <p className="text-muted-foreground">{metrics.total_distance} KM</p>
                                         </div>
                                         <div className="flex gap-1">
                                             <p>Total fuel cost:</p>
                                              <p className="text-muted-foreground">{convertToMoney(Number(metrics.total_fuel_spend))}</p>
                                         </div>
                                         <div className="flex gap-1">
                                             <p>Total repair cost:</p>
                                           <p className="text-muted-foreground">{convertToMoney(Number(metrics.total_repair_spend))}</p>
                                         </div>
                       
                                     </div>
            </CardContent>
            
        </Card>
    )
}