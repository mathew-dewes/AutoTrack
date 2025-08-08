"use client"

import { fetchVehicles } from '@/utlis/db/vehicles'
import { useQuery } from '@tanstack/react-query'


export default function VehcileList() {

    const { data: vehicles, isLoading, isError, error } = useQuery({
        queryKey: ['vehicles'],
        queryFn: async () => fetchVehicles(),
        staleTime: 1000 * 60 * 5,
    })
    if (isLoading) return <p>Loading data...</p>
    if (isError) return <p className='text-red-500 mt-5'>Error: {(error as Error).message}</p>

    return (
        <div >
            {vehicles?.map((vehicle) => {
                return (<div className="my-10 border w-1/3 py-5 px-3 rounded-xl" key={vehicle.id}>
                    <p><b>Make: </b>{vehicle.make}</p>
                    <p><b>Model: </b>{vehicle.model}</p>
                    <p><b>Year: </b>{vehicle.year}</p>
                    <p><b>Odometer: </b>{vehicle.odometer} Km&apos;s</p>
                </div>)
            })}
        </div>


    )
}