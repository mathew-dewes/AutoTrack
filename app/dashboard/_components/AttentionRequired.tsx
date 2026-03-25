import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function AttentionRequired() {
    return (
        <div>
            <h2>Attention required:</h2>
            <Card className="w-full max-w-3xl mt-5">
                <CardHeader>
                    <CardTitle>Maintenance & Repairs</CardTitle>
                </CardHeader>
                <CardContent>

                    <div className="space-y-3">
                        <div className="flex gap-2 items-center">
                            <Badge variant="destructive">Overdue</Badge>
                            <p>Lorem ipsum dolor sit amet.</p>

                        </div>
                        <div className="flex gap-2 items-center">
                            <Badge variant="secondary">Due soon</Badge>
                            <p>Lorem ipsum dolor sit amet.</p>

                        </div>
                        <div className="flex gap-2 items-center">
                            <Badge variant="outline">Upcoming</Badge>
                            <p>Lorem ipsum dolor sit amet.</p>

                        </div>

                    </div>



                </CardContent>

                <CardFooter className="flex justify-end">
                    <Button className="w-1/2">View upcoming services</Button>
                </CardFooter>
            </Card>
        </div>

    )
}