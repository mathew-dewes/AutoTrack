import VehicleNavigation from "./_components/VehicleNavigation"

export default function VehicleLayout({
    children,
}: {
    children: React.ReactNode
}) {



    return (

        <main>
     <VehicleNavigation vehicleId="1"/>
            {children}
        </main>

    )
}