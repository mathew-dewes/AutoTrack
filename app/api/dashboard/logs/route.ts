
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

    const data = await sql`WITH fuel AS (
  SELECT
  f.date,
  v.make,
  v.model,
  v.licence_plate_number,
  f.vendor,
  f.litres,
  f.cost
  
  FROM fuel_logs f
  JOIN vehicles v ON vehicle_id = v.id
    WHERE v.user_id = ${userId}
  ORDER BY f.date DESC
),
repairs AS (
  SELECT 
  r.date,
  v.make,
  v.model,
  v.licence_plate_number,
  r.type,
  r.vendor,
  r.cost
  
  
  FROM repair_logs r
    JOIN vehicles v ON vehicle_id = v.id
      WHERE v.user_id = ${userId}
    ORDER BY r.date DESC
)
SELECT
  (SELECT json_agg(fuel) FROM fuel) AS fuel_logs,
  (SELECT json_agg(repairs) FROM repairs) AS repair_logs;`;


    return NextResponse.json(data[0] ?? null);
  } catch (error) {
    console.log(error);
    
    return NextResponse.json(
      { error: "Failed to fetch vehicle summary" },
      { status: 500 }
    );
  }
}