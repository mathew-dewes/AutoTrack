"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingCard from "@/components/web/LoadingCard";
import { Vehicle } from "@/lib/validation/types";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { LogAction } from "./LogAction";

async function fetchVehicles(): Promise<Vehicle[]> {
    const res = await fetch("/api/vehicles");

    if (!res.ok) {
        if (res.status === 401) throw new Error("Unauthorized. Please log in.");
        throw new Error(`Failed to fetch vehicles: ${res.statusText}`);
    }


    return res.json();
}

export default function QuickActions(){

       const { data: vehicles, error, isLoading, isError } =
        useQuery({
            queryKey: ["vehicles"],
            queryFn: fetchVehicles,
            staleTime: 1000 * 30
        },);


    if (isLoading) return <LoadingCard />
    if (isError) return <p>Error: {(error as Error).message}</p>;
    if (!vehicles) return;

    console.log(vehicles);
    
    return (
        <Card className="w-full col-span-full">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">
                    {vehicles?.length == 0 ? "Welcome to AutoTrack" : "Quick Actions"}
                    </CardTitle>
                <CardDescription hidden={vehicles?.length > 0}>Please add vehicles to start seeing fuel and repair metrics. Click the add vehicle below to begin. If you would like to see a demo, click the load demo button.</CardDescription>
            </CardHeader>
            <CardFooter>
                <div className="flex items-center gap-2">
                    {vehicles?.length > 0 && <LogAction vehicles={vehicles} type="fuel"/>}
                    {vehicles?.length > 0 && <LogAction vehicles={vehicles} type="repair"/>}
                    <Link className={buttonVariants()} href={'/vehicles/new'}>+ Add Vehicle</Link>
              
                <Button hidden={vehicles?.length > 0}>Load Demo</Button>
                </div>
             
            </CardFooter>
        </Card>
    )
}