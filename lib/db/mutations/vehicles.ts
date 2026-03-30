"use server";

import { vehicleSchema } from "@/lib/validation/schema";
import z from "zod";
import { sql } from "../sql";
import { getUserId } from "@/lib/auth";


export async function addVehicle(values: z.infer<typeof vehicleSchema>){
    
const user_id = await getUserId()
    try {
             const parsed = vehicleSchema.safeParse(values);

        if (!parsed.success) {
            const fieldErrors: Record<string, string> = {}

            parsed.error.issues.forEach(issue => {
                fieldErrors[issue.path[0] as string] = issue.message
            })

            return {
                success: false,
                fieldErrors
            }
        };

        const v = parsed.data;

const result = await sql`
    INSERT INTO vehicles (
      make,
      model,
      year,
      licence_plate_number,
      current_odometer,
      user_id
    )
    VALUES (
      ${v.make},
      ${v.model},
      ${v.year},
      ${v.licence_plate},
      ${v.odometer},
      ${user_id}
    )
    RETURNING *;
  `;

  const vehicle = result[0];

    return {
      success: true,
      data: {
        id: vehicle.id,
        make: vehicle.make,
        model: vehicle.model,
        year: vehicle.year,
        licence_plate_number: vehicle.licence_plate_number,
        current_odometer: vehicle.current_odometer,
        user_id: vehicle.user_id,
        created_at: vehicle.created_at,
      },
    };
    } catch (error) {
             console.error(error);

        return {
            success: false,
            error: "Something went wrong. Please try again."
        }
    }
};



export async function deleteVehicle(vehicle_id: string){
    
const user_id = await getUserId()
    try {
      
await sql`
DELETE FROM vehicles
WHERE user_id = ${user_id} AND
id = ${vehicle_id}
`;
 
    } catch (error) {
             console.error(error);

        return {
            success: false,
            error: "Something went wrong. Please try again."
        }
    }
}
