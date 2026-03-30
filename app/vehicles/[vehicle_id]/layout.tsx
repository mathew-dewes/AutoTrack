import VehicleHeader from "./_components/_layout/VehicleHeader";
import VehicleNavigation from "./_components/_layout/VehicleNavigation";


export default async function VehicleLayout({
    children, params
}: {
    children: React.ReactNode, params: Promise<{vehicle_id: string}>
}) {

    const {vehicle_id} = await params;


    return (

        <div>
    <VehicleHeader vehicle_id={vehicle_id}/>
     <VehicleNavigation vehicleId={vehicle_id}/>
            {children}
        </div>

    )
}