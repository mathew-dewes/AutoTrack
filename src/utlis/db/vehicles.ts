import { createClientForServer } from "../supabase/server";



export async function getVehicles() {
  const supabase = await createClientForServer();
  await wait(1000)
  const { data, error } = await supabase.from("vehicles").select("*");
 return {
  error: error?.message,
  vehicles: data
 }
}
function wait(duration: number) {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}