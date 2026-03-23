import { Suspense } from "react";
import VehicleList from "./_components/VehicleList";

export default function page(){
    return (
        <div>
            <Suspense fallback={'Loading vehicles...'}>
          <VehicleList/>
            </Suspense>
  
        </div>
    )
}