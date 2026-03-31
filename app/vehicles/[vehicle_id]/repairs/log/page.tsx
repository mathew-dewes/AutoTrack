import { getUserId } from "@/lib/auth";
import RepairLogForm from "./_components/RepairLogForm";
import { sql } from "@/lib/db/sql";

export default async function page(
    {params}:{
        params: Promise<{vehicle_id: string}>
    }
){

         const {vehicle_id} = await params;
          const user_id = await getUserId();
         
              const result = await sql`
              SELECT current_odometer
              FROM vehicles
              WHERE id = ${vehicle_id} AND
              user_id = ${user_id}
              `;
         
              const currentOdometer = result[0]?.current_odometer;
    return(
        <div>
            <RepairLogForm vehicle_id={vehicle_id} odometer={currentOdometer}/>
        </div>
    )
}