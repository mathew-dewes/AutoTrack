
import { Suspense } from "react";
import FuelTable from "./_components/FuelTable";




export default async function page({params}:{params: Promise<{vehicleId: string}>}){
      const {vehicleId} = await params;


    return (
        <div>
            <Suspense fallback={"Loading data..."}>
   <FuelTable vehicleId={vehicleId}/>
            </Suspense>
           
        </div>
    )
}