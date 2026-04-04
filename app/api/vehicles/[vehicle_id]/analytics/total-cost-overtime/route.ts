
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
    CURRENT_DATE - INTERVAL '3 months',
    CURRENT_DATE,
    INTERVAL '1 day'
  )::date AS day
),
repair_daily AS (
  SELECT 
    DATE(date) AS day,
    SUM(cost) AS cost
  FROM repair_logs
  WHERE vehicle_id = ${vehicle_id}
    AND user_id = ${userId}
    AND date >= CURRENT_DATE - INTERVAL '3 months'
  GROUP BY DATE(date)
),
fuel_daily AS (
  SELECT 
    DATE(date) AS day,
    SUM(cost) AS cost
  FROM fuel_logs
  WHERE vehicle_id = ${vehicle_id}
  AND user_id = ${userId}
    AND date >= CURRENT_DATE - INTERVAL '3 months'
  GROUP BY DATE(date)
)
SELECT 
  d.day AS date,
  (
    COALESCE(r.cost, 0) + COALESCE(f.cost, 0)
  )::float AS total_cost
FROM dates d
LEFT JOIN repair_daily r ON r.day = d.day
LEFT JOIN fuel_daily f ON f.day = d.day
ORDER BY d.day ASC;`;


    return NextResponse.json(data ?? null);
  } catch (error) {
    console.log(error);
    
    return NextResponse.json(
      { error: "Failed to fetch vehicles" },
      { status: 500 }
    );
  }
}