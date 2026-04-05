"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import LogoutButton from "./LogoutButton";
import { useState } from "react";
import { Menu, X } from "lucide-react";


const navLinks = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Vehicles', href: '/vehicles' },
    { name: '+ Add Vehicle', href: '/vehicles/new' },



]

export default function NavLinks({session}:
    {session: boolean}
){
    const pathname = usePathname();

        const [openMenu, setOpenMenu] = useState(false);

    function isActive(path: string) {
if (path === "/") return pathname === "/";
if (path === "/vehicles/new") return pathname === "/vehicles/new";
if (path === "/vehicles") return pathname.startsWith("/vehicles") && pathname !== "/vehicles/new";

  return pathname === path;
};

    const closeMenu = () => {
        setOpenMenu((prev) => !prev)
    }

return (
    <div className="relative">
    <ul className="sm:flex justify-end gap-5 items-center hidden">
        {navLinks.map((link, key)=>{
            return <Link
            hidden={session}
            key={key} className={cn(
                buttonVariants({ variant: `${isActive(link.href) ? "default" : "outline"}` }))}
                href={link.href}>
                {link.name}</Link>
        })}
    
  
              <Link hidden={!session} className={cn(buttonVariants({ variant: `${isActive('/login') ? "default" : "outline"}` }))} href={'/login'}>Login</Link>
              <Link hidden={!session} className={cn(buttonVariants({ variant: `${isActive('/register') ? "default" : "outline"}` }))} href={'/register'}>Register</Link>
                <ThemeToggle />
                <LogoutButton hide={session}/>
       </ul>

       <div>
                                   <button
                style={{ display: !session ? "" : "none" }}
                aria-controls="primary-navigation"
                aria-expanded="false"
                onClick={closeMenu}
                className={`top-10 z-9999 sm:hidden mr-4 fixed right-1 
            ${openMenu ? "hidden" : ""}`}><span className="sr-only">Menu</span>
                <Menu size={35} className="text-black dark:text-white" /></button>

                            <button
                style={{ display: !session ? "" : "none" }}
                aria-controls="primary-navigation"
                aria-expanded="false"
                onClick={() => setOpenMenu((prev) => !prev)}
                className={`top-10 z-9999 sm:hidden mr-4 fixed right-1 
            ${openMenu ? "" : "hidden"}`}><span className="sr-only">Menu</span>
                <X size={35}  className="text-black dark:text-white"/></button>
       </div>
       
    </div>

)
}