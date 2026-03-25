"use server";

import { getUserId } from "@/lib/auth/session";
import { createClientForServer } from "@/lib/supabase/server";

export async function getUserNotifications(vehicle_id: string) {
    const user_id = await getUserId();
    const supabase = await createClientForServer();

    const { data, error } = await supabase.from("notifications").
        select("id, created_at, title, date_trigger, odometer_trigger, sent").
        eq("user_id", user_id).eq("vehicle_id", vehicle_id)

    if (error) {
        console.log("Error:", error);
        return { success: false, error: error, data }

    }

      return data
}