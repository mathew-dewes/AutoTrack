
import NavLinks from "../NavLinks";




export default function Navbar(){
  
    return(
        <div className="flex justify-between h-20 items-center mr-50">
            <h1 className="font-bold text-xl">Auto<span className="text-accent-500">Track</span></h1>
           <NavLinks/>
   
        </div>
    )
}