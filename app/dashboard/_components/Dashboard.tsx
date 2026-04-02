import FleetSummary from "./FleetSummary";
import Efficiencies from "./Efficiencies";
import { VehicleCarousel } from "./VehicleCarousel";
import { LogTables } from "./LogTables";
import { SpendOvertimeChart } from "./_charts/SpendOvertimeChart";


export default function Dashboard(){
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <FleetSummary/>
            <VehicleCarousel/>
            <Efficiencies/>
             <LogTables/>
            <SpendOvertimeChart/>
    
        </div>
    )
}