import LogList from "@/components/lists/LogList";

export default async function VehicleLogPage({ params }:
    { params: Promise<{ id: string }> }){

            const { id: vehicleId } = await params;

            console.log(vehicleId);
            

            
    return (
        <div>
            <LogList id={vehicleId}/>
        </div>
    )
}