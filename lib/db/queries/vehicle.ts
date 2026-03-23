"use server";

import { createClientForServer } from "@/lib/supabase/server";

export async function getVehicles(user_id: string){
    const supabase = await createClientForServer();

    const {data: vehicles, error} = 
    await supabase.from("vehicles").
    select()
    .eq("user_id", user_id);

    if (error){
        console.log("Error:", error);
        return {success: false, error: error, vehicles}
        
    }

    return {success: true, vehicles}


}