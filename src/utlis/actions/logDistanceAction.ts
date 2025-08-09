"use server"

import { createClientForServer } from "../supabase/server";

export async function LogDistance(formData:{vehicle_id: string, km: number}){
      const supabase = await createClientForServer();
      const {error} = await supabase.from("distance_logs").insert(formData);

      if (error) throw new Error(error.message)
    return {success: true}
}