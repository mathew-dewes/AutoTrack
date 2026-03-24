import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Vehicle = {
    make: string
    model: string
    year: number,
    licence_plate_number: string,
    current_odometer: number
}

export default function VehicleHeader({vehicle}: {vehicle: Vehicle}){
    return <Card className="w-full max-w-2xl">
        <CardHeader>
            <CardTitle className="font-semibold text-lg">{vehicle.make} {vehicle.model} - {vehicle.year}</CardTitle>
        <CardDescription>ODO: {vehicle.current_odometer} KM</CardDescription>
        </CardHeader>
        
    </Card>
}