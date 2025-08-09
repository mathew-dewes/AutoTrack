"use client"

import { useQuery } from "@tanstack/react-query"
import { fetchVehicles } from "../db/vehicles"
import { getDistanceLogs, getServiceLogs } from "../db/logs"



export function useVehicles(){
return  useQuery({
        queryKey: ['vehicles'],
        queryFn: async () => fetchVehicles(),
        staleTime: 1000 * 60 * 5,
    })
}


export function useDistanceLogs(limit?:number){
    return useQuery({
            queryKey: ['distance', limit],
            queryFn: async () => getDistanceLogs(),
            staleTime: 1000 * 60 * 5,
        })
}

export function useServiceLogs(){
    return useQuery({
            queryKey: ['service'],
            queryFn: async () => getServiceLogs(),
            staleTime: 1000 * 60 * 5,
        })
}