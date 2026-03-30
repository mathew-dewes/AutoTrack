import RepairLogForm from "./_components/RepairLogForm";

export default async function page(
    {params}:{
        params: Promise<{vehicle_id: string}>
    }
){

         const {vehicle_id} = await params;
    return(
        <div>
            <RepairLogForm vehicle_id={vehicle_id} odometer={1000}/>
        </div>
    )
}