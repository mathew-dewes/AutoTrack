
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

    const data = await sql`SELECT id, vendor, vehicle_id, date, 'fuel' AS type, cost, litres, NULL AS repair_type
from fuel_logs
WHERE vehicle_id = ${vehicle_id}
AND user_id = ${userId}

UNION ALL

SELECT id, vendor, vehicle_id,  date, 'repair' as type, cost, null AS litres, type as repair_type
FROM repair_logs
WHERE vehicle_id = ${vehicle_id}

ORDER BY date DESC
LIMIT 5`;


    return NextResponse.json(data ?? null);
  } catch (error) {
    console.log(error);
    
    return NextResponse.json(
      { error: "Failed to fetch vehicles" },
      { status: 500 }
    );
  }
}