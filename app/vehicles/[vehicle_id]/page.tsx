


export default async function page(
    {params}:{
        params: Promise<{vehicleId: string}>
    }
){

         const {vehicleId} = await params;
    return (
      <div>
     <p>Overview</p>
   
      </div>
    )
}