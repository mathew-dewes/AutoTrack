import { Suspense } from "react";
import RepairTable from "./_components/RepairTable";

export default async function page({params}:{params: Promise<{vehicleId: string}>}){
    
         const {vehicleId} = await params;
    return (
        <div>
            <Suspense fallback={"Loading data..."}>
   <RepairTable vehicleId={vehicleId}/>
            </Suspense>
         

        </div>
    )
}