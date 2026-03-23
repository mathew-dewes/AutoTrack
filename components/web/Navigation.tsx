"use server";

import { getSession } from "@/lib/auth/session";
import NavLinks from "./NavLinks";

export default async function Navigation(){

    const session = await getSession();
    
    return <NavLinks isLoggedIn={!session}/>
 
}