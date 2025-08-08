"use client"

import { fetchVehicle } from "@/utlis/db/vehicles"
import { useQuery } from "@tanstack/react-query"
import { useAuth } from "./providers/AuthProvider";
import Link from "next/link";

export default function Vehicle({id}:{id:string}){
    const {user_id} = useAuth()

    const { data: vehicle, isLoading, isError, error } = useQuery({
    queryKey: ['vehicle', id],
     queryFn: async ({ queryKey }) => {
    const [, vehicleId] = queryKey; 
    return fetchVehicle(vehicleId, user_id!);
        },
        staleTime: 1000 * 60 * 5,
    })

    if (isLoading) return <p>Loading data...</p>
    if (isError) return <p className='text-red-500 mt-5'>Error: {(error as Error).message}</p>
        if (!vehicle) return 
    
    return (
       <div className="my-10 border w-1/3 py-10 px-3 rounded-xl mx-auto flex gap-3 flex-col" key={vehicle.id}>
                    <h1><b>Vehicle:</b> {vehicle.make} {vehicle.model}</h1>
                    <p><b>Year: </b>{vehicle.year}</p>
                    <p><b>Current odometer: </b>{vehicle.odometer} Km&apos;s</p>
                
                </div>
    )
}