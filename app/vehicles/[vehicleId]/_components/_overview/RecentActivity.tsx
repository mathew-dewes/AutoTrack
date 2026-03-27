import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { convertToMoney } from "@/lib/utils";
import { VehicleRecentActivity } from "@/lib/validation/types";
import { format } from "date-fns";

export default function RecentActivity({activity}:{activity: VehicleRecentActivity}){


    
    return(
        <Card>
            <CardHeader>
                <CardTitle className="font-semibold text-lg">Recent Activity</CardTitle>
                <CardDescription hidden={activity.length > 0}>You have no saved logs. Please added them to fully utilize the AutoTrack system</CardDescription>
            </CardHeader>

            <CardContent>
                <div className="space-y-2">
            {activity.map((activity)=>{
                    return <p key={activity.id}>
                        {format(activity.date, "dd/MM")} - {activity.service_type ?? "Refuel"} with {activity.vendor}: {convertToMoney(activity.cost)}</p>
                })}     
                </div>
                
            </CardContent>
        </Card>
    )
}