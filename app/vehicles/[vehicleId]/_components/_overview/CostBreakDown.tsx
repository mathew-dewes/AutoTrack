import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { convertToMoney } from "@/lib/utils";
import { CostBreakdown } from "@/lib/validation/types";



export default function CostBreakDown({costBreakdown}:
    {costBreakdown: CostBreakdown}
){
    return(
                    <Card>
            <CardHeader>
                <CardTitle className="font-semibold text-lg">Cost breakdown</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                <p>Repair cost total: {convertToMoney(costBreakdown.repair_cost)}</p>
                <p>Fuel cost total: {convertToMoney(costBreakdown.refuel_cost)}</p>
                <p>Conbined total: {convertToMoney(costBreakdown.total_cost)}</p>
               
                </div>
              
            </CardContent>
        </Card>
    )
}