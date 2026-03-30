"use client";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Vehicle } from "@/lib/validation/types";
import { useQuery } from "@tanstack/react-query";
import DeleteVehicleButton from "../DeleteVehicleButton";



async function fetchVehicle(id: string): Promise<Vehicle> {
  const res = await fetch("/api/vehicles/" + id);
if (!res.ok) {
  if (res.status === 401) throw new Error("Unauthorized. Please log in.");
  throw new Error(`Failed to fetch vehicles: ${res.statusText}`);
}


  
  return res.json();
}





export default function VehicleHeader({vehicle_id}: {vehicle_id: string}){
          const {data: vehicle , error, isLoading, isError} = 
  useQuery({
    queryKey:[`vehicle-${vehicle_id}`], 
    queryFn: ()=> fetchVehicle(vehicle_id),
    staleTime: 1000 * 30,
    enabled: !!vehicle_id,
},);

if (error){
    console.log(error);
    
}

if (isLoading) return <p>Loading vehicle</p>
if (isError) return <p>There was an error</p>
if (!vehicle) return <p>Vehicle doesn&apos;t exist</p>


    return <Card className="w-full max-w-sm">
        <CardHeader>
            <CardTitle className="font-semibold text-lg">{vehicle.make} {vehicle.model}</CardTitle>
        <CardDescription>{vehicle?.licence_plate_number} - ODO {vehicle.current_odometer} km</CardDescription>
        </CardHeader>

        <CardFooter className="flex gap-1 justify-end">
            <Button size={"sm"}>Update Odometer</Button>
            <Button size={"sm"}>Edit details</Button>
            <DeleteVehicleButton vehicle_id={vehicle_id}/>
        </CardFooter>
        
    </Card>
}