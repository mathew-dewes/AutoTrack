import Vehicle from "@/components/vehicle";
import Link from "next/link";


export default async function newVehiclePage({ params }:
    { params: Promise<{ id: string }> }
) {

    const { id: vehicleId } = await params;

    
    return (
        <div>
           <Vehicle id={vehicleId}  />
           <h1>Total distance travel: 200000km</h1>
           <h1>Average weekly distance: 2000km</h1>
           <h1>Average fuel ecconomy: 14km/L</h1>
            <Link href={`/vehicles/${vehicleId}/logs`}>View logs</Link>
        </div>
    )
}