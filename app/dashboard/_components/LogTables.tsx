
import { getVehiclesFuelLogs, getVehiclesRepairLogs } from "@/lib/db/queries/log";

import { TableSwitcher } from "./TableSwitcher";
import { FuelEntryAll, RepairEntryAll } from "@/lib/validation/types";


export default async function LogTables({user_id}:
    {user_id: string}
){

    const [fuelLogs, repairLogs ] = await Promise.all([
        getVehiclesFuelLogs(user_id), 
        getVehiclesRepairLogs(user_id)]);

    const fuel = fuelLogs as FuelEntryAll[];
    const repairs = repairLogs as RepairEntryAll[]
  
    return (
        <div>
         <TableSwitcher repairs={repairs} fuel={fuel}/>
        </div>
    )
}