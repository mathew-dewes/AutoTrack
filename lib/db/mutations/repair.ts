"use server";

import { getUserId } from "@/lib/auth";
import { sql } from "../sql";
import z from "zod";
import { repairFormSchema } from "@/lib/validation/schema";

export async function addRepairLog(values: z.infer<typeof repairFormSchema>, vehicle_id: string) {

    const user_id = await getUserId()
    try {
        const parsed = repairFormSchema.safeParse(values);

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

        const r = parsed.data;

const result = await sql`
    INSERT INTO repair_logs (
      vehicle_id,
      date,
      type,
      cost,
      odometer,
      notes,
      user_id,
      vendor
    )
    SELECT 
      ${vehicle_id},
      ${r.date},
      ${r.repair_type},
      ${r.cost},
      ${r.odometer},
      ${r.notes},
      ${user_id},
      ${r.vendor}
      FROM vehicles
      WHERE id = ${vehicle_id} AND
      ${r.odometer} >= current_odometer
      AND ${r.odometer} >= COALESCE(current_odometer, 0)
     RETURNING id;
    
  `;

  
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
            message: "Repair log added",
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