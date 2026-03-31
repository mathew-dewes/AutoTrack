
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

    const vehicles = await sql`WITH vehicle_segments AS (
  SELECT
    v.id AS vehicle_id,
    f.odometer,
    f.litres,
    f.cost,
    f.date,
    f.odometer - LAG(f.odometer) OVER (PARTITION BY f.vehicle_id ORDER BY f.odometer) AS distance
  FROM vehicles v
  LEFT JOIN fuel_logs f ON f.vehicle_id = v.id
  WHERE v.user_id = 'YjQmIAXtOTT64ZzxsNA928kgSR5RuRHK'
),
vehicle_aggregates AS (
  SELECT
    vehicle_id,
    SUM(distance) AS total_distance,
    SUM(litres) AS total_litres,
    ROUND(SUM(distance)::numeric / NULLIF(SUM(litres),0), 2) AS avg_km_per_litre,
    ROUND(
      (ARRAY_AGG(distance ORDER BY odometer DESC))[1]::numeric /
      (ARRAY_AGG(litres ORDER BY odometer DESC))[1], 
      2
    ) AS last_segment_km_per_litre,
    MAX(date) AS last_fill_date
  FROM vehicle_segments
  WHERE distance > 0
  GROUP BY vehicle_id
),
last_fill AS (
  SELECT
    vehicle_id,
    litres AS last_litres,
    cost AS last_cost,
    date AS last_fill_date
  FROM (
    SELECT
      f.vehicle_id,
      f.litres,
      f.cost,
      f.date,
      ROW_NUMBER() OVER (PARTITION BY f.vehicle_id ORDER BY f.date DESC) AS rn
    FROM fuel_logs f
  ) t
  WHERE rn = 1
)
SELECT
  v.id,
  v.make,
  v.model,
  v.year,
  v.current_odometer,
  v.initial_odometer,
  va.total_distance,
  va.total_litres,
  va.avg_km_per_litre as overall_fuel_average,
  va.last_segment_km_per_litre as current_fuel_average,
  va.last_fill_date,
  lf.last_litres,
  lf.last_cost
FROM vehicles v
LEFT JOIN vehicle_aggregates va ON va.vehicle_id = v.id
LEFT JOIN last_fill lf ON lf.vehicle_id = v.id
WHERE v.user_id = ${userId}
ORDER BY v.make, v.model;`;
    

    return NextResponse.json(vehicles);
  } catch (error) {
    console.log(error);
    
    return NextResponse.json(
      { error: "Failed to fetch vehicles" },
      { status: 500 }
    );
  }
}