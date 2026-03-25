import { getVehicles } from "@/lib/db/queries/vehicle";
import { VehicleCarousel } from "./VehicleCarousel";
import { getRecentServices, getTotalSpend, getUpcomingServices } from "@/lib/db/queries/log";

export default async function VehicleSummaryList(){

    const [vehicles, totalSpend, recentServices, upcomingServices] = await Promise.all([getVehicles(), getTotalSpend(), getRecentServices(), getUpcomingServices() ])

    
    return (
        <div>
            <h2>Vehicle summary:</h2>
            <div>
   <VehicleCarousel upcomingServices={upcomingServices} recentServices={recentServices} vehicles={vehicles} totalSpend={totalSpend}/>
            </div>

        </div>
      

     
       

  
    )
}