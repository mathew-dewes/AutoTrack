import { getVehicles } from "@/lib/db/queries/vehicle";
import { VehicleCarousel } from "./VehicleCarousel";
import { Vehicle } from "@/lib/validation/types";

export default async function VehicleSummaryList(){

    const data = await getVehicles();
    const vehicles = data.vehicles as Vehicle[];

    
    return (
        <div>
            <h2>Vehicle summary:</h2>
            <div>
   <VehicleCarousel vehicles={vehicles}/>
            </div>

        </div>
      

     
       

  
    )
}