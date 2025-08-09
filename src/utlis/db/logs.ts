"use server"

import { createClientForServer } from "../supabase/server"

export async function getVehicleLog(id: string){
    const supabase = await createClientForServer();
    const {data, error} = await supabase.from("vehicles")
    .select("distance_logs(*), service_logs(*)").eq("id", id).order("created_at",{ascending: false}); 
    if (error) throw new Error(error.message)
    return data
}


export async function getDistanceLogs() {
  const supabase = await createClientForServer();

  const { data, error } = await supabase
    .from("vehicles")
    .select("make, model, year, distance_logs(km, created_at)")


  if (error) throw new Error(error.message);
  if (!data) return [];

  const allLogs = data.flatMap(vehicle =>
    vehicle.distance_logs.map(log => ({
      ...log,
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
    }))
  );

  allLogs.sort((a, b) => new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime());


  return allLogs

}

export async function getServiceLogs() {
  const supabase = await createClientForServer();

  const { data, error } = await supabase
    .from("vehicles")
    .select("make, model, year, service_logs(type, date, km, notes)")


  if (error) throw new Error(error.message);
  if (!data) return [];

  

  const allLogs = data.flatMap(vehicle =>
    vehicle.service_logs.map(log => ({
      ...log,
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
    }))
  );

  allLogs.sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime());


  return allLogs

}
