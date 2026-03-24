"use server";

import { getUserId } from "@/lib/auth/session";
import { createClientForServer } from "@/lib/supabase/server";
import { vehicleSchema } from "@/lib/validation/schema";
import { revalidatePath } from "next/cache";
import z from "zod";

export async function addVehicle(values: z.infer<typeof vehicleSchema>) {
    const user_id = await getUserId();
    

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

        const supabase = await createClientForServer();

        const { error } = await supabase.from("vehicles").insert({
            make: parsed.data.make,
            model: parsed.data.model,
            year: parsed.data.year,
            licence_plate_number: parsed.data.licence_plate,
            current_odometer: parsed.data.odometer,
            user_id
        });

        if (error) {
            return {
                success: false,
                error: error.message
            }
        };

        revalidatePath('/vehicles')

        return {success: true, message: `${parsed.data.make} ${parsed.data.model} was added successfully`}

    } catch (error) {
        console.error(error);

        return {
            success: false,
            error: "Something went wrong. Please try again."
        }

    }
};


export async function updateOdometerReading(vehicle_id: string, updatedAmount: number){

const supabase = await createClientForServer();

const {data ,error} = await supabase.from("vehicles").update({current_odometer: updatedAmount})
.eq("id", vehicle_id).select();
     if (error) {
        console.log(error);
        
            return {
                success: false,
                error: error.message
            }
        };

        console.log("UPDATE RESULT:", data, error);

        return {
            success: true, message: "Odometer reading updated"
        }
};

export async function odometerCheck(vehicle_id: string, updateAmount: number){
    const supabase = await createClientForServer();

const { data: vehicle } = await supabase
  .from("vehicles")
  .select("current_odometer")
  .eq("id", vehicle_id)
  .single();

  if (!vehicle){
    return {
        success: false, error: "Vehicle not found"
    }
  }

if (updateAmount <= vehicle.current_odometer) {
  return {
    success: false,
    error: "Odometer cannot go backwards",
  };
}

return {success: true}
}