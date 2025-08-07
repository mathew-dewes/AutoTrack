import { getVehicles } from "@/utlis/db/vehicles";


export default async function VehcileList(){
const {vehicles, error} = await getVehicles();


if (error)return <p>Error: {error}</p>



return(
    <div className="mt-5">
        {vehicles?.map((vehicle)=>{
            return(
                <div key={vehicle.id}>
                    <p>{vehicle.model}</p>
                </div>
            )
        })}
    </div>
)
}