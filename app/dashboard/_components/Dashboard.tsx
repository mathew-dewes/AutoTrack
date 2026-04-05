import FleetSummary from "./FleetSummary";
import Efficiencies from "./Efficiencies";
import { VehicleCarousel } from "./VehicleCarousel";
import { LogTables } from "./LogTables";
import { SpendOvertimeChart } from "./_charts/SpendOvertimeChart";
import QuickActions from "./QuickActions";


export default function Dashboard() {
    return (

        <div className="grid lg:grid-cols-2 gap-5">
            <QuickActions />
            <FleetSummary />
            <VehicleCarousel/>
            <Efficiencies />
            <div className="col-span-full md:col-span-1 w-full overflow-x-auto">
                <LogTables />
            </div>

            <SpendOvertimeChart />

        </div>







    )
}