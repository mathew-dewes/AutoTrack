"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = ['dashboard','vehicles', 'log', 'reminders', 'reports' ]


export default function NavLinks(){
        const pathname = usePathname();       
    return(

            <ul className="flex gap-10">
                {routes.map((route, key)=>{
                    return <Link key={key} className={`${pathname === `/` + route && 'font-bold text-accent-500'}`} href={route}>{route}</Link>
                })}
            </ul>
    
    )
}