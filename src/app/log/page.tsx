
import DistanceLogShort from "@/components/lists/DistanceLogShort";
import Link from "next/link";

export default function Page(){
    return (
        <div className="flex gap-60 mt-10"> 
<div>
  <div>
            <h1 className="font-semibold">Service history:</h1>
            <ul className="mt-3">
                <li>09/08/25 - 20000km (Toyota Crown)</li>
                <li>02/08/25 - 19800km (Toyota Crown)</li>
                <li>11/07/25 - 18000km (Toyota Crown)</li>
            </ul>
            <Link href={'/log/service'}>View All</Link>
    
        </div>
  <div className="mt-10">
            <h1 className="font-semibold">Distance logs:</h1>
           <DistanceLogShort/>
             <Link href={'/log/distance'}>View All</Link>
  
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