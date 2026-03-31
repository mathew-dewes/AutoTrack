import Overview from "./_overview/Overview";



export default async function page(
    {params}:{
        params: Promise<{vehicle_id: string}>
    }
){

         const {vehicle_id} = await params;
    return (
      <div>
     <Overview vehicle_id={vehicle_id}/>
      </div>
    )
}