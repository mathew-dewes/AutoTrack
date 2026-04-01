import FleetSummary from "./FleetSummary";
import Efficiencies from "./Efficiencies";
import Trends from "./Trends";
import { VehicleCarousel } from "./VehicleCarousel";
import { LogTables } from "./LogTables";


export default function Dashboard(){
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3  gap-5">
            <FleetSummary/>
            <VehicleCarousel/>
            <Efficiencies/>
            <Trends/>
             <LogTables repairs={[]} fuel={[]}/>
    
        </div>
    )
}