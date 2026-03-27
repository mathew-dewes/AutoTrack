import { SpendChart } from "./_charts/SpendChart";
import { getHighestSpendingVehicle, getMonthlyPurchases } from "@/lib/db/queries/log";
import { getVehiclesSpendBreakdown } from "@/lib/db/queries/vehicle";
import { MonthlySpend, TopVehicle, TotalSpendBreakdown } from "@/lib/validation/types";

export default async function SpendOverTime(){

    const [spend, highestSpendingVehicle, spendBreakdown] = await Promise.all([getMonthlyPurchases(), getHighestSpendingVehicle(), getVehiclesSpendBreakdown()]) 

  
    return (
        <div>
            <SpendChart chartData={spend as MonthlySpend[]} topVehicle={highestSpendingVehicle as TopVehicle} spendBreakdown={spendBreakdown as TotalSpendBreakdown}/>
        </div>
    )
}