
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

    const odometer = await sql`
      SELECT current_odometer,
      FROM vehicles
      where user_id = ${userId} AND vehicle_id = ${vehicle_id}

      ;
    `;


    return NextResponse.json(odometer ?? null);
  } catch (error) {
    console.log(error);
    
    return NextResponse.json(
      { error: "Failed to fetch odometer reading" },
      { status: 500 }
    );
  }
}