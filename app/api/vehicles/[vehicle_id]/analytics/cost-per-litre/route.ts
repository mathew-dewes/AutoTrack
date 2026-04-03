
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
    CURRENT_DATE - INTERVAL '89 days',
    CURRENT_DATE,
    INTERVAL '1 day'
  )::date AS date
),
fuel_data AS (
  SELECT 
    DATE(f.date) AS date,
    SUM(f.cost) AS value
  FROM fuel_logs f
  JOIN vehicles v ON f.vehicle_id = v.id
  WHERE f.date >= CURRENT_DATE - INTERVAL '90 days'
    AND f.vehicle_id = ${vehicle_id}
    AND v.user_id = ${userId}
      GROUP BY DATE(f.date)
)

SELECT 
  d.date,
  COALESCE(f.value, 0)::float AS cost
FROM dates d
LEFT JOIN fuel_data f ON f.date = d.date
ORDER BY d.date;`;


    return NextResponse.json(data ?? null);
  } catch (error) {
    console.log(error);
    
    return NextResponse.json(
      { error: "Failed to fetch vehicles" },
      { status: 500 }
    );
  }
}