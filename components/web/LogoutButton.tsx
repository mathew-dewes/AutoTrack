"use client";


import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";



export default function LogoutButton() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter()

    function logout() {
        startTransition(async () => {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Logout successful")
                        router.push("/login");
                    },
                },
            });

        })
    };

    return <Button onClick={logout} disabled={isPending}>Logout</Button>
}