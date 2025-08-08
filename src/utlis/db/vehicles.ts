"use server"

import { createClientForServer } from "../supabase/server"

export type Vehicle = {
  created_at?: string; 
  id?: string; 
  make: string | null; 
  model: string | null; 
  odometer: number | string | null; 
  user_id?: string | null; 
  year: number | string | null; 
}



export async function fetchVehicles(): Promise<Vehicle[]> {
  const supabase = await createClientForServer();
  const { data, error } = await supabase.from("vehicles").select("*").order("created_at",{ascending:false});
  if (error) throw new Error(error.message)
  return data
}


export async function fetchVehicle(vehicle_id: string, user_id: string): Promise<Vehicle>{  
  const supabase = await createClientForServer();
  const { data, error } = await supabase.from("vehicles").select("*").eq("user_id", user_id).eq("id",vehicle_id).single();
  if (error) throw new Error(error.message)
  return data
}



export async function addvehicle(newVehicle: Vehicle) {
  const supabase = await createClientForServer();
  const {make, model, year, odometer, user_id} = newVehicle;
  const { error } = await supabase
    .from("vehicles")
    .insert({
      make, model, year: Number(year), odometer: Number(odometer),
      user_id
    } 

    )
  if (error) return new Error(error.message)
}

