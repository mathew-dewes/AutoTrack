"use client";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
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




export default function VehicleList(){
      const {data: vehicles , error, isLoading, isError} = 
  useQuery({
    queryKey:["posts"], 
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
                </CardHeader>

                <CardContent>
                    <p>Total distance traveled: 20000</p>
                    <p>Average weekly fuel cost: $120</p>

                </CardContent>

                <CardFooter>
                    <Link className={cn(buttonVariants())} href={'/vehicles/' + vehicle.id}>View</Link>

                </CardFooter>

            </Card>
        })}

    </div>
    )
}