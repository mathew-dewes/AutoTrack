import { supabase } from "@/supabase/supabase-client"

export default async function LoginPage(){

    const {data, error} = await supabase.from("test").select("*");
    if (error) throw new Error(error.message)
    console.log(data);
    
    return (
        <div>
            <p>Please Login to proceed</p>
            <h1>Login providers:</h1>
            <p>Google</p>
            <p>Github</p>
            <p>Email</p>
        </div>
    )
}