import { getVehicle } from "@/lib/db/queries/vehicle";
import VehicleHeader from "./_components/VehicleHeader";
import VehicleNavigation from "./_components/VehicleNavigation"
import { Vehicle } from "@/lib/validation/types";

export default async function VehicleLayout({
    children, params
}: {
    children: React.ReactNode, params: Promise<{vehicleId: string}>
}) {

    const {vehicleId} = await params;
    const vehicle = await getVehicle(vehicleId) as Vehicle;

    return (

        <div>
    <VehicleHeader vehicle={vehicle ?? []}/>
     <VehicleNavigation vehicleId={vehicleId}/>
            {children}
        </div>

    )
}