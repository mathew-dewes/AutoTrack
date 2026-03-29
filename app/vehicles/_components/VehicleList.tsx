import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { dummy_vehicles } from "@/lib/helper";
import { cn } from "@/lib/utils";
import Link from "next/link";






export default function VehicleList(){
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {dummy_vehicles?.map((vehicle) => {
            return <Card className="w-full" key={vehicle.id}>
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