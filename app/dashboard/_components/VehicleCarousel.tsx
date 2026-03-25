"use client"

import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { Vehicle } from "@/lib/validation/types"
import { Button } from "@/components/ui/button"




export function VehicleCarousel({ vehicles }:
    { vehicles: Vehicle[] }
) {

    return (
        <Carousel className="w-full mt-5"
            plugins={[
                Autoplay({
                    delay: 4000,
                }),
            ]}>
            <CarouselContent>
                {vehicles.map((vehicle, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
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
                                        <span>Total spend: $210</span>
                                        <span>Last service date: 12/12/12</span>
                                        <span>Next service due: 12/12/31</span>
                                    </div>

                                </CardContent>

                                <CardFooter>
                                    <Button className="w-1/2">View</Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>

        </Carousel>
    )
}
