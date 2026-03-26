import { convertToMoney } from "@/lib/utils";
import { SpendChart } from "./_charts/SpendChart";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { getHighestSpendingVehicle, getMonthlyPurchases } from "@/lib/db/queries/log";
import { MonthlySpend, TopVehicle } from "@/lib/validation/types";

export default async function SpendOverTime(){

    const spend = await getMonthlyPurchases() as MonthlySpend[];

const highestSpendingVehicle = await getHighestSpendingVehicle() as TopVehicle;


  
    return (
        <div className="space-y-3">
            <Card>
                <CardHeader>
                    <CardTitle>Spend</CardTitle>
                    <CardDescription>
                          <div className="flex gap-5">
                <p>Yearly: {convertToMoney(12.5)}</p>
                <p>Monthly: {convertToMoney(12.5)}</p>
                <div className="flex gap-1.5 items-center">
                 
                      <p>Change: 22%</p>
                        <TrendingUp className="h-4 w-4" />
                </div>
              
            </div>
                    </CardDescription>
                </CardHeader>
        
            </Card>
         
            <SpendChart chartData={spend} topVehicle={highestSpendingVehicle}/>
        </div>
    )
}