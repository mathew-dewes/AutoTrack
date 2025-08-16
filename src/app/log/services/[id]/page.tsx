import { prisma } from "@/lib/db";

export default async function Page({params}:
    {params: Promise<{id: string}>}
){

    const {id} = await params;
    const log = await prisma.serviceLogs.findUnique({
        where:{
            id:id
        },
    include:{
        vehicle: true
    }})



        const vehicle = log?.vehicle
        
    return(
        <div className="flex-col gap-2 mt-10 flex">
            <p><b>Date:</b> {log?.date.toDateString()}</p>
            <p><b>Vehicle:</b> {vehicle?.make} {vehicle?.model}</p>
            <p><b>Machanic:</b> {log?.machanic}</p>
            <p><b>Service type:</b> {log?.type}</p>
            <p><b>Service cost:</b> ${log?.cost}</p>
            <p><b>Odometer reading at service:</b> {log?.odometer}Km</p>
            <div>
                <p>Documents:</p>
            </div>
        </div>
    )
}