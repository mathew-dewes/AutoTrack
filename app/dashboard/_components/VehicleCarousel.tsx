"use client"

import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { cn, convertToMoney } from "@/lib/utils";
import { Vehicle } from "@/lib/validation/types"
import { useQuery } from "@tanstack/react-query"
import LoadingCard from "@/components/web/LoadingCard"

async function fetchVehicles(): Promise<Vehicle[]> {
    const res = await fetch("/api/vehicles");

    if (!res.ok) {
        if (res.status === 401) throw new Error("Unauthorized. Please log in.");
        throw new Error(`Failed to fetch vehicles: ${res.statusText}`);
    }


    return res.json();
}




export function VehicleCarousel() {

    const { data: vehicles, error, isLoading, isError } =
        useQuery({
            queryKey: ["vehicles"],
            queryFn: fetchVehicles,
            staleTime: 1000 * 30
        },);


    if (isLoading) return <LoadingCard />
    if (isError) return <p>Error: {(error as Error).message}</p>;


    return (
    
            <Carousel  className="w-full"
            plugins={[
                Autoplay({
                    delay: 6000,
                }),
            ]}>
            <CarouselContent>
                {vehicles?.map((vehicle, key) => {
                    return <CarouselItem key={vehicle.id}>
                   
                        <Card className="w-full h-60">
                            <CardHeader>
                                <CardTitle className="font-semibold">{vehicle.make} {vehicle.model}</CardTitle>
                                <CardDescription>{vehicle.year} - ODO: {vehicle.current_odometer}</CardDescription>


                                <div>
                                    <p>Weekly fuel cost: {convertToMoney(Number(vehicle.avg_weekly_cost))}</p>
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
                                <div className="flex items-center justify-between w-full">
                            <Link className={cn(buttonVariants())} href={'/vehicles/' + vehicle.id}>View</Link>
                            <p className="mt-1">Vehicle {key + 1} of {vehicles.length}</p>
                                </div>
                       
                            </CardFooter>

                        </Card>





                    </CarouselItem>



                })}






            </CarouselContent>

        </Carousel>

     
       
    )
}
