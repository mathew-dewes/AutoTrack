

import { Suspense } from "react";

import FuelForm from "./_components/FuelForm";

export default async function page(
    {params}:{
        params: Promise<{vehicle_id: string}>
    }
){
     const {vehicle_id} = await params;


     
    return(
        <div>
            <Suspense fallback={'Loading fuel form...'}>
 <FuelForm vehicle_id={vehicle_id}/>
            </Suspense>
          
        </div>
    )
}