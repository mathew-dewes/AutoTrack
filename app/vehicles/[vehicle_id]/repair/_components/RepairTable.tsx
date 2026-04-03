"use client";

import { useQuery } from "@tanstack/react-query";
import { RepairColumn } from "./_table/RepairColumn";
import { RepairTableClient } from "./_table/RepairTableClient";



async function fetchRepairLogs(vehicle_id: string){
    const res = await fetch(`/api/vehicles/${vehicle_id}/repairs`);
    if (!res.ok) {
  if (res.status === 401) throw new Error("Unauthorized. Please log in.");
  throw new Error(`Failed to fetch fuel logs: ${res.statusText}`);
}


  
  return res.json();
}

export default function RepairTable({vehicle_id}:
    {vehicle_id: string}
){
const {data: logs, error, isLoading, isError} = useQuery({
    queryKey:[`vehicle-${vehicle_id}-repairs`],
    queryFn: () => fetchRepairLogs(vehicle_id),
    staleTime: 0,
    enabled: !!vehicle_id
});

if (error){
    console.log(error);
    
}

if (isLoading) return <p>Loading fuel logs</p>
if (isError) return <p>There was an error</p>
if (!logs) return <p>logs doesn&apos;t exist</p>

return (

    <RepairTableClient columns={RepairColumn} data={logs}/>
    

)
}