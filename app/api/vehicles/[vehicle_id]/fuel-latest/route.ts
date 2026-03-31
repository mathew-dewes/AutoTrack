
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
  date,
  cost,
  litres,
  price_per_litre,
  vendor,
  (odometer - prev_odometer)::decimal / litres AS last_km_per_litre
FROM (
  SELECT
    *,
    LAG(odometer) OVER (PARTITION BY vehicle_id ORDER BY date) AS prev_odometer
  FROM fuel_logs
  WHERE vehicle_id = ${vehicle_id} AND user_id = ${userId}
) t
ORDER BY date DESC
LIMIT 1;`;


    return NextResponse.json(data[0] ?? null);
  } catch (error) {
    console.log(error);
    
    return NextResponse.json(
      { error: "Failed to fetch vehicles" },
      { status: 500 }
    );
  }
}