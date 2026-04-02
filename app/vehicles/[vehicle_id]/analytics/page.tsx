import Analytics from "./_components/Analytics";

export default async function page(
    {params}:{
        params: Promise<{vehicle_id: string}>
    }
){

           const {vehicle_id} = await params;
    return (
        <div>
            <Analytics vehicle_id={vehicle_id}/>
        </div>
    )
}