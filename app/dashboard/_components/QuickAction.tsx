import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function QuickActions(){
    return (
        <Card className="w-full col-span-full">
            <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardFooter>
                <Button>Log Fuel</Button>
                <Button>Log Repair</Button>
                <Button>Add Vehicle</Button>
            </CardFooter>
        </Card>
    )
}