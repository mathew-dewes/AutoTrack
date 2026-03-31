"use client";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, convertToMoney } from "@/lib/utils";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Vehicle } from "@/lib/validation/types";
import { formatDistanceToNow } from "date-fns";



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



    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {vehicles?.map((vehicle) => {
                
                return <Card className="w-full" key={vehicle.id}>
                    <CardHeader>
                        <CardTitle className="font-semibold">{vehicle.make} {vehicle.model}</CardTitle>
                        <CardDescription>{vehicle.year} - ODO: {vehicle.current_odometer}</CardDescription>
                        
                        {Number(vehicle.last_cost) == 0 ? <p>This vehicle has no fuel logs. In order to see fuel metrics, at least two logs must be entered.</p> :
                            <div>
                                <p>Last filed: {vehicle.last_fill_date ? formatDistanceToNow(vehicle.last_fill_date.toLocaleString(), {addSuffix: true}) : "N/A"}</p>
                                <p>Last cost: {convertToMoney(Number(vehicle.last_cost))}</p>
                                <p>Litres filled: {vehicle.last_litres}</p>
                            </div>
                        }



                    </CardHeader>
                    {Number(vehicle.last_cost) > 0 && 
                    
                       <CardContent>
                        <div className="flex gap-6 items-center">
                            <p>Economy: {vehicle.current_fuel_average} KM / L</p>
                            <p>Distance tracked: {vehicle.total_distance} Km</p>
                        </div>


                    </CardContent>}

                 

                    <CardFooter>
                        <Link className={cn(buttonVariants())} href={'/vehicles/' + vehicle.id}>View</Link>

                    </CardFooter>

                </Card>
            })}

        </div>
    )
}