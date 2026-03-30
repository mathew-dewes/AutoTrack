import RepairTable from "./_components/RepairTable";

export default async function page(
    {params}:{
        params: Promise<{vehicle_id: string}>
    }
){

      const {vehicle_id} = await params;
    return (
        <div>
            <RepairTable vehicle_id={vehicle_id}/>
        </div>
    )
}