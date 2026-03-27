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
        { name: "Reminders", href: `/vehicles/${vehicleId}/reminders` },

    ];
    return <div className="flex justify-end my-5">
        <Link

            className={cn(
                buttonVariants({
                    variant: `${pathname == `/vehicles/${vehicleId}` ? 'default' : 'outline'}`
                }))}
            href={`/vehicles/${vehicleId}`}>Overview</Link>

        <div className="flex gap-2 mx-7">
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

             <Link

            className={cn(
                buttonVariants({
                    variant: `${pathname == `/vehicles/${vehicleId}/analytics` ? 'default' : 'outline'}`
                }))}
            href={`/vehicles/${vehicleId}/analytics`}>Analytics</Link>







    </div>
}