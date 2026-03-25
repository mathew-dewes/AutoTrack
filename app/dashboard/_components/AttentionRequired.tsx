import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getUpcomingUserReminders } from "@/lib/db/queries/notification";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function AttentionRequired() {

    function getServiceStatus(distance: number) {
        if (distance < 0) {
            return {
                label: "Overdue",
                variant: "destructive",
                message: `Overdue by ${Math.abs(distance)} km`
            };
        }

        if (distance <= 1000) {
            return {
                label: "Due soon",
                variant: "secondary",
                message: `Due in ${distance} km`
            };
        }

        return {
            label: "Upcoming",
            variant: "outline",
            message: `Due in ${distance} km`
        };
    }
    const incomingReminders = await getUpcomingUserReminders();
    const checkReminders = incomingReminders.filter((reminder) => {
        return reminder.odometer_trigger > 1
    });

    const activeReminders = checkReminders.length > 0;








    return (


        <Card className="w-full max-w-3xl h-fit">
            <CardHeader>
                <CardTitle>Maintenance & Repairs</CardTitle>
                {!activeReminders &&
                    <CardDescription>You have no upcoming maintenance or repairs for your vehicles. Feel free to add them on the vehicle page and come back here to see them.</CardDescription>}

            </CardHeader>

            <CardContent>

                <div className="space-y-3">
                    {incomingReminders?.map((reminder) => {
                        if (!reminder.odometer_trigger) return
                        const status = getServiceStatus(reminder.distance_to_service);

                        return <div key={reminder.vehicle_id} className="flex gap-2 items-center">
                            <Badge variant="outline">{status.label}</Badge>
                            <div>
                                <p>{reminder.make} {reminder.model}</p>
                                <p>Service {status.message}</p>


                            </div>


                        </div>
                    })}

                </div>



            </CardContent>

            <CardFooter>
                {!activeReminders ?
                    <Link className={cn(buttonVariants(), "w-1/2")} href={'/vehicles'}>Manage vehicles</Link>
                    : <Link className={cn(buttonVariants(), "w-1/2")} href={'/'}>View services</Link>}

            </CardFooter>
        </Card>


    )
}