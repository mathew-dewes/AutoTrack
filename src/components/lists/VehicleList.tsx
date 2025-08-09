"use client"


import { useVehicles } from '@/utlis/hooks'
import Link from 'next/link'


export default function VehcileList() {

    const { data: vehicles, isLoading, isError, error } = useVehicles()
    if (isLoading) return <p>Loading data...</p>
    if (isError) return <p className='text-red-500 mt-5'>Error: {(error as Error).message}</p>
    if (vehicles?.length === 0) return <p>You have no vehciles.</p>

    return (
        <div >
            {vehicles?.map((vehicle) => {
                return (<div className="my-10 border w-1/3 py-5 px-3 rounded-xl" key={vehicle.id}>
                    <p><b>Make: </b>{vehicle.make}</p>
                    <p><b>Model: </b>{vehicle.model}</p>
                    <p><b>Year: </b>{vehicle.year}</p>
                    <p><b>Odometer: </b>{vehicle.odometer} Km&apos;s</p>
                    <Link href={'/vehicles/' + vehicle.id }>Hello</Link>
                </div>)
            })}
        </div>


    )
}