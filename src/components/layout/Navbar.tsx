import Link from "next/link";
import NavLinks from "./NavLinks";




export default async function Navbar(){
  
    return(
        <div className="flex justify-between h-20 items-center mr-50">
            <Link href={'/dashboard'}><h1 className="font-bold text-xl">Auto<span className="text-accent-500">Track</span></h1></Link>
    <NavLinks/>
   
   
        </div>
    )
}