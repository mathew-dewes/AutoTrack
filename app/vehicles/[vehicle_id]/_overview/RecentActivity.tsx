"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingCard from "@/components/web/LoadingCard";
import NullCard from "@/components/web/NullCard";
import { RecentActivityType } from "@/lib/validation/types";
import { useQuery } from "@tanstack/react-query";
import { RecentTableSwitcher } from "./RecentTableSwitcher";


async function fetchRecentActivity(vehicle_id: string): Promise<RecentActivityType[]> {
    const res = await fetch(`/api/vehicles/${vehicle_id}/recent-activity`);
    if (!res.ok) {
        if (res.status === 401) throw new Error("Unauthorized. Please log in.");
        throw new Error(`Failed to fetch vehicles: ${res.statusText}`);
    }



    return res.json();
}


export default function RecentActivity({ vehicle_id }:
    { vehicle_id: string }
) {

    const { data: metrics, error, isLoading, isError } =
        useQuery({
            queryKey: [`vehicle-${vehicle_id}-recent-activity`],
            queryFn: () => fetchRecentActivity(vehicle_id),
            staleTime: 1000 * 30,
            enabled: !!vehicle_id,
        },);

    if (error) {
        console.log(error);

    }

    if (isLoading) return <LoadingCard />
    if (isError) return <p>There was an error</p>
    if (!metrics || metrics.length == 0) return <NullCard
        title="Recent Activity"
        description="You have no logs for this vehicle. Please add either fuel or repair logs to see metrics"
    />;

    console.log(metrics);
    

    const fuel_logs = metrics.filter((metric) => {
        return metric.type == "fuel"
    });
    const repair_logs = metrics.filter((metric) => {
        return metric.type == "repair"
    });


    return (
        <Card className="w-full lg:col-span-2  h-60">
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
    
                <RecentTableSwitcher fuelLogs={fuel_logs} repairLogs={repair_logs}/>
       
    
            </CardContent>

        </Card>
    )
}