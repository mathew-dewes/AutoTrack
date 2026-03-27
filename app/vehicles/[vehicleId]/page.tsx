
import { Suspense } from "react";
import Overview from "./_components/_overview/Overview";

export default async function page(
    {params}:{
        params: Promise<{vehicleId: string}>
    }
){

         const {vehicleId} = await params;
    return (
      <div>
        <Suspense fallback={"Loading overview..."}>
     <Overview vehicle_id={vehicleId}/>
        </Suspense>
   
      </div>
    )
}