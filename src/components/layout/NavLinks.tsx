"use client"


import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = ['dashboard' ,'vehicles', 'log', 'reminders', 'reports']


export default function NavLinks() {
    const pathname = usePathname();
    const hideNavLinks = pathname.startsWith('/password')
    return (
<div className="flex gap-20">
    {!hideNavLinks && 
     <ul className="flex gap-10 items-center">
            {routes.map((route, key) => {
                return <Link key={key} className={`${pathname.startsWith("/" + route) && 'font-bold text-accent-500'}`} href={'/' + route}>
                    {route.toUpperCase()}</Link>
            })}
              </ul>}
    
            <form className={`${hideNavLinks ? "hidden": ""}`}>
                <div className="flex items-center gap-2">
<Image className="rounded-full" width={40} height={40} src={'/avatar.png'} alt="avatar" />
                <button className="cursor-pointer">Signout</button>
                </div>
                
            </form>
      
</div>
       

    )
}