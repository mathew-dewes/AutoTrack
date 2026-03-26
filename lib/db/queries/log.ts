"use server";

import { getUserId } from "@/lib/auth/session";
import { createClientForServer } from "@/lib/supabase/server";

export async function getVehicleFuelLogs(vehicle_id: string) {
    const user_id = await getUserId();
    const supabase = await createClientForServer();

    const { data: logs, error } = await supabase.from("logs").
        select("id, date, fuel_litres, cost_per_litre, notes, cost, odometer, vendor")
        .eq("user_id", user_id)
        .eq("vehicle_id", vehicle_id)
        .eq("type", "fuel").order("date", { ascending: false })

    if (error) {
        console.log("Error:", error);
        return { success: false, error: error, logs }

    }

    return logs

}


export async function getVehiclesFuelLogs(user_id: string) {
    const supabase = await createClientForServer();

    const { data: logs, error } = await supabase.from("logs").
        select("id, date, fuel_litres, vendor, cost, vehicles(model, licence_plate_number)")
        .eq("user_id", user_id)
        .eq("type", "fuel").order("date", { ascending: false }).order("created_at", { ascending: false })

    if (error) {
        console.log("Error:", error);
        return { success: false, error: error, logs }

    }

    return logs

}

export async function getVehicleRepairLogs(vehicle_id: string) {
    const user_id = await getUserId();
    const supabase = await createClientForServer();

    const { data: logs, error } = await supabase.from("logs").
        select("id, date, notes, cost, odometer, service_type, vendor")
        .eq("user_id", user_id)
        .eq("vehicle_id", vehicle_id)
        .eq("type", "repair").order("created_at", { ascending: false })

    if (error) {
        console.log("Error:", error);
        return { success: false, error: error, logs }

    }

    return logs

};


export async function getVehiclesRepairLogs(user_id: string) {
    const supabase = await createClientForServer();

    const { data: logs, error } = await supabase.from("logs").
        select(`id, date, cost, odometer, service_type, vendor,
            vehicles(model, licence_plate_number)`)
        .eq("user_id", user_id)
        .eq("type", "repair").order("created_at", { ascending: false })

    if (error) {
        console.log("Error:", error);
        return { success: false, error: error, logs }

    }

    return logs

};


export async function getRecentServices(user_id: string) {
    const supabase = await createClientForServer();

    const { data, error } = await supabase.rpc(
        "get_recent_services",
        { p_user_id: user_id }
    );

    if (error) {
        console.log(error);
        return [];
    }

    return data;
};


export async function getUpcomingServices(user_id: string) {
    const supabase = await createClientForServer();

    const { data, error } = await supabase.rpc(
        "get_upcoming_services",
        { p_user_id: user_id }
    );

    if (error) {
        console.log(error);
        return [];
    }

    return data;
}


export async function getTotalSpend(user_id: string) {
    const supabase = await createClientForServer();

    const { data, error } = await supabase.rpc(
        "get_total_cost_per_vehicle",
        { p_user_id: user_id }
    );

    if (error) {
        console.log(error);
        return [];
    }

    return data;
};


export async function getMonthlyPurchases(user_id: string) {
    const supabase = await createClientForServer();

    const { data: monthlyData, error: monthlyError } = await supabase.rpc("get_monthly_spend", { p_user_id: user_id });

    if (monthlyError) {
        console.log("Error fetching monthly spend:", monthlyError);
        return { success: false, error: monthlyError };
    }

    return monthlyData;

};

export async function getHighestSpendingVehicle(user_id: string){
   const supabase = await createClientForServer();

    const { data: vehicle, error } = await supabase.rpc("get_highest_spending_vehicle", { p_user_id: user_id });

    if (error) {
        console.log("Error fetching monthly spend:", error);
        return { success: false, error: error };
    }

    return vehicle[0];
}


