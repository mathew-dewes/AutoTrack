import { getVehicleOdometer } from "@/lib/db/queries/vehicle";
import FuelForm from "./_components/FuelForm";

export default async function page(
    {params}:{
        params: Promise<{vehicleId: string}>
    }
){

        const {vehicleId} = await params;

                 const odometer = await getVehicleOdometer(vehicleId) as number;
        
    return (
        <div>
            <FuelForm vehicleId={vehicleId} odometer={odometer}/>
        </div>
    )
}