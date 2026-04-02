import FleetSummary from "./FleetSummary";
import Efficiencies from "./Efficiencies";
import { VehicleCarousel } from "./VehicleCarousel";
import { LogTables } from "./LogTables";
import { SpendOvertimeChart } from "./_charts/SpendOvertimeChart";
import QuickActions from "./QuickAction";


export default function Dashboard(){
    return (
        <div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            <QuickActions/>
                 <FleetSummary/>
            <VehicleCarousel/>
   
   
        <Efficiencies/>
      
   
            </div>

            <div className="grid md:grid-cols-4 gap-5 mt-10">
            <LogTables/>
            <SpendOvertimeChart/>
            </div>
          
        
    
        </div>
    )
}