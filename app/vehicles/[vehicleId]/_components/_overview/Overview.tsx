import { getVehicleCostBreakdown, getVehicleMetrics } from "@/lib/db/queries/vehicle";
import CostBreakDown from "./CostBreakDown";
import KeyStats from "./KeyStats";
import UpcomingServices from "./UpcomingServices";
import RecentActivity from "./RecentActivity";
import { CostBreakdown, VehicleMetric, VehicleRecentActivity } from "@/lib/validation/types";
import { getVehicleMostRecentService, getVehicleRecentLogs, getVehicleUpcomingService } from "@/lib/db/queries/log";

export default async function Overview({vehicle_id}:
    {vehicle_id: string}
){
    const [
        metrics, 
        recentActivity, 
        mostRecentService, 
        upcomingService, 
        costBreakdown] = await Promise.all([
        getVehicleMetrics(vehicle_id), 
        getVehicleRecentLogs(vehicle_id),
        getVehicleMostRecentService(vehicle_id),
        getVehicleUpcomingService(vehicle_id),
        getVehicleCostBreakdown(vehicle_id)
    ]);


    
    return (
        <div className="grid grid-cols-2 gap-5">
                    <KeyStats metrics={metrics as VehicleMetric}/>
                    <RecentActivity activity={recentActivity as VehicleRecentActivity}/>
                    <UpcomingServices recent_service={mostRecentService as number} upcoming_service={upcomingService as number}/>
                    <CostBreakDown costBreakdown={costBreakdown as CostBreakdown}/>
                </div>
    )
}