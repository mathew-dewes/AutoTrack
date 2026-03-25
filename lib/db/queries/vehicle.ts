"use server";

import { getUserId } from "@/lib/auth/session";
import { createClientForServer } from "@/lib/supabase/server";

export async function getVehicles(){
      const user_id = await getUserId();
    const supabase = await createClientForServer();

    const {data: vehicles, error} = 
    await supabase.from("vehicles").
    select("id, make, model, year, current_odometer, licence_plate_number")
    .eq("user_id", user_id);

    if (error){
        console.log("Error:", error);
        return []
        
    }

    return vehicles


};

export async function getVehicle(vehicleId: string){
      const user_id = await getUserId();
    const supabase = await createClientForServer();

    const {data: vehicle, error} = 
    await supabase.from("vehicles").
    select("make, model, year, licence_plate_number, current_odometer")
    .eq("user_id", user_id).eq("id", vehicleId).single();

    if (error){
        console.log("Error:", error);
        return {success: false, error: error, vehicle}
        
    }

    return vehicle


}