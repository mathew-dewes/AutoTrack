"use server"

import { fuelLogSchema } from "@/lib/validation/schema";
import { sql } from "../sql";
import { getUserId } from "@/lib/auth";
import z from "zod";

export async function addFuelLog(values: z.infer<typeof fuelLogSchema>, vehicle_id: string) {
console.log(values);

    const user_id = await getUserId()
    try {
        const parsed = fuelLogSchema.safeParse(values);

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

        const f = parsed.data;
        const result = await sql`
    INSERT INTO fuel_logs (
      vehicle_id,
      date,
      litres,
      cost,
      odometer,
      price_per_litre,
      user_id,
      vendor,
      notes
    )
   SELECT
      ${vehicle_id},
      ${f.date},
      ${f.fuel_litres},
      ${f.cost},
      ${f.odometer},
      ${f.cost / f.fuel_litres},
      ${user_id},
      ${f.vendor},
      ${f.notes}
      FROM vehicles
      WHERE id = ${vehicle_id} AND
      user_id = ${user_id} AND
      ${f.odometer} >= current_odometer
      AND ${f.odometer} >= COALESCE(current_odometer, 0)
      RETURNING id;
  `;

  console.log(result);
  

if (result.length === 0) {
  return {
    success: false,
    fieldErrors: {
      odometer: "Odometer must be greater than current vehicle odometer"
    }, 

  };
}

        return {
            success: true,
            message: "Fuel log added",
            error: null

        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            error: "Something went wrong. Please try again."
        }
    }
};