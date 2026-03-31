
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

    const data = await sql`SELECT
  latest.id,
  latest.date AS date,
  latest.type AS type,
  latest.cost AS cost,
  
  counts.total_count,
  popular.most_common_type

FROM (
  SELECT *
  FROM repair_logs
  WHERE vehicle_id = ${vehicle_id} 
  AND user_id = ${userId}
  ORDER BY date DESC
  LIMIT 1
) latest

CROSS JOIN LATERAL (
  SELECT COUNT(*) AS total_count
  FROM repair_logs
  WHERE vehicle_id = ${vehicle_id}
) counts

CROSS JOIN LATERAL (
  SELECT type AS most_common_type
  FROM repair_logs
  WHERE vehicle_id = ${vehicle_id}
  GROUP BY type
  ORDER BY COUNT(*) DESC
  LIMIT 1
) popular;`;


    return NextResponse.json(data[0] ?? null);
  } catch (error) {
    console.log(error);
    
    return NextResponse.json(
      { error: "Failed to fetch vehicles" },
      { status: 500 }
    );
  }
}