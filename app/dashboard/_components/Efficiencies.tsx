"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingCard from "@/components/web/LoadingCard";
import { convertToMoney } from "@/lib/utils";
import { EfficienciesType } from "@/lib/validation/types";
import { useQuery } from "@tanstack/react-query";

async function fetchEfficiencies(): Promise<EfficienciesType> {
    const res = await fetch(`/api/dashboard/efficiencies`);
    if (!res.ok) {
        if (res.status === 401) throw new Error("Unauthorized. Please log in.");
        throw new Error(`Failed to fetch vehicles: ${res.statusText}`);
    }



    return res.json();
}


export default function Efficiencies() {

    const { data: metrics, error, isLoading, isError } =
        useQuery({
            queryKey: [`efficiencies`],
            queryFn: () => fetchEfficiencies(),
            staleTime: 1000 * 30,
        },);

    if (error) {
        console.log(error);

    }

    if (isLoading) return <LoadingCard />
    if (isError) return <p>There was an error</p>
    if (!metrics || !metrics.least_efficient || !metrics.most_efficient) return

    const most_efficient = metrics.most_efficient;
    const least_efficient = metrics.least_efficient;


    return (
        <Card className="w-full col-span-full">
            <CardHeader>
                <CardTitle>Fuel Economy</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row md:gap-20 gap-5 md:items-center">
                                   <div className="space-y-2">
                        <div className="flex gap-5">
                            <div className="flex gap-1">
                                <p>Best:</p>
                                <p className="text-muted-foreground">{most_efficient.make} {most_efficient.model} {most_efficient.licence_plate_number}</p>
                            </div>
                           
                        </div>
                        <div className="flex gap-5">
                            <div className="flex gap-1">
                                <p>Distance traveled:</p>
                                <p className="text-muted-foreground">{most_efficient.distance}</p>
                            </div>
                            <div className="flex gap-1">
                                <p>Litres used:</p>
                                <p className="text-muted-foreground">{most_efficient.total_litres}</p>
                            </div>
                   
                        </div>
                        <div className="flex gap-5">
                            
                             <div className="flex gap-1">
                                <p>Average KM/L:</p>
                                <p className="text-muted-foreground">{most_efficient.km_per_litre.toFixed(1)}</p>
                            </div>
                            <div className="flex gap-1">
                                <p>Total fuel cost:</p>
                                <p className="text-muted-foreground">{convertToMoney(most_efficient.fuel_cost)}</p>
                            </div>
                        </div>

                    </div>
            
                    <div className="space-y-2">
                        <div className="flex gap-5">
                            <div className="flex gap-1">
                                <p>Worst:</p>
                                <p className="text-muted-foreground">{least_efficient.make} {least_efficient.model} {least_efficient.licence_plate_number}</p>
                            </div>
                           
                        </div>
                        <div className="flex gap-5">
                            <div className="flex gap-1">
                                <p>Distance traveled:</p>
                                <p className="text-muted-foreground">{least_efficient.distance}</p>
                            </div>
                            <div className="flex gap-1">
                                <p>Litres used:</p>
                                <p className="text-muted-foreground">{least_efficient.total_litres}</p>
                            </div>
                   
                        </div>
                        <div className="flex gap-5">
                            
                             <div className="flex gap-1">
                                <p>Average KM/L:</p>
                                <p className="text-muted-foreground">{least_efficient.km_per_litre.toFixed(1)}</p>
                            </div>
                            <div className="flex gap-1">
                                <p>Total fuel cost:</p>
                                <p className="text-muted-foreground">{convertToMoney(least_efficient.fuel_cost)}</p>
                            </div>
                        </div>

                    </div>




                </div>
            </CardContent>

        </Card>
    )
}