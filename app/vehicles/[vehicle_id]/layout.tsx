import VehicleHeader from "./_components/_layout/VehicleHeader";
import VehicleNavigation from "./_components/_layout/VehicleNavigation";


export default async function VehicleLayout({
    children, params
}: {
    children: React.ReactNode, params: Promise<{vehicleId: string}>
}) {

    const {vehicleId} = await params;


    return (

        <div>
    <VehicleHeader vehicle={{
        make: "Nissan", 
        model: "Skyline",
        current_odometer:134000,
        licence_plate_number: "LJT597",
        year: 2012
    }
        }/>
     <VehicleNavigation vehicleId={vehicleId}/>
            {children}
        </div>

    )
}