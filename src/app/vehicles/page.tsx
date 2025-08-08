import VehcileList from "@/components/lists/VehicleList";
import Link from "next/link";




export default function Page(){

    return (
        <div>
            <div>
                <Link href={'/vehicles/new'}><button className="border rounded-xl p-2">Add vehicle</button></Link>
              
            </div>
            <h1 className="font-bold mt-10">My Vehicles:</h1>
  
       <VehcileList />
  
  
        </div>
    )
}