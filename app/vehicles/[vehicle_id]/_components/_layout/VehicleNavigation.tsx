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
        { name: "Fuel", href: `/vehicles/${vehicleId}/fuel` },
        { name: "Repairs", href: `/vehicles/${vehicleId}/repairs` },

    ];
    return <div className="flex justify-between my-5">
        <div className="flex items-center gap-2">
            <Link className={cn(buttonVariants({
                variant: `${pathname == `/vehicles/${vehicleId}/repairs/log` ? 'default' : 'outline'}`
            }))}
                href={`/vehicles/${vehicleId}/repairs/log`}>+ Log repairs</Link>
            <Link className={cn(buttonVariants({
                variant: `${pathname == `/vehicles/${vehicleId}/fuel/log` ? 'default' : 'outline'}`
            }))}
                href={`/vehicles/${vehicleId}/fuel/log`}>+ Log fuel</Link>
        </div>

        <div className="flex gap-2">
            {tabs.map((tab, key) => {
                return <Link
                    key={key}
                    className={cn(
                        buttonVariants({
                            variant: `${pathname == tab.href ? 'default' : 'outline'}`
                        }))}
                    href={tab.href}>{tab.name}</Link>
            })}
            <Link

            className={cn(
                buttonVariants({
                    variant: `${pathname == `/vehicles/${vehicleId}/analytics` ? 'default' : 'outline'}`
                }))}
            href={`/vehicles/${vehicleId}/analytics`}>Analytics</Link>
        </div>




        







    </div>
}