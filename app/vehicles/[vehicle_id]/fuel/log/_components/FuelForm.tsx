import { getUserId } from "@/lib/auth";
import { sql } from "@/lib/db/sql";
import FuelLogFormClient from "./FuelLogFormClient";

export default async function FuelForm({vehicle_id}:
    {vehicle_id: string}
){

         const user_id = await getUserId();
    
         const result = await sql`
         SELECT current_odometer
         FROM vehicles
         WHERE id = ${vehicle_id} AND
         user_id = ${user_id}
         `;
    
         const currentOdometer = result[0]?.current_odometer;

         return (
            <FuelLogFormClient vehicle_id={vehicle_id} odometer={currentOdometer}/>
         )
}