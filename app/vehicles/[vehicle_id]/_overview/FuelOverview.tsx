"use client";


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingCard from "@/components/web/LoadingCard";
import { convertToMoney } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";


async function fetchLatestFill(vehicle_id: string) {
    const res = await fetch(`/api/vehicles/${vehicle_id}/fuel-latest`);
    if (!res.ok) {
        if (res.status === 401) throw new Error("Unauthorized. Please log in.");
        throw new Error(`Failed to fetch vehicles: ${res.statusText}`);
    }



    return res.json();
}

export default function FuelOverview({vehicle_id}:
    {vehicle_id: string}
){

        const { data: metrics, error, isLoading, isError } =
        useQuery({
            queryKey: [`vehicle-${vehicle_id}-fuel-latest`],
            queryFn: () => fetchLatestFill(vehicle_id),
            staleTime: 1000 * 30,
            enabled: !!vehicle_id,
        },);

    if (error) {
        console.log(error);

    }

    if (isLoading) return <LoadingCard/>
    if (isError) return <p>There was an error</p>
    if (!metrics) return <p>Vehicle doesn&apos;t exist</p>
    
    return(
        <Card className="w-full h-60">
            <CardHeader>
                <CardTitle>Latest refill</CardTitle>
            </CardHeader>
        <CardContent>
                      <div className="space-y-2">
                          <div className="flex gap-1">
                              <p >Date:</p>
                               <p className="text-muted-foreground">{format(metrics.date, "dd/MM/yy - hh:mm aa") }</p>
                          </div>
                          <div className="flex gap-1">
                              <p >Vendor:</p>
                               <p className="text-muted-foreground">{metrics.vendor}</p>
                          </div>
                          <div className="flex gap-1">
                              <p>Cost:</p>
                               <p className="text-muted-foreground">{convertToMoney(metrics.cost)}</p>
                          </div>
                          <div className="flex gap-1">
                              <p>Litre filled:</p>
                            <p className="text-muted-foreground">{Number(metrics.litres).toFixed()}</p>
                          </div>
                          <div className="flex gap-1">
                              <p>Price per litre:</p>
                            <p className="text-muted-foreground">{convertToMoney(metrics.price_per_litre)}</p>
                          </div>
                   
                           
                         
                          
                      </div>
      
                  </CardContent>
            
        </Card>
    )
}