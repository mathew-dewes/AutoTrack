import { getVehicleFuelLogs } from "@/lib/db/queries/log";
import { FuelTableClient } from "./_table/FuelTableClient";
import { Fuelcolumns } from "./_table/Fuelcolumns";
import { FuelEntry } from "@/lib/validation/types";

export default async function FuelTable({vehicleId}:
    {vehicleId: string}
){
 const fuelLogs = await getVehicleFuelLogs(vehicleId) as FuelEntry[];      
   return (
        <div>
               <FuelTableClient columns={Fuelcolumns} data={fuelLogs}/>
        </div>
    )
}