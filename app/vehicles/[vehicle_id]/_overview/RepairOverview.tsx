"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { convertToMoney } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import NullCard from "../../../../components/web/NullCard";
import LoadingCard from "@/components/web/LoadingCard";


async function fetchLatestRepair(vehicle_id: string) {
    const res = await fetch(`/api/vehicles/${vehicle_id}/repair-latest`);
    if (!res.ok) {
        if (res.status === 401) throw new Error("Unauthorized. Please log in.");
        throw new Error(`Failed to fetch vehicles: ${res.statusText}`);
    }



    return res.json();
}
export default function Repairoverview({vehicle_id}:
    {vehicle_id: string}
){

           const { data: metrics, error, isLoading, isError } =
        useQuery({
            queryKey: [`vehicle-${vehicle_id}-repair-latest`],
            queryFn: () => fetchLatestRepair(vehicle_id),
            staleTime: 1000 * 30,
            enabled: !!vehicle_id,
        },);

    if (error) {
        console.log(error);

    }

    if (isLoading) return <LoadingCard/>
    if (isError) return <p>There was an error</p>
    if (!metrics) return <NullCard 
    title="Latest Repairs"
    description="You have no repairs"
    />

    return(
        <Card className="w-full h-60">
            <CardHeader>
                <CardTitle>Latest Repair</CardTitle>
            </CardHeader>
            <CardContent>
                         <div className="space-y-2">
                                       <div className="flex gap-1">
                                           <p >Date:</p>
                                            <p className="text-muted-foreground">{format(metrics.date, "dd/MM/yy") }</p>
                                       </div>
                                       <div className="flex gap-1">
                                           <p >Repair type:</p>
                                            <p className="text-muted-foreground">{metrics.type}</p>
                                       </div>
                                       <div className="flex gap-1">
                                           <p>Cost:</p>
                                            <p className="text-muted-foreground">{convertToMoney(metrics.cost)}</p>
                                       </div>
                                       <div className="flex gap-1">
                                           <p>Total number of repairs:</p>
                                         <p className="text-muted-foreground">{metrics.total_count}</p>
                                       </div>
                                       <div className="flex gap-1">
                                           <p>Most common repair type:</p>
                                         <p className="text-muted-foreground">{metrics.most_common_type}</p>
                                       </div>
                                
                                        
                                      
                                       
                                   </div>
            </CardContent>
            
        </Card>
    )
}