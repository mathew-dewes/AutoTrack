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
        { name: "Maintenance", href: `/vehicles/${vehicleId}/maintenance` },
        { name: "Insights", href: `/vehicles/${vehicleId}/analytics` },
    ];
    return      <div className="flex gap-2">
                {tabs.map((tab, key)=>{
                    return <Link
                    key={key}
                    className={cn(
                        buttonVariants({
                            variant: `${pathname == tab.href ? 'default' : 'outline'}` }))}
                    href={tab.href}>{tab.name}</Link>
                })}
              
            </div>
}