import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";



export default function CostBreakDown(){
    return(
                    <Card>
            <CardHeader>
                <CardTitle className="font-semibold text-lg">Cost breakdown</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                <p>Repair cost total:</p>
                <p>Fuel cost total:</p>
                <p>Conbined total:</p>
               
                </div>
              
            </CardContent>
        </Card>
    )
}