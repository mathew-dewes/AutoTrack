"use server";

import { getUserId } from "@/lib/auth/session";
import { createClientForServer } from "@/lib/supabase/server";
import { ServiceType } from "@/lib/validation/enums";
import { fuelLogSchema, repairFormSchema } from "@/lib/validation/schema";
import { revalidatePath } from "next/cache";
import z from "zod";



export async function addFuelLog(values: z.infer<typeof fuelLogSchema>, vehicle_id: string){
const user_id = await getUserId();

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
    
            const supabase = await createClientForServer();

            const {error} = await supabase.from("logs").insert({
                date: parsed.data.date.toISOString(),
                type: "fuel",
                cost: parsed.data.cost,
                odometer: parsed.data.odometer,
                user_id,
                vehicle_id,
                fuel_litres:parsed.data.fuel_litres

            });

                 if (error) {
            return {
                success: false,
                error: error.message
            }
        };

          revalidatePath('/vehicles');

             return {success: true, message: `Fuel log added`}

} catch (error) {
            console.error(error);

        return {
            success: false,
            error: "Something went wrong. Please try again."
        }
}
}



export async function addRepairLog(values: z.infer<typeof repairFormSchema>, vehicle_id: string){
const user_id = await getUserId();

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
    
            const supabase = await createClientForServer();
            
            
            const {error} = await supabase.from("logs").insert({
                date: parsed.data.date.toISOString(),
                type: "maintenance",
                cost: parsed.data.cost,
                odometer: parsed.data.odometer,
                user_id,
                vehicle_id,
                title: parsed.data.title,
                description: parsed.data.description,
                service_type:parsed.data.service_type as ServiceType

            });

                 if (error) {
            return {
                success: false,
                error: error.message
            }
        };

          revalidatePath('/vehicles');

             return {success: true, message: `Repair log added`}

} catch (error) {
            console.error(error);

        return {
            success: false,
            error: "Something went wrong. Please try again."
        }
}
}