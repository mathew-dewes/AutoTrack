
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

    const vehicle = await sql`SELECT
  v.make,
  v.model,
  v.current_odometer,
  v.initial_odometer,
  v.current_odometer - v.initial_odometer AS distance_traveled,

  (
    SELECT SUM(f.cost)
    FROM fuel_logs f
    WHERE f.vehicle_id = v.id
  ) AS fuel_cost,

  (
    SELECT SUM(f.litres)
    FROM fuel_logs f
    WHERE f.vehicle_id = v.id
  ) AS litres_used,

  (
    SELECT SUM(r.cost)
    FROM repair_logs r
    WHERE r.vehicle_id = v.id
  ) AS repair_costs,

  (
    (v.current_odometer - v.initial_odometer) /
    NULLIF((
      SELECT SUM(f.litres)
      FROM fuel_logs f
      WHERE f.vehicle_id = v.id
    ), 0)
  ) AS km_per_litre

FROM vehicles v
WHERE v.id = ${vehicle_id}
AND v.user_id = ${userId};`;


    return NextResponse.json(vehicle[0] ?? null);
  } catch (error) {
    console.log(error);
    
    return NextResponse.json(
      { error: "Failed to fetch vehicles" },
      { status: 500 }
    );
  }
}