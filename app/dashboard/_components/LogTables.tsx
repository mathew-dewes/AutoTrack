
import { getVehiclesFuelLogs, getVehiclesRepairLogs } from "@/lib/db/queries/log";

import { TableSwitcher } from "./TableSwitcher";
import { FuelEntryAll, RepairEntryAll } from "@/lib/validation/types";


export default async function LogTables(){

    const [fuelLogs, repairLogs ] = await Promise.all([getVehiclesFuelLogs(), getVehiclesRepairLogs()]);

    const fuel = fuelLogs as FuelEntryAll[];
    const repairs = repairLogs as RepairEntryAll[]
  
    return (
        <div>
         <TableSwitcher repairs={repairs} fuel={fuel}/>
        </div>
    )
}