
import { auth } from "@/lib/auth";
import { sql } from "@/lib/db/sql";

import { headers } from "next/headers";

import { NextResponse } from "next/server";

export async function GET() {

  try {

    const session = await auth.api.getSession(
     { headers: await headers()});

     if (!session){
       return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
     }

         const userId = session.user.id;

    const data = await sql`SELECT
  (SELECT COUNT(*) FROM vehicles WHERE user_id = ${userId}) AS total_vehicles,

  (SELECT COALESCE(SUM(cost), 0) 
   FROM fuel_logs WHERE user_id = ${userId}) AS total_fuel_spend,

  (SELECT COALESCE(SUM(cost), 0) 
   FROM repair_logs WHERE user_id = ${userId}) AS total_repair_spend,

  (SELECT COALESCE(SUM(current_odometer - initial_odometer), 0)
   FROM vehicles WHERE user_id = ${userId}) AS total_distance`;


    return NextResponse.json(data[0] ?? null);
  } catch (error) {
    console.log(error);
    
    return NextResponse.json(
      { error: "Failed to fetch vehicle summary" },
      { status: 500 }
    );
  }
}