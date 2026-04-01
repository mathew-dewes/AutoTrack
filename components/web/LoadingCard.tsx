
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";

export default function LoadingCard(){
    return (
           <Card className={`w-full h-60`}>
      <CardHeader>
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-25 w-full" />
      </CardContent>
  
    </Card>
    )
}