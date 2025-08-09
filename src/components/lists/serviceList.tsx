"use client"

import { useServiceLogs } from '@/utlis/hooks'



export default function ServiceList() {

    const { data: logs, isLoading, isError, error } = useServiceLogs();
    if (isLoading) return <p>Loading data...</p>
    if (isError) return <p className='text-red-500 mt-5'>Error: {(error as Error).message}</p>

    console.log(logs);
                              {/* <p>
        {new Date(entry.date!).toLocaleDateString("en-GB")} - {entry.km} Km - ({entry.make?.trim()} {entry.model})
      </p> */}
    
    return (
        <div >
            {logs?.map((entry, key)=>{
                return (
                    <div key={key} className="my-10 border py-5 px-3 rounded-xl" >
                <p><b>Vehicle:</b> {entry.make} {entry.model}</p>
                <h1 className='font-semibold'>Service type: {entry.type}</h1>
                <p>Date of repair: {entry.date}</p>
                <p className='mt-5'><b>Notes:</b> {entry.notes}</p>

               

            </div>
                )
            })}

            




        </div>


    )
}