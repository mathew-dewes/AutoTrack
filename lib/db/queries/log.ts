"use server";

import { createClientForServer } from "@/lib/supabase/server";

export async function getVehicleFuelLogs(vehicle_id: string) {
    const supabase = await createClientForServer();

    const { data: logs, error } = await supabase.from("logs").
        select("id, date, fuel_litres, cost_per_litre, notes, cost, odometer, vendor")
        .eq("vehicle_id", vehicle_id)
        .eq("type", "fuel").order("date", { ascending: false })

    if (error) {
        console.log("Error:", error);
        return { success: false, error: error, logs }

    }

    return logs

}


export async function getVehiclesFuelLogs() {
    const supabase = await createClientForServer();

    const { data: logs, error } = await supabase.from("logs").
        select("id, date, fuel_litres, vendor, cost, vehicles(model, licence_plate_number)")
        .eq("type", "fuel").order("date", { ascending: false }).order("created_at", { ascending: false })

    if (error) {
        console.log("Error:", error);
        return { success: false, error: error, logs }

    }

    return logs

}

export async function getVehicleRepairLogs(vehicle_id: string) {
  
    const supabase = await createClientForServer();

    const { data: logs, error } = await supabase.from("logs").
        select("id, date, notes, cost, odometer, service_type, vendor")
        .eq("vehicle_id", vehicle_id)
        .eq("type", "repair").order("created_at", { ascending: false })

    if (error) {
        console.log("Error:", error);
        return { success: false, error: error, logs }

    }

    return logs

};


export async function getVehiclesRepairLogs() {
    const supabase = await createClientForServer();

    const { data: logs, error } = await supabase.from("logs").
        select(`id, date, cost, odometer, service_type, vendor,
            vehicles(model, licence_plate_number)`)
        .eq("type", "repair").order("created_at", { ascending: false })

    if (error) {
        console.log("Error:", error);
        return { success: false, error: error, logs }

    }

    return logs

};


export async function getRecentServices() {
    const supabase = await createClientForServer();

    const { data, error } = await supabase.rpc(
        "get_recent_services",
     
    );

    if (error) {
        console.log(error);
        return [];
    }

    return data;
};


export async function getUpcomingServices() {
    const supabase = await createClientForServer();

    const { data, error } = await supabase.rpc(
        "get_upcoming_services",
   
    );

    if (error) {
        console.log(error);
        return [];
    }

    return data;
}


export async function getTotalSpend() {
    const supabase = await createClientForServer();

    const { data, error } = await supabase.rpc(
        "get_total_cost_per_vehicle",

    );

    if (error) {
        console.log(error);
        return [];
    }

    return data;
};


export async function getMonthlyPurchases() {
    const supabase = await createClientForServer();

    const { data: monthlyData, error: monthlyError } = await supabase.rpc("get_monthly_spend");

    if (monthlyError) {
        console.log("Error fetching monthly spend:", monthlyError);
        return { success: false, error: monthlyError };
    }

    return monthlyData;

};

export async function getHighestSpendingVehicle(){
   const supabase = await createClientForServer();

    const { data: vehicle, error } = await supabase.rpc("get_highest_spending_vehicle");

    if (error) {
        console.log("Error fetching monthly spend:", error);
        return { success: false, error: error };
    }

    return vehicle[0] ?? [];
}


