"use client";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, convertToMoney } from "@/lib/utils";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Vehicle } from "@/lib/validation/types";




async function fetchVehicles(): Promise<Vehicle[]> {
    const res = await fetch("/api/vehicles");

    if (!res.ok) {
        if (res.status === 401) throw new Error("Unauthorized. Please log in.");
        throw new Error(`Failed to fetch vehicles: ${res.statusText}`);
    }


    return res.json();
}


export default function VehicleList() {
    const { data: vehicles, error, isLoading, isError } =
        useQuery({
            queryKey: ["vehicles"],
            queryFn: fetchVehicles,
            staleTime: 1000 * 30
        },);


    if (isLoading) return <p>Data is loading..</p>;
    if (isError) return <p>Error: {(error as Error).message}</p>;

    console.log(vehicles);
    



    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3  gap-5">
            {vehicles?.map((vehicle) => {
                
                return <Card className="w-full" key={vehicle.id}>
                    <CardHeader>
                        <CardTitle className="font-semibold">{vehicle.make} {vehicle.model}</CardTitle>
                        <CardDescription>{vehicle.year} - ODO: {vehicle.current_odometer}</CardDescription>
                        
                       
                            <div>
                                <p>Weekly fuel cost: {convertToMoney(Number(vehicle.avg_weekly_cost)) }</p>
                                <p>Weekly distance: {Number(vehicle.avg_weekly_distance).toFixed()} KM</p>
                            </div>
                        



                    </CardHeader>
               
                    
                       <CardContent>
                        <div className="flex gap-4 items-center">
                            <p>Economy: {vehicle.avg_km_per_litre ?? 0} KM / L</p>
                            <p>Distance tracked: {vehicle.total_distance ?? 0} Km</p>

                        </div>


                    </CardContent>

                 

                    <CardFooter>
                        <Link className={cn(buttonVariants())} href={'/vehicles/' + vehicle.id}>View</Link>

                    </CardFooter>

                </Card>
            })}

        </div>
    )
}