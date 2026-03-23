
import { Suspense } from "react";
import Navigation from "./Navigation";

export default async function Navbar() {



    return <div className="flex justify-between items-center mt-10 w-full px-4 md:px-6 lg:px-12">
               <h1 className="text-xl font-medium">Auto<span className="text-primary font-bold">Track</span></h1>
                 <Suspense fallback={'Loading Nav'}>
            <Navigation />
                 </Suspense>
              
            </div>
        

}