
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

    const data = await sql`WITH months AS (
  SELECT generate_series(
    DATE_TRUNC('month', CURRENT_DATE - INTERVAL '5 months'),
    DATE_TRUNC('month', CURRENT_DATE),
    INTERVAL '1 month'
  ) AS month_date
),
repair_monthly AS (
  SELECT 
    DATE_TRUNC('month', date) AS month_date,
    SUM(cost) AS repair_cost
  FROM repair_logs
  WHERE vehicle_id = ${vehicle_id}
  AND user_id = ${userId}
  GROUP BY DATE_TRUNC('month', date)
),
fuel_monthly AS (
  SELECT 
    DATE_TRUNC('month', date) AS month_date,
    SUM(cost) AS fuel_cost
  FROM fuel_logs
  WHERE vehicle_id = ${vehicle_id}
  AND user_id = ${userId}
  GROUP BY DATE_TRUNC('month', date)
)
SELECT 
  TO_CHAR(m.month_date, 'FMMonth') AS month,
  COALESCE(r.repair_cost, 0)::float AS repair,
  COALESCE(f.fuel_cost, 0)::float AS fuel
FROM months m
LEFT JOIN repair_monthly r ON r.month_date = m.month_date
LEFT JOIN fuel_monthly f ON f.month_date = m.month_date
ORDER BY m.month_date ASC;`;


    return NextResponse.json(data ?? null);
  } catch (error) {
    console.log(error);
    
    return NextResponse.json(
      { error: "Failed to fetch vehicles" },
      { status: 500 }
    );
  }
}