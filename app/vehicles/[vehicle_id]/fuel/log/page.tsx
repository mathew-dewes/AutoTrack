import FuelLogForm from "./_components/FuelLogForm";

export default async function page(
    {params}:{
        params: Promise<{vehicle_id: string}>
    }
){
     const {vehicle_id} = await params;
    return(
        <div>
            <FuelLogForm vehicle_id={vehicle_id} odometer={10000}/>
        </div>
    )
}