import VehicleNavigation from "./_components/VehicleNavigation"

export default async function VehicleLayout({
    children, params
}: {
    children: React.ReactNode, params: Promise<{vehicleId: string}>
}) {

    const {vehicleId} = await params;


    return (

        <main>
     <VehicleNavigation vehicleId={vehicleId}/>
            {children}
        </main>

    )
}