import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { convertToMoney } from "@/lib/utils";
import { VehicleMetric } from "@/lib/validation/types";

export default function KeyStats({metrics}:{metrics: VehicleMetric}){
    const {current_odometer, total_fuel_logs, total_repairs, total_spend} = metrics;
    return (
          <Card>
            <CardHeader>
                <CardTitle className="font-semibold text-lg">Key Metrics</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                <p>Current odometer: {current_odometer.toLocaleString()} Km</p>
                <p>Total spend: {convertToMoney(total_spend)}</p>
                <p>Total repairs: {total_repairs}</p>
                <p>Total fuel logs: {total_fuel_logs}</p>
                </div>
              
            </CardContent>
        </Card>
    )
}