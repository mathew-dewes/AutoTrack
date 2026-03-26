import { getVehicles } from "@/lib/db/queries/vehicle";
import { VehicleCarousel } from "./VehicleCarousel";
import { getRecentServices, getTotalSpend, getUpcomingServices } from "@/lib/db/queries/log";

export default async function VehicleSummaryList({user_id}:
    {user_id: string}
){

    const [vehicles, totalSpend, recentServices, upcomingServices] = await Promise.all([
        getVehicles(user_id), 
        getTotalSpend(user_id), 
        getRecentServices(user_id), 
        getUpcomingServices(user_id) ])

    
    return (
    
   <VehicleCarousel upcomingServices={upcomingServices} recentServices={recentServices} vehicles={vehicles} totalSpend={totalSpend}/>
      
      

     
       

  
    )
}