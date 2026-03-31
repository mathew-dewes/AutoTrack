
import FuelOverview from "./FuelOverview";
import RecentActivity from "./RecentActivity";
import Repairoverview from "./RepairOverview";
import VehicleSummary from "./VehicleSummary";

export default function Overview({vehicle_id}:
    {vehicle_id: string}
){
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            <VehicleSummary vehicle_id={vehicle_id}/>
            <FuelOverview vehicle_id={vehicle_id}/>
            <Repairoverview vehicle_id={vehicle_id}/>
            <RecentActivity/>
        </div>
    )
}