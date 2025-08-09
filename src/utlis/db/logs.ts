"use server"

import { createClientForServer } from "../supabase/server"

export async function getVehicleLog(id: string){
    const supabase = await createClientForServer();
    const {data, error} = await supabase.from("vehicles")
    .select("distance_logs(*), service_logs(*)").eq("id", id).order("created_at",{ascending: false}); 
    if (error) throw new Error(error.message)
    return data
}


export async function getDistanceLogs(limit?: number) {
  const supabase = await createClientForServer();

  const { data, error } = await supabase
    .from("vehicles")
    .select("make, model, year, distance_logs(*)")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  if (!data) return [];

  // Flatten all distance_logs with vehicle info attached
  const allLogs = data.flatMap(vehicle =>
    vehicle.distance_logs.map(log => ({
      ...log,
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
    }))
  );

  // Sort all logs by logged_at descending
  allLogs.sort((a, b) => new Date(b.logged_at!).getTime() - new Date(a.logged_at!).getTime());

  // Return only top 3 logs
  if (limit){
  return allLogs.slice(0, limit);
  }
  return allLogs

}
