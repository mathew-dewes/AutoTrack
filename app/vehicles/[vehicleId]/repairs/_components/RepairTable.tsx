import { getVehicleRepairLogs } from "@/lib/db/queries/log";
import { RepairColumn } from "./_table/RepairColumn";
import { RepairTableClient } from "./_table/RepairTableClient";
import { RepairEntry } from "@/lib/validation/types";

export default async function RepairTable({vehicleId}:
    {vehicleId: string}
){
 const repairLogs = await getVehicleRepairLogs(vehicleId) as RepairEntry[];  
 

   return (
        <div>
               <RepairTableClient columns={RepairColumn} data={repairLogs}/>
        </div>
    )
}