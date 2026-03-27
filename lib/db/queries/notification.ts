"use server";

import { createClientForServer } from "@/lib/supabase/server";

export async function getUserNotifications(vehicle_id: string) {
    const supabase = await createClientForServer();

    const { data, error } = await supabase.from("notifications").
        select("id, created_at, odometer_trigger, sent, type").
   eq("vehicle_id", vehicle_id)

    if (error) {
        console.log("Error:", error);
        return { success: false, error: error, data }

    }

      return data
}

export async function getUpcomingUserReminders() {
    const supabase = await createClientForServer();

     const { data, error } = await supabase.rpc(
        "get_vehicle_service_status",
  
    );

    if (error) {
        console.log(error);
        return [];
    }

    return data;
}