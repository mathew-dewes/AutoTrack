import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function UpcomingServices({ recent_service, upcoming_service }: {
    recent_service: number, upcoming_service: number
}) {

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-semibold text-lg">Upcoming repairs</CardTitle>
                <CardDescription
                    hidden={
                        recent_service !== null && upcoming_service !== null}>
                    You have no set reminders at this time. Please create a repair entry and check set reminder</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">

                    {recent_service &&
                        <p>Last service at: {recent_service.toLocaleString()}km</p>}

                    {upcoming_service && <p>Next service due: {upcoming_service.toLocaleString()}km</p>}


                </div>

            </CardContent>
        </Card>
    )
}