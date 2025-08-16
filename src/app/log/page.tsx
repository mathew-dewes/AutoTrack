import ServiceLogsTable from "@/components/tables/ServiceLogs";
import Link from "next/link";

export default function Page(){
    return (
        <div>
     
                    <h1 className="font-bold text-xl">Service Logs:</h1>
                        <div className="my-5">
     <ServiceLogsTable />
     <div className="flex gap-5">
  <Link  href={'/log/services'}><button className="cursor-pointer bg-accent-500 text-white p-3 rounded-xl mt-5 text-sm">View All</button></Link>
     <Link  href={'/log/services/add'}><button className="cursor-pointer bg-accent-500 text-white p-3 rounded-xl mt-5 text-sm">Log Service</button></Link>
     </div>
   
      
            </div>
   
            
           

     
        </div>
    )
}