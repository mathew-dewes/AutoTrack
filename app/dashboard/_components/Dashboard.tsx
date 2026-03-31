import FleetSummary from "./FleetSummary";
import Kpis from "./Kpis";
import Ranking from "./Ranking";
import Trends from "./Trends";
import VehicleDisplay from "./VehicleDisplay";

export default function Dashboard(){
    return (
        <div className="grid grid-cols-2 gap-5">
            <FleetSummary/>
            <Kpis/>
            <Ranking/>
            <Trends/>
            <VehicleDisplay/>
        </div>
    )
}