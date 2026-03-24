"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function VehicleNavigation({vehicleId}:
    {vehicleId:string}
){
    const pathname = usePathname();



       const tabs = [
        { name: "Overview", href: `/vehicles/${vehicleId}` },
        { name: "History", href: `/vehicles/${vehicleId}/logs` },
        { name: "Fuel", href: `/vehicles/${vehicleId}/fuel` },
        { name: "Repairs", href: `/vehicles/${vehicleId}/repairs` },
        { name: "Insights", href: `/vehicles/${vehicleId}/analytics` },
    ];
    return      <div className="flex justify-between my-5">
        <div className="flex items-center gap-2">
    <Link className={cn(buttonVariants({
        variant: `${pathname == `/vehicles/${vehicleId}/logs/new/repairs` ? 'default' : 'outline'}`}))} 
        href={`/vehicles/${vehicleId}/logs/new/repairs`}>+ Log repairs</Link>
    <Link className={cn(buttonVariants({
        variant: `${pathname == `/vehicles/${vehicleId}/logs/new/fuel` ? 'default' : 'outline'}`}))} 
        href={`/vehicles/${vehicleId}/logs/new/fuel`}>+ Log fuel</Link>
        </div>

           <div className="flex gap-2">
            {tabs.map((tab, key)=>{
                    return <Link
                    key={key}
                    className={cn(
                        buttonVariants({
                            variant: `${pathname == tab.href ? 'default' : 'outline'}` }))}
                    href={tab.href}>{tab.name}</Link>
                })}
                </div>
              
              
            </div>
}