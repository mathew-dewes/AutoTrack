import { EconomyOvertime } from "./_charts/EconomyOvertime";
import { MonthlyCostBreakdown } from "./_charts/MonthlyCostBreakdown";
import { CostPerFill } from "./_charts/CostPerFill";
import { RepairCostOvertime } from "./_charts/RepairCostOvertime";
import { TotalCostOvertime } from "./_charts/TotalCostOvertime";
import { RepairPie } from "./_charts/RepairPie";



export default function Analytics({vehicle_id}:
    {vehicle_id: string}
) {
    return (
        <div className="grid grid-cols-2 gap-5 space-y-10 mt-10">
            <div className="col-span-full">
                <h1>Fuel Analytics</h1>
                <div className="grid lg:grid-cols-2 gap-10 mt-2">
                    <EconomyOvertime vehicle_id={vehicle_id}/>
                    <CostPerFill vehicle_id={vehicle_id} />
                </div>

            </div>
            <div className="col-span-full">
                <h1>Repair Analytics</h1>
                <div className="grid md:grid-cols-3 gap-10 mt-2">
                    <RepairPie vehicle_id={vehicle_id}/>
                    <RepairCostOvertime />
                </div>

            </div>
            <div className="col-span-full">
                <h1>Cost of ownership</h1>
                <div className="grid md:grid-cols-2 gap-10 mt-2">
                    <TotalCostOvertime />
                    <MonthlyCostBreakdown />
                </div>

            </div>



        </div>
    )
}