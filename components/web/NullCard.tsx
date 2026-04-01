
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function NullCard({title, description}:
    {title: string, description: string}
){
    return (
              <Card className="w-full">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription><p>{description}</p></CardDescription>
            </CardHeader>
    
     
        </Card>
    )
}