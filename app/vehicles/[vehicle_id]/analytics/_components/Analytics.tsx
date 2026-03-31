import FuelAnalytics from "./FuelAnalytics";
import KeyMetrics from "./KeyMetrics";
import OwershipCost from "./OwnershipCost";
import RepairAnalytics from "./RepairAnalytics";

export default function Analytics(){
    return (
        <div className="grid grid-cols-2 gap-5">
            <FuelAnalytics/>
            <RepairAnalytics/>
            <KeyMetrics/>
            <OwershipCost/>
        </div>
    )
}