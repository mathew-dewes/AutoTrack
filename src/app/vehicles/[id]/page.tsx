import { prisma } from "@/lib/db";
import { service_logs } from "@/utils/data";

export default async function Page({params}:
    {params: Promise<{id: string}>}
){

    const {id} = await params;

    const vehicle = await prisma.vehicle.findUnique({
        where:{
            id: id
        },
        include: {
            serviceLogs: true,
        },
    });

    
    return(
        <div>
            <p>{vehicle?.make} {vehicle?.model}</p>
            <p>Odometer: {vehicle?.odometer}</p>
            <p>Total service reminders: {vehicle?.serviceLogs.length}</p>
            <p>Next due reminder: {vehicle?.serviceLogs[0].type} at {vehicle?.serviceLogs[0].date.toDateString()}</p>
        </div>
    )
}