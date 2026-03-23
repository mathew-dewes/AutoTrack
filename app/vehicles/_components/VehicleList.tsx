import { getUserId } from "@/lib/auth/session";
import { getVehicles } from "@/lib/db/queries/vehicle";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function VehicleList() {

    const user_id = await getUserId();
    const data = await getVehicles(user_id);


    if (!data.vehicles){
        return <p>You have no vehicles saved. Please add</p>
    }



    return (
<div className="flex gap-5 flex-wrap">
        {data.vehicles?.map((vehicle) => {
            return <Card className="w-full max-w-sm" key={vehicle.id}>
                <CardHeader>
                    <CardTitle className="font-semibold">{vehicle.make} {vehicle.model}</CardTitle>
                    <CardDescription>{vehicle.year} - ODO: {vehicle.current_odometer}</CardDescription>
                </CardHeader>

                <CardContent>
                    <p>Total distance traveled: 20000</p>
                    <p>Average weekly fuel cost: $120</p>

                </CardContent>

                <CardFooter>
                    <Link className={cn(buttonVariants())} href={'/vehicles/' + vehicle.id}>View</Link>

                </CardFooter>

            </Card>
        })}

    </div>
    )
}