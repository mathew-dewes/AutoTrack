"use client";

import Link from "next/link"
import { buttonVariants } from "../ui/button"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import LogoutButton from "./LogoutButton";

const navLinks = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Vehicles', href: '/vehicles' },
    { name: '+ Add Vehicle', href: '/add' },



]

export default function NavLinks({ isLoggedIn }:
    { isLoggedIn: boolean }
) {

    const pathname = usePathname();

    function isActive(path: string) {
        if (path == "/") {
            return pathname == '/'
        }
        return pathname.startsWith(path)
    }

    return <ul className="flex justify-end gap-5 items-center">
        {!isLoggedIn &&  navLinks.map((link, key) => {
            return <Link key={key} className={cn(
                buttonVariants({ variant: `${isActive(link.href) ? "default" : "outline"}` }))}
                href={link.href}>
                {link.name}</Link>

        })}
        {isLoggedIn ?
            <Link className={cn(buttonVariants({ variant: `${isActive('/login') ? "default" : "outline"}` }))} href={'/login'}>Login</Link>
            : <LogoutButton />}

        {isLoggedIn && <Link className={cn(buttonVariants({ variant: `${isActive('/register') ? "default" : "outline"}` }))} href={'/register'}>Register</Link>}


        <ThemeToggle />



    </ul>
}