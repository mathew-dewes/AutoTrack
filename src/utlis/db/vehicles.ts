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


export async function fetchVehicle(vehicle_id: string): Promise<Vehicle>{  
  const supabase = await createClientForServer();
  const { data, error } = await supabase.from("vehicles").select("*").eq("id",vehicle_id).single();
  if (error) throw new Error(error.message)
  return data
}



export async function addvehicle(newVehicle: Vehicle) {
  const supabase = await createClientForServer();
  const {make, model, year, odometer} = newVehicle;

  
  const { error } = await supabase
    .from("vehicles")
    .insert({
      make, model, year: Number(year), odometer: Number(odometer),
    } 

    )
  if (error) {

    
    let friendlyMessage = "Something went wrong while adding the vehicle.";

    // Map DB constraint names to nicer messages
    if (error.message.includes("make_not_empty")) {
      friendlyMessage = "Make is required.";
    } else if (error.message.includes("model_not_empty")) {
      friendlyMessage = "Model is required.";
    } else if (error.message.includes("year_positive")) {
      friendlyMessage = "Year must be a positive number.";
    } else if (error.message.includes("odometer_non_negative")) {
      friendlyMessage = "Odometer cannot be negative.";
    } else if (error.message.includes("odometer_min")) {
      friendlyMessage = "Odometer must be greater than 0.";
    }

    throw new Error(friendlyMessage);
  }
}

