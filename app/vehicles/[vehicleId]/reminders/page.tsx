import { Suspense } from "react";
import { ReminderTable } from "./_components/ReminderTable";

export default async function page({
  params,
}: {
  params: Promise<{ vehicleId: string }>
}){

    const { vehicleId } = await params
    return(

 
        <div>
          <Suspense fallback={"Loading data..."}>
   <ReminderTable vehicleId={vehicleId}/>
   
          </Suspense>
              </div>
    )
}