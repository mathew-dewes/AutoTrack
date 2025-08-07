
import Link from "next/link";
import NavLinks from "./NavLinks";
import { createClientForServer } from "@/utlis/supabase/server";





export default async function Navbar(){

    const supabase = await createClientForServer();
    const session = await supabase.auth.getUser();
    const avatar =  session.data.user?.user_metadata.avatar_url; 
    

      
  
    return(
        <div className="flex justify-between h-20 items-center mr-50">
            <Link href={'/'}><h1 className="font-bold text-xl">Auto<span className="text-accent-500">Track</span></h1></Link>
         {session.data.user && <NavLinks avatar={avatar}/>}
   
   
        </div>
    )
}