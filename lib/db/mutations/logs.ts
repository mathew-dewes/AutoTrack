"use server";

import { getUserId } from "@/lib/auth/session";
import { createClientForServer } from "@/lib/supabase/server";
import { ServiceType } from "@/lib/validation/enums";
import { fuelLogSchema, repairFormSchema } from "@/lib/validation/schema";
import { revalidatePath } from "next/cache";
import z from "zod";
import { odometerCheck, updateOdometerReading } from "./vehicle";



export async function addFuelLog(values: z.infer<typeof fuelLogSchema>, vehicle_id: string) {
    
    const user_id = await getUserId();
    const supabase = await createClientForServer();

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



        const check = await odometerCheck(vehicle_id, parsed.data.odometer);

        if (!check.success) {

            return check.error
        }

        const { data: updatedLog, error } = await supabase.from("logs").insert({
            date: parsed.data.date.toISOString(),
            type: "fuel",
            cost: parsed.data.cost,
            odometer: parsed.data.odometer,
            user_id,
            vehicle_id,
            fuel_litres: parsed.data.fuel_litres,
            notes: parsed.data.notes,
            cost_per_litre: parsed.data.cost / parsed.data.fuel_litres

        }).select("id").single();

        if (error) {
            return {
                success: false,
                error: error.message
            }
        };

        const updateResult = await updateOdometerReading(vehicle_id, parsed.data.odometer);

        if (!updateResult.success) {
            await supabase.from("logs").delete().eq("id", updatedLog.id);

            return {
                success: false,
                error: "Failed to update odometer",
            };
        }

        revalidatePath(`/vehicles/${vehicle_id}/fuel`);
        return { success: true, message: `Fuel log added` }

    } catch (error) {
        console.error(error);

        return {
            success: false,
            error: "Something went wrong. Please try again."
        }
    }
}



export async function addRepairLog(values: z.infer<typeof repairFormSchema>, vehicle_id: string) {
    const user_id = await getUserId();
    const supabase = await createClientForServer();

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

             const check = await odometerCheck(vehicle_id, parsed.data.odometer);

        if (!check.success) {

            return {error: check.error}
        }

      


        const { data: updatedLog ,error } = await supabase.from("logs").insert({
            date: parsed.data.date.toISOString(),
            type: "repair",
            cost: parsed.data.cost,
            odometer: parsed.data.odometer,
            user_id,
            vehicle_id,
            title: parsed.data.title,
            notes: parsed.data.notes,
            service_type: parsed.data.service_type as ServiceType

        }).select("id").single();

        if (error) {
            return {
                success: false,
                error: error.message
            }
        };

                const updateResult = await updateOdometerReading(vehicle_id, parsed.data.odometer);

        if (!updateResult.success) {
            await supabase.from("logs").delete().eq("id", updatedLog.id);

            return {
                success: false,
                error: "Failed to update odometer",
            };
        }

        revalidatePath(`/vehicles/${vehicle_id}/repairs`);

        return { success: true, message: `Repair log added` }

    } catch (error) {
        console.error(error);

        return {
            success: false,
            error: "Something went wrong. Please try again."
        }
    }
}