"use server";

import { vehicleSchema } from "@/lib/validation/schema";
import z from "zod";
import { sql } from "../sql";
import { getUserId } from "@/lib/auth";


export async function addVehicle(values: z.infer<typeof vehicleSchema>) {

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

        await sql`
    INSERT INTO vehicles (
      make,
      model,
      year,
      licence_plate_number,
      current_odometer,
      initial_odometer,
      user_id
    )
    VALUES (
      ${v.make},
      ${v.model},
      ${v.year},
      ${v.licence_plate},
      ${v.odometer},
    ${v.odometer},
      ${user_id}
   
    );
  `;


        return {
            success: true,
            message: "Vehicle has been added"
        };
    } catch (error) {
        console.error(error);

        let errorMessage = "Something went wrong. Please try again.";

        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return {
            success: false,
            error: errorMessage
        };
    }
};



export async function deleteVehicle(vehicle_id: string) {

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
