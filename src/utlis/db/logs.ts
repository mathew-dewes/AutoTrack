"use server"

import { createClientForServer } from "../supabase/server"

export async function getVehicleLog(id: string){
    const supabase = await createClientForServer();
    const {data, error} = await supabase.from("vehicles")
    .select("distance_logs(*), service_logs(*)").eq("id", id).order("created_at",{ascending: false}); 
    if (error) throw new Error(error.message)
    return data
}


export async function getDistanceLogs(){
        const supabase = await createClientForServer();
    const {data, error} = await supabase.from("vehicles")
    .select("make, model, year, distance_logs(*)")
    .order("created_at",{ascending: false}); 
    if (error) throw new Error(error.message)
   const vehiclesWithLogs =  data.filter(vehicle => vehicle.distance_logs && vehicle.distance_logs.length > 0);
  vehiclesWithLogs.sort((a, b) => {
    const aLatest = a.distance_logs.reduce((max, log) => log.created_at > max ? log.created_at : max, a.distance_logs[0].created_at);
    const bLatest = b.distance_logs.reduce((max, log) => log.created_at > max ? log.created_at : max, b.distance_logs[0].created_at);
    return new Date(bLatest).getTime() - new Date(aLatest).getTime();
  });

  return vehiclesWithLogs;
}
