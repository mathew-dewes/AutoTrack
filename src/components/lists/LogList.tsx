"use client"



import { getVehicleLog } from '@/utlis/db/logs'
import { useQuery } from '@tanstack/react-query'


export default function LogList({id}:{id: string}) {

    const { data: logs, isLoading, isError, error } = useQuery({
    queryKey: ['logs', id],
     queryFn: async ({ queryKey }) => {
    const [, vehicleId] = queryKey; 
    return getVehicleLog(vehicleId);
        },
        staleTime: 1000 * 60 * 5,
    })

    
    if (isLoading) return <p>Loading data...</p>
    if (isError) return <p className='text-red-500 mt-5'>Error: {(error as Error).message}</p>
        if (!logs) return 

        

    return (
        <div >
            {logs?.map((log, key) => {
                return (
                    <div key={key}>
                        <h1></h1>
<div className="my-10 border py-5 px-3 rounded-xl" >
                    <h1 className='font-semibold'>Distance logs:</h1>
                    {log.distance_logs.map((item, key)=>{
                        return (
                            <div className='mt-3' key={key}>
                                <p>Date: {item.logged_at} -  {item.km} Km&apos;s</p>
                            </div>
                        )
                    })}
                    
                </div>
<div className="my-10 border py-5 px-3 rounded-xl" >
                    <h1 className='font-semibold'>Service logs:</h1>
                    {log.service_logs.map((item, key)=>{
                        return (
                            <div className='mt-3' key={key}>
                                <p>Service type: {item.type}</p>
                                <p>Date completed: {item.date}</p>
                                <p>Notes: {item.notes}</p>
                            </div>
                        )
                    })}
                    
                </div>
                    </div>
                )
            })}
        </div>


    )
}