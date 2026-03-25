"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function VehicleNavigation({ vehicleId }:
    { vehicleId: string }
) {
    const pathname = usePathname();



    const tabs = [
        { name: "Reminders", href: `/vehicles/${vehicleId}/reminders` },
        { name: "Analytics", href: `/vehicles/${vehicleId}/analytics` },
    
    ];
    return <div className="flex justify-between my-5">
        <div className="flex items-center gap-2">
            <Link className={cn(buttonVariants({
                variant: `${pathname == `/vehicles/${vehicleId}/logs/new/repairs` ? 'default' : 'outline'}`
            }))}
                href={`/vehicles/${vehicleId}/logs/new/repairs`}>+ Log repairs</Link>
            <Link className={cn(buttonVariants({
                variant: `${pathname == `/vehicles/${vehicleId}/logs/new/fuel` ? 'default' : 'outline'}`
            }))}
                href={`/vehicles/${vehicleId}/logs/new/fuel`}>+ Log fuel</Link>
        </div>

        <div className="flex gap-8">

                    <div className="flex gap-1">
 <Link className={cn(
                buttonVariants({
                    variant: `${pathname == `/vehicles/${vehicleId}` ? 'default' : 'outline'}`
                }))} href={`/vehicles/${vehicleId}`}>Overview</Link>
 <Link className={cn(
                buttonVariants({
                    variant: `${pathname == `/vehicles/${vehicleId}/fuel` ? 'default' : 'outline'}`
                }))} href={`/vehicles/${vehicleId}/fuel`}>Fuel</Link>
 <Link className={cn(
                buttonVariants({
                    variant: `${pathname == `/vehicles/${vehicleId}/repairs`  ? 'default' : 'outline'}`
                }))} href={`/vehicles/${vehicleId}/repairs` }>Repairs</Link>
            </div>

                    <div className="flex gap-1">
            {tabs.map((tab, key) => {
                return <Link
                    key={key}
                    className={cn(
                        buttonVariants({
                            variant: `${pathname == tab.href ? 'default' : 'outline'}`
                        }))}
                    href={tab.href}>{tab.name}</Link>
            })}
        </div>

        </div>






    </div>
}