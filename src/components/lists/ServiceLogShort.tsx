"use client"

import { useServiceLogs } from '@/utlis/hooks'



export default function ServiceListShort() {

    const { data: logs, isLoading, isError, error } = useServiceLogs();
    if (isLoading) return <p>Loading data...</p>
    if (isError) return <p className='text-red-500 mt-5'>Error: {(error as Error).message}</p>
    
    return (
         <div className="py-5 rounded-xl" >
                {logs?.slice(0, 3).map((entry, key) => {
                    return (
                        <div className='my-5 border p-5 rounded' key={key}>
  <p><b>Vehicle:</b> {entry.make} {entry.model}</p>
                <h1 className='font-semibold'>Service type: {entry.type}</h1>
                <p>Date of repair: {entry.date}</p>
    


                        </div>
                    )
                })}
          

            </div>


    )
}