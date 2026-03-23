"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Log_type } from "@/lib/validation/enums"
import { useRouter } from "next/navigation";



export default function LogFormSelector({vehicleId}:{vehicleId: string}) {
    const router = useRouter()
    return (
        <Card className="w-full max-w-lg">
            <CardHeader>
                <CardTitle>Log type</CardTitle>
            </CardHeader>
            <CardContent>
                <Select onValueChange={(value) =>{
                    router.push(`/vehicles/${vehicleId}/logs/new?form=${value}`)
                    
                }}>
                    <SelectTrigger className="w-full max-w-48">
                        <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Types</SelectLabel>
                            {Log_type.map((type) => {
                                return <SelectItem key={type} value={type}>{type}</SelectItem>
                            })}

                        </SelectGroup>
                    </SelectContent>
                </Select>
            </CardContent>

        </Card>


    )
}