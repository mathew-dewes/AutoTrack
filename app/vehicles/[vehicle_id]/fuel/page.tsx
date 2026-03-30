import FuelTable from "./_components/FuelTable";

export default async function page(
    {params}:{
        params: Promise<{vehicle_id: string}>
    }
){

             const {vehicle_id} = await params;
    return (
        <div>
            <FuelTable vehicle_id={vehicle_id}/>
        </div>
    )
}