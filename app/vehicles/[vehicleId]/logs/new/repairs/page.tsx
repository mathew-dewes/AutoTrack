import RepairForm from "./_components/RepairForm";

export default async function page(
    {params}:{
        params: Promise<{vehicleId: string}>
    }
){

            const {vehicleId} = await params;
    return (
        <div>
            <RepairForm vehicleId={vehicleId}/>
        </div>
    )
}