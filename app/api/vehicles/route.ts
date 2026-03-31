
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

    const vehicles = await sql`WITH segments AS (
  SELECT
    vehicle_id,
    date,
    litres,
    cost,
    odometer - LAG(odometer) OVER (
      PARTITION BY vehicle_id 
      ORDER BY date, odometer
    ) AS distance
  FROM fuel_logs
),

weekly AS (
  SELECT
    vehicle_id,
    DATE_TRUNC('week', date) AS week_start,
    SUM(distance) AS weekly_distance,
    SUM(cost) AS weekly_cost
  FROM segments
  WHERE distance IS NOT NULL
  GROUP BY vehicle_id, DATE_TRUNC('week', date)
),

vehicle_totals AS (
  SELECT
    vehicle_id,
    SUM(distance) AS total_distance,
    SUM(litres) AS total_litres,
    ROUND(
      SUM(distance)::numeric / NULLIF(SUM(litres), 0),
      2
    ) AS avg_km_per_litre
  FROM segments
  WHERE distance IS NOT NULL
  GROUP BY vehicle_id
),

weekly_averages AS (
  SELECT
    vehicle_id,
    ROUND(AVG(weekly_distance), 2) AS avg_weekly_distance,
    ROUND(AVG(weekly_cost), 2) AS avg_weekly_cost
  FROM weekly
  GROUP BY vehicle_id
)

SELECT
  v.id,
  v.make,
  v.model,
  v.year,
  v.current_odometer,

  vt.total_distance,
  vt.total_litres,
  vt.avg_km_per_litre,

  wa.avg_weekly_distance,
  wa.avg_weekly_cost

FROM vehicles v
LEFT JOIN vehicle_totals vt ON vt.vehicle_id = v.id
LEFT JOIN weekly_averages wa ON wa.vehicle_id = v.id
WHERE v.user_id = ${userId}
ORDER BY v.created_at DESC;`;
    

    return NextResponse.json(vehicles);
  } catch (error) {
    console.log(error);
    
    return NextResponse.json(
      { error: "Failed to fetch vehicles" },
      { status: 500 }
    );
  }
}