
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

    const data = await sql`WITH fuel_totals AS (
  SELECT 
    vehicle_id,
    SUM(cost) AS fuel_cost,
    SUM(litres) AS total_litres
  FROM fuel_logs
    WHERE user_id = ${userId}
  GROUP BY vehicle_id

),
vehicle_stats AS (
  SELECT 
    v.id,
    v.make,
    v.model,
    v.licence_plate_number,
    COALESCE(f.fuel_cost, 0) AS fuel_cost,
    COALESCE(f.total_litres, 0) AS total_litres,
    (v.current_odometer - v.initial_odometer) AS distance
  FROM vehicles v
  LEFT JOIN fuel_totals f ON f.vehicle_id = v.id
),
ranked AS (
  SELECT *,
    distance / NULLIF(total_litres, 0) AS km_per_litre
  FROM vehicle_stats
)

SELECT
  -- 🟢 Most efficient
  (
    SELECT row_to_json(r)
    FROM ranked r
    WHERE km_per_litre IS NOT NULL
    ORDER BY km_per_litre DESC
    LIMIT 1
  ) AS most_efficient,

  -- 🔴 Least efficient
  (
    SELECT row_to_json(r)
    FROM ranked r
    WHERE km_per_litre IS NOT NULL
    ORDER BY km_per_litre ASC
    LIMIT 1
  ) AS least_efficient;`;


    return NextResponse.json(data[0] ?? null);
  } catch (error) {
    console.log(error);
    
    return NextResponse.json(
      { error: "Failed to fetch vehicle summary" },
      { status: 500 }
    );
  }
}