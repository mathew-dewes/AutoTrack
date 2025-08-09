"use client"

import { useDistanceLogs } from '@/utlis/hooks'



export default function LogList() {

    const { data: logs, isLoading, isError, error } = useDistanceLogs();
    if (isLoading) return <p>Loading data...</p>
    if (isError) return <p className='text-red-500 mt-5'>Error: {(error as Error).message}</p>
    if (!logs) return
    return (
        <div >

            <div className="my-10 border py-5 px-3 rounded-xl" >
                <h1 className='font-semibold'>Distance logs:</h1>
                {logs.map((entry, key) => {
                    return (
                        <div key={key}>
                           <p>
        {new Date(entry.created_at!).toLocaleDateString("en-GB")} - {entry.km} Km - ({entry.make?.trim()} {entry.model})
      </p>


                        </div>
                    )
                })}

            </div>




        </div>


    )
}