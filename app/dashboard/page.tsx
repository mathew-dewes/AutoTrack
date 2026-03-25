import { Suspense } from "react";
import AttentionRequired from "./_components/AttentionRequired";
import VehicleSummaryList from "./_components/VehicleSummaryList";

export default function page(){
    return (
        <div className="grid sm:grid-cols-2 gap-10 mt-5">
            <Suspense fallback={"Loading data..."}>
   <VehicleSummaryList/>
            </Suspense>
   
      <AttentionRequired/>
      <h2>Spend overtime</h2>
      <h2>Fuel snapshot</h2>

        </div>
    )
}