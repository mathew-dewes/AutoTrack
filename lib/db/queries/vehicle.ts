"use server";

import { createClientForServer } from "@/lib/supabase/server";

export async function getVehicles(){
    const supabase = await createClientForServer();

    const {data: vehicles, error} = 
    await supabase.from("vehicles").
    select("id, make, model, year, current_odometer, licence_plate_number")


    if (error){
        console.log("Error:", error);
        return []
        
    }

    return vehicles


};

export async function getVehicle(vehicleId: string){
    const supabase = await createClientForServer();

    const {data: vehicle, error} = 
    await supabase.from("vehicles").
    select("make, model, year, licence_plate_number, current_odometer")
    .eq("id", vehicleId).single();

    if (error){
        console.log("Error:", error);
        return {success: false, error: error, vehicle}
        
    }

    return vehicle


}
export async function getVehicleOdometer(vehicleId: string){
    const supabase = await createClientForServer();

    const {data: vehicle, error} = 
    await supabase.from("vehicles").
    select("current_odometer")
    .eq("id", vehicleId).single();

    if (error){
        console.log("Error:", error);
        return {success: false, error: error, vehicle}
        
    }

    return vehicle.current_odometer


}