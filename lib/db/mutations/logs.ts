"use server";

import { getUserId } from "@/lib/auth/session";
import { createClientForServer } from "@/lib/supabase/server";
import { ServiceType } from "@/lib/validation/enums";
import { fuelLogSchema, repairFormSchema } from "@/lib/validation/schema";
import { revalidatePath } from "next/cache";
import z from "zod";
import { updateOdometerReading } from "./vehicle";
import { Database } from "@/lib/supabase/types";

type NotificationInsert = Database["public"]["Tables"]["notifications"]["Insert"];


type ActionResponse =
    | { success: true; message: string, notification?: boolean }
    | {
        success: false;
        fieldErrors?: Record<string, string>;
        formError?: string;

    };


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

        // Get vehicle odometer reading
        const { error: odoError, data: vehicle } = await supabase
            .from("vehicles")
            .select("current_odometer")
            .eq("id", vehicle_id)
            .single();

        if (odoError) {
            return {
                success: false,
                error: odoError.message
            }
        };

        // Check if parsed odometer reading is greater than the vehicles current odometer reading
        if (parsed.data.odometer < vehicle.current_odometer) {
            return { success: false, fieldErrors: { odometer: "Odometer must be greater than current reading" } };
        }

        // Insert log
        const { data: updatedLog, error } = await supabase.from("logs").insert({
            date: parsed.data.date.toISOString(),
            type: "fuel",
            cost: parsed.data.cost,
            odometer: parsed.data.odometer,
            user_id,
            vehicle_id,
            fuel_litres: parsed.data.fuel_litres,
            notes: parsed.data.notes,
            cost_per_litre: parsed.data.cost / parsed.data.fuel_litres,
            vendor:"Z Energy"

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



export async function addRepairLog(values: z.infer<typeof repairFormSchema>, vehicle_id: string): Promise<ActionResponse> {
    const user_id = await getUserId();
    const supabase = await createClientForServer();

    try {

        // Zod calidation check
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


        // Get vehicle odometer reading
        const { error: odoError, data: vehicle } = await supabase
            .from("vehicles")
            .select("current_odometer, make, model, year, licence_plate_number")
            .eq("id", vehicle_id)
            .single();

        if (odoError) {
            return {
                success: false,
                formError: odoError.message
            };
        };

        // Check if parsed odometer reading is greater than the vehicles current odometer reading
        if (parsed.data.odometer < vehicle.current_odometer) {
            return {
                success: false,
                fieldErrors: {
                    odometer: "Odometer must be greater than current reading"
                }
            };;
        }

        // Check if parsed omdometer trigger is greater than parsed odometer reading
        if (parsed.data.odometer_trigger !== undefined) {
            if (parsed.data.odometer_trigger <= parsed.data.odometer) {
                return {
                    success: false,
                    formError: "Reminder distance must be greater than current odometer"
                };
            }
        }


        // Update log
        const { data: updatedLog, error } = await supabase.from("logs").insert({
            date: parsed.data.date.toISOString(),
            type: "repair",
            cost: parsed.data.cost,
            odometer: parsed.data.odometer,
            user_id,
            vehicle_id,
            notes: parsed.data.notes,
            service_type: parsed.data.service_type as ServiceType,
            vendor: "One Stop Auto"

        }).select("id").single();

        if (error) {
            return {
                success: false,
                formError: error.message
            }
        };

        // Update odometer reading
        const updateResult = await updateOdometerReading(vehicle_id, parsed.data.odometer);

        if (!updateResult.success) {
            await supabase.from("logs").delete().eq("id", updatedLog.id);

            return {
                success: false,
                formError: "Failed to update odometer",
            };
        };




        if (parsed.data.enable_reminders) {
            // Insert reminder
            const hasReminder = parsed.data.odometer_trigger;

            if (hasReminder) {

                const notification: Partial<NotificationInsert> = {
                    message: `This is a reminder that the service type ${parsed.data.service_type} is now due for ${vehicle.make} ${vehicle.model} - ${vehicle.year}`,
                    type: parsed.data.service_type as ServiceType,
                    user_id,
                    vehicle_id,
                    vehicle_name: `${vehicle.make} ${vehicle.model} - ${vehicle.licence_plate_number}`

                };

                if (parsed.data.odometer_trigger !== undefined) {
                    notification.odometer_trigger = parsed.data.odometer_trigger;
                }

                const { error: notificationError } = await supabase
                    .from("notifications")
                    .insert(notification as NotificationInsert)

                if (notificationError) {
                    return {
                        success: false,
                        formError: notificationError.message
                    };
                }

      
            }




        }



        revalidatePath(`/vehicles/${vehicle_id}/repairs`);

        return { success: true, message: `Repair log added`, notification: true }

    } catch (error) {
        console.error(error);

        return {
            success: false,
            formError: "Something went wrong. Please try again."
        }
    }
}