import { getVehicleOdometer } from "@/lib/db/queries/vehicle";
import RepairForm from "./_components/RepairForm";

export default async function page(
    {params}:{
        params: Promise<{vehicleId: string}>
    }
){

            const {vehicleId} = await params;
            const odometer = await getVehicleOdometer(vehicleId) as number;


            
    return (
        <div>
            <RepairForm vehicleId={vehicleId} odometer={odometer}/>
        </div>
    )
}