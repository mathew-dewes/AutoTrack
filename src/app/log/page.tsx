
import DistanceLogShort from "@/components/lists/DistanceLogShort";
import ServiceListShort from "@/components/lists/ServiceLogShort";

import Link from "next/link";

export default function Page(){

       
    return (
        <div className="flex gap-60 mt-10"> 
<div>
  <div>
            <h1 className="font-semibold">Service history:</h1>
            <ul className="mt-3">
              <ServiceListShort/>
            </ul>
            <Link href={'/log/service'}>View All</Link>
    
        </div>
  <div className="mt-10">
            <h1 className="font-semibold">Distance logs:</h1>
           <DistanceLogShort/>
   
  
        </div>
        </div>
        <div className="">
            <h1 className="font-semibold">Quick Actions:</h1>
            <div className="mt-15 flex flex-col gap-12 text-center">
                <Link href={'/log/service/add'}>Log Service</Link>
                <Link href={'/log/distance/add'}>Log Distance</Link>


            </div>
           
        </div>
        </div>
        
      
    )
}