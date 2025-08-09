"use client"

import { useDistanceLogs } from '@/utlis/hooks'
import Link from 'next/link';



export default function DistanceLogShort() {

    const { data: logs, isLoading, isError, error } = useDistanceLogs();
    const hasData = (logs?.length !== 0)

    if (isLoading) return <p>Loading data...</p>
    if (isError) return <p className='text-red-500 mt-5'>Error: {(error as Error).message}</p>
    if (!hasData) return <p>Logs empty - Click Log distance to start tracking</p>



    

    return (
        <div >

            <div className="py-5 rounded-xl" >
                {logs?.slice(0, 3).map((entry, key) => {
                    return (
                        <div key={key}>
      <p>
        {new Date(entry.created_at!).toLocaleDateString("en-GB")} - {entry.km} Km - ({entry.make?.trim()} {entry.model})
      </p>


                        </div>
                    )
                })}
                 <Link href={'/log/distance'}>View All</Link> 

            </div>




        </div>


    )
}