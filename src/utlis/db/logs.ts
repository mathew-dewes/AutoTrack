"use server"

import { createClientForServer } from "../supabase/server"

export async function getVehicleLog(id: string){
    const supabase = await createClientForServer();
    const {data, error} = await supabase.from("vehicles")
    .select("distance_logs(*), service_logs(*)").eq("id", id).order("created_at",{ascending: false}); 
    if (error) throw new Error(error.message)
    return data
}