import VehcileList from "@/components/lists/VehicleList";
import Link from "next/link";
import { Suspense } from "react";



export default async function Page(){




    return (
        <div>
            <div>
                <Link href={'/vehicles/new'}><button className="border rounded-xl p-2">Add vehicle</button></Link>
              
            </div>
            <h1 className="font-bold mt-10">My Vehicles:</h1>
            <Suspense fallback={<p>Loading...</p>}>
       <VehcileList />
            </Suspense>
  
        </div>
    )
}