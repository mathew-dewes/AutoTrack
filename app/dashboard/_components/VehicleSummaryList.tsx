import { getVehicles } from "@/lib/db/queries/vehicle";
import { VehicleCarousel } from "./VehicleCarousel";
import { getRecentServices, getTotalSpend, getUpcomingServices } from "@/lib/db/queries/log";

export default async function VehicleSummaryList(){

    const [vehicles, totalSpend, recentServices, upcomingServices] = await Promise.all([getVehicles(), getTotalSpend(), getRecentServices(), getUpcomingServices() ])

    
    return (
    
   <VehicleCarousel upcomingServices={upcomingServices} recentServices={recentServices} vehicles={vehicles} totalSpend={totalSpend}/>
      
      

     
       

  
    )
}