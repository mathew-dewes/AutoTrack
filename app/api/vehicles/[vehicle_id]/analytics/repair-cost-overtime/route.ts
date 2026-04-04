
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
)
SELECT 
  d.day AS date,
  COALESCE(SUM(r.cost), 0)::float AS cost
FROM dates d
LEFT JOIN repair_logs r 
  ON DATE(r.date) = d.day
  AND r.vehicle_id = ${vehicle_id}
  AND user_id = ${userId}
GROUP BY d.day
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