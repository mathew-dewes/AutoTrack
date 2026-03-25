"use server";

import { getUserId } from "@/lib/auth/session";
import { createClientForServer } from "@/lib/supabase/server";

export async function getVehicleFuelLogs(vehicle_id: string){
    const user_id = await getUserId();
    const supabase = await createClientForServer();

    const {data: logs, error} = await supabase.from("logs").
    select("id, date, fuel_litres, cost_per_litre, notes, cost, odometer")
    .eq("user_id", user_id)
    .eq("vehicle_id", vehicle_id)
    .eq("type", "fuel").order("date", {ascending: false})

        if (error){
        console.log("Error:", error);
        return {success: false, error: error, logs}
        
    }

    return logs

}

export async function getVehicleRepairLogs(vehicle_id: string){
    const user_id = await getUserId();
    const supabase = await createClientForServer();

    const {data: logs, error} = await supabase.from("logs").
    select("id, date, notes, cost, odometer, title")
    .eq("user_id", user_id)
    .eq("vehicle_id", vehicle_id)
    .eq("type", "repair").order("created_at", {ascending: false})

        if (error){
        console.log("Error:", error);
        return {success: false, error: error, logs}
        
    }

    return logs

}