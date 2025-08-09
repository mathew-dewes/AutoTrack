"use server"

import { ServiceType } from "@/components/forms/LogServiceForm";
import { createClientForServer } from "../supabase/server";

export async function LogDistance(formData:{vehicle_id: string, km: number}){
      const supabase = await createClientForServer();
      const {error} = await supabase.from("distance_logs").insert(formData);

      if (error) throw new Error(error.message)
    return {success: true}
}
export async function LogService(formData:{km: number, vehicle_id: string, notes: string, type: ServiceType, date: string}){
      const supabase = await createClientForServer();
      const {error} = await supabase.from("service_logs").insert(formData);

      if (error) throw new Error(error.message)
    return {success: true}
}