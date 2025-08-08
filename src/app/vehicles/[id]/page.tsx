import Vehicle from "@/components/vehicle";


export default async function newVehiclePage({ params }:
    { params: Promise<{ id: string }> }
) {

    const { id: vehicleId } = await params;

    
    return (
        <div>
           <Vehicle id={vehicleId}  />
        </div>
    )
}