import { getUserId } from "@/lib/auth"

export default async function page(){

    const session = await getUserId();

    console.log(session);
    
    return (
        <p>Dashboard</p>
    )
}