"use client"

import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { Vehicle } from "@/lib/validation/types"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"




export function VehicleCarousel({ vehicles, totalSpend, recentServices, upcomingServices }:
    { 
        vehicles: Vehicle[], 
        totalSpend: {cost: number, vehicle_id: string}[],
        recentServices:{odometer: number, vehicle_id: string}[],
        upcomingServices:{odometer_trigger: number, vehicle_id: string}[]
     }
) {

    return (
        <Carousel className="w-full"
            plugins={[
                Autoplay({
                    delay: 6000,
                }),
            ]}>
            <CarouselContent>
                {vehicles.map((vehicle, index) => {
                    const spend = totalSpend.filter((item)=>{
                        return item.vehicle_id == vehicle.id
                    });
                    
                    const recent_services = recentServices.filter((item)=>{
                        return item.vehicle_id == vehicle.id
                    });

                    const upcoming_services = upcomingServices.filter((item)=>{
                        return item.vehicle_id == vehicle.id
                    })

                
                
                    return <CarouselItem key={index}>
                  
                            <Card className="w-full max-w-lg">
                                <CardHeader>
                                    <CardTitle>{vehicle.make} {vehicle.model}</CardTitle>
                                    <CardDescription>
                                        <div className="flex gap-3">
                                            <p>Licence: {vehicle.licence_plate_number}</p>
                                            <p>Year: {vehicle.year} </p>
                                        </div>
                                        <p>ODO: {vehicle.current_odometer} KM</p>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col space-y-1">
                                        {spend[0]?.cost && <span>Total spend: ${spend[0]?.cost}</span>}
                                        {recent_services[0]?.odometer && <span>Last service at: {recent_services[0]?.odometer} Km</span>}
                                        {upcoming_services[0]?.odometer_trigger && <span >Next service at: {upcoming_services[0]?.odometer_trigger} Km</span>}
                                       {!spend[0]?.cost && <p>This vehicle has no logs saved. Ensure to add fuel and maintance logs to utilize the auto track system</p>}
                                        
                                    </div>

                                </CardContent>

                                <CardFooter>
                                    <Link
                                    className={cn(buttonVariants(
                                        {className: "w-1/2"}))}
                                    href={`/vehicles/${vehicle.id}`}>View</Link>
                        
                                </CardFooter>
                            </Card>
                     
                    </CarouselItem>
})}
            </CarouselContent>

        </Carousel>
    )
}
