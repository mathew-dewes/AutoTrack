"use client"



import { getDistanceLogs } from '@/utlis/db/logs'
import { useQuery } from '@tanstack/react-query'


export default function LogList() {

    const { data: logs, isLoading, isError, error } = useQuery({
        queryKey: ['logs'],
        queryFn: async () => getDistanceLogs(),
        staleTime: 1000 * 60 * 5,
    })


    if (isLoading) return <p>Loading data...</p>
    if (isError) return <p className='text-red-500 mt-5'>Error: {(error as Error).message}</p>
    if (!logs) return
    console.log(logs);






    return (
        <div >

            <div className="my-10 border py-5 px-3 rounded-xl" >
                <h1 className='font-semibold'>Distance logs:</h1>
                {logs.map((entry, key) => {
                    return (
                        <div key={key}>
                            {entry.distance_logs.map((log) => {
                                return (
                                    <p className='my-2' key={log.id}>
                                        <b>Date:</b> {new Date(log.logged_at!).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "2-digit",
                                        })}{" - "}{new Date(log.logged_at!).toLocaleTimeString("en-GB", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: false, 
                                        })}{" "}
                                        <b>{entry.make?.trim()} {entry.model} </b>
                                         - {log.km} Km
                                    </p>
                                )

                            })}

                        </div>
                    )
                })}

            </div>




        </div>


    )
}