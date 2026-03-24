import FuelForm from "./_components/FuelForm";

export default async function page(
    {params}:{
        params: Promise<{vehicleId: string}>
    }
){

        const {vehicleId} = await params;
    return (
        <div>
            <FuelForm vehicleId={vehicleId}/>
        </div>
    )
}