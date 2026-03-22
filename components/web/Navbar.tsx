
import NavLinks from "./NavLinks";

export default function Navbar(){
    return <div className="flex justify-between items-center mt-10 w-full px-4 md:px-6 lg:px-12">
       <h1 className="text-xl font-medium">Auto<span className="text-primary font-bold">Track</span></h1>
    <NavLinks/>
    </div>
}