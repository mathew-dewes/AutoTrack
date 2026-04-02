import { EconomyOvertime } from "./_charts/EconomyOvertime";
import { MonthlyCostBreakdown } from "./_charts/MonthlyCostBreakdown";
import { PricePerLitre } from "./_charts/PricePerLitre";
import { RepairCostOvertime } from "./_charts/RepairCostOvertime";
import { RepairPie } from "./_charts/RepairPie";
import { TotalCostOvertime } from "./_charts/TotalCostOvertime";



export default function Analytics({vehicle_id}:
    {vehicle_id: string}
) {
    return (
        <div className="grid grid-cols-2 gap-5 space-y-10 mt-10">
            <div className="col-span-full">
                <h1>Fuel Analytics</h1>
                <div className="grid grid-cols-2 gap-5 mt-2">
                    <EconomyOvertime vehicle_id={vehicle_id}/>
                    <PricePerLitre />
                </div>

            </div>
            <div className="col-span-full">
                <h1>Repair Analytics</h1>
                <div className="grid grid-cols-2 gap-5 mt-2">
                    <RepairPie/>
                    <RepairCostOvertime />
                </div>

            </div>
            <div className="col-span-full">
                <h1>Cost of ownership</h1>
                <div className="grid grid-cols-2 gap-5 mt-2">
                    <TotalCostOvertime />
                    <MonthlyCostBreakdown />
                </div>

            </div>



        </div>
    )
}