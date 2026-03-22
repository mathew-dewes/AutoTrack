"use client";


import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth/actions";


export default function LogoutButton(){
    const [isPending, startTransition] = useTransition();
    const router = useRouter()

    function logout(){
        startTransition(async()=>{
            const res = await signOut();

            if (res.success){
                toast.success(res.message);
                router.push('/login')
            } else {
                toast.error(res.message)
            }
        })
    };

    return <Button onClick={logout} disabled={isPending}>Logout</Button>
}