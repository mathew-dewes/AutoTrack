"use client"

import { useDistanceLogs } from '@/utlis/hooks'



export default function DistanceLogShort() {

    const { data: logs, isLoading, isError, error } = useDistanceLogs(3);


    if (isLoading) return <p>Loading data...</p>
    if (isError) return <p className='text-red-500 mt-5'>Error: {(error as Error).message}</p>
    if (!logs) return

    

    return (
        <div >

            <div className="py-5 rounded-xl" >
                {logs.map((entry, key) => {
                    return (
                        <div key={key}>
      <p key={entry.id}>
        {new Date(entry.logged_at!).toLocaleDateString("en-GB")} - {entry.km} Km - ({entry.make?.trim()} {entry.model})
      </p>


                        </div>
                    )
                })}

            </div>




        </div>


    )
}