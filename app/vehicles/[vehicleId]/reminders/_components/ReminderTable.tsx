import { getUserNotifications } from "@/lib/db/queries/notification"
import { ReminderTableClient } from "./_table/ReminderTableClient";
import { ReminderColumns } from "./_table/ReminderCloumns";
import { NotificationEntry } from "@/lib/validation/types";

export async function ReminderTable({vehicleId}:
    {vehicleId: string}
){

    const notifications = await getUserNotifications(vehicleId) as NotificationEntry[]

    
    return (
  
            <ReminderTableClient 
            columns={ReminderColumns}
            data={notifications}
            />
     
    )
}