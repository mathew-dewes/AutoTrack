"use server"

import z from "zod";
import { loginFormSchema, registerFormSchema } from "../validation/schema";
import { createClientForServer } from "../supabase/server";

export async function loginUser(values: z.infer<typeof loginFormSchema>) {
    try {
        const parsed = loginFormSchema.safeParse(values);

        if (!parsed.success) {
            const fieldErrors: Record<string, string> = {}

            parsed.error.issues.forEach(issue => {
                fieldErrors[issue.path[0] as string] = issue.message
            })

            return {
                success: false,
                fieldErrors
            }
        }

        const supabase = await createClientForServer();

        const { data, error } = await supabase.auth.signInWithPassword({
            email: parsed.data.email,
            password: parsed.data.password
        });

        if (error) {
            console.log(error);
            
            return {
                success: false,
                error: error.message
            }
        }

  


        return {
            success: true, message: `Welcome back ${data.user.user_metadata.username ?? "User"}`
        }

    } catch (error) {
        console.error(error);
        
        return {
            success: false,
            error: "Something went wrong. Please try again."
        }


    }
};

export async function registerWithEmailPassword(values: z.infer<typeof registerFormSchema>) {

    try {
        const parsed = registerFormSchema.safeParse(values);

           if (!parsed.success) {
            const fieldErrors: Record<string, string> = {}

            parsed.error.issues.forEach(issue => {
                fieldErrors[issue.path[0] as string] = issue.message
            })

            return {
                success: false,
                fieldErrors
            }
        }

        const supabase = await createClientForServer();

        const { error } = await supabase.auth.signUp({
            email: parsed.data.email,
            password: parsed.data.password,
            options: {
                data: {
                    username: values.firstName + " " + values.lastName
                }
            }
        });

  
        if (error) {
            console.log(error);
            
            return {
                success: false,
                error: error.message
            }
        }

        return {
            success: true, message: "Please check your email"
        }




    } catch (error) {
        console.error(error)

       return {
            success: false,
            error: "Something went wrong. Please try again."
        }


    }


};

export async function signOut() {
    try {
        const supabase = await createClientForServer();
        await supabase.auth.signOut();

        return { success: true, message: 'Signout successful' }

    } catch (error) {
        console.log(error);
        return { success: false, message: 'Signout failed' }


    }

};