
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

    const data = await sql`WITH dates AS (
  SELECT generate_series(
    CURRENT_DATE - INTERVAL '89 days',
    CURRENT_DATE,
    INTERVAL '1 day'
  )::date AS date
),

fuel AS (
  SELECT 
    date::date AS date,
   SUM(cost)::float AS fuel_cost
  FROM fuel_logs
  WHERE date >= CURRENT_DATE - INTERVAL '90 days'
  AND user_id = ${userId}

  GROUP BY date::date
),

repairs AS (
  SELECT 
    date::date AS date,
   SUM(cost)::float AS repair_cost
  FROM repair_logs
  WHERE date >= CURRENT_DATE - INTERVAL '90 days'
   AND user_id = ${userId}


  GROUP BY date::date
)

SELECT 
  d.date,
  COALESCE(f.fuel_cost, 0) AS fuel_cost,
  COALESCE(r.repair_cost, 0) AS repair_cost
FROM dates d
LEFT JOIN fuel f ON d.date = f.date
LEFT JOIN repairs r ON d.date = r.date
ORDER BY d.date ASC;`;


    return NextResponse.json(data ?? null);
  } catch (error) {
    console.log(error);
    
    return NextResponse.json(
      { error: "Failed to fetch vehicle summary" },
      { status: 500 }
    );
  }
}