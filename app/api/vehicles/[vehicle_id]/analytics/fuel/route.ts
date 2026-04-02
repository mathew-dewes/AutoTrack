
import { auth } from "@/lib/auth";
import { sql } from "@/lib/db/sql";

import { headers } from "next/headers";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise< { vehicle_id: string }> }) {
  const { vehicle_id } = await params;
  
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

    const data = await sql`WITH dates AS (
  SELECT generate_series(
    CURRENT_DATE - INTERVAL '29 days',
    CURRENT_DATE,
    INTERVAL '1 day'
  )::date AS date
),

fuel_segments AS (
  SELECT
    date::date AS date,
    litres,
    cost,
    odometer,

    LAG(odometer) OVER (
      PARTITION BY vehicle_id
      ORDER BY date
    ) AS prev_odometer

  FROM fuel_logs
  WHERE vehicle_id = ${vehicle_id}
  AND user_id = ${userId}
),

fuel_calculated AS (
  SELECT
    date,

    (odometer - prev_odometer) AS km_travelled,
    litres,
    cost,

    CASE 
      WHEN litres > 0 AND prev_odometer IS NOT NULL 
      THEN (odometer - prev_odometer) / litres
    END AS km_per_l,

    CASE 
      WHEN litres > 0 
      THEN cost / litres
    END AS price_per_litre,

    CASE 
      WHEN (odometer - prev_odometer) > 0
      THEN cost / (odometer - prev_odometer)
    END AS cost_per_km

  FROM fuel_segments
),

fuel_daily AS (
  SELECT
    date,
    AVG(km_per_l) AS avg_km_per_l,
    AVG(price_per_litre) AS avg_price_per_litre,
    AVG(cost_per_km) AS avg_cost_per_km
  FROM fuel_calculated
  WHERE date >= CURRENT_DATE - INTERVAL '90 days'
    AND km_travelled > 0 -- 👈 optional safety
  GROUP BY date
)

SELECT
  d.date,
  ROUND(COALESCE(f.avg_km_per_l, 0)::numeric, 2) AS km_per_l,
  ROUND(COALESCE(f.avg_price_per_litre, 0)::numeric, 2) AS price_per_litre,
  ROUND(COALESCE(f.avg_cost_per_km, 0)::numeric, 2) AS cost_per_km
FROM dates d
LEFT JOIN fuel_daily f ON d.date = f.date
ORDER BY d.date ASC;`;


    return NextResponse.json(data ?? null);
  } catch (error) {
    console.log(error);
    
    return NextResponse.json(
      { error: "Failed to fetch vehicles" },
      { status: 500 }
    );
  }
}