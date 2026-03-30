import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type Vehicle = {
    make: string
    model: string
    year: number,
    licence_plate_number: string,
    current_odometer: number
}

export default function VehicleHeader({vehicle}: {vehicle: Vehicle}){
    return <Card className="w-full max-w-sm">
        <CardHeader>
            <CardTitle className="font-semibold text-lg">{vehicle.make} {vehicle.model}</CardTitle>
        <CardDescription>{vehicle.licence_plate_number} - ODO {vehicle.current_odometer.toLocaleString()} km</CardDescription>
        </CardHeader>

        <CardFooter className="flex gap-1 justify-end">
            <Button size={"sm"}>Update Odometer</Button>
            <Button size={"sm"}>Edit details</Button>
        </CardFooter>
        
    </Card>
}