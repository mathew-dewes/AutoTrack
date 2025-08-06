'use server'

import { redirect } from "next/navigation";
import { createClientServer } from "../supabase/server"

type OAuthProvider = 'google';
type PreviousFormState = {
    success: string | null
    error: string | null
}


const signInWith = (provider: OAuthProvider) => async () => {
    const supabase = await createClientServer();
    const auth_callback_url = `${process.env.SITE_URL}/auth/callback`;

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: auth_callback_url,
        }
    });

    if (error) throw new Error(error.message);
    console.log(data);

    redirect(data.url)


}


export const signOut = async () => {
    const supabase = await createClientServer();
    await supabase.auth.signOut();
    redirect('/login')
}


export const signUpWithEmailPassword = async (prevState: PreviousFormState, formData: FormData):
    Promise<PreviousFormState> => {
    const supabase = await createClientServer();
    const { error } = await supabase.auth.signUp({
        email: formData.get("email") as string,
        password: formData.get("password") as string
    });
    if (error) {
        console.log("error", error);
        return {
            success: null,
            error: error.message
        }
    }
    return {
        success: 'Please check your email',
        error: ''
    }
}


export const signInWithEmailPassword = async (prevState: PreviousFormState, formData: FormData):
    Promise<PreviousFormState> => {
    const supabase = await createClientServer();
    const { error } = await supabase.auth.signInWithPassword({
        email: formData.get("email") as string,
        password: formData.get("password") as string
    });
    if (error) {
        console.log("error", error);
        return {
            success: null,
            error: error.message
        }
    }
    redirect('/')
}


export const sendResetPasswordEmail = async (prevState: PreviousFormState, formData: FormData) => {
    const supabase = await createClientServer();
    const { error } = await supabase.auth.resetPasswordForEmail(formData.get('email') as string);
    if (error) {
        console.error("Error", error);
        return {
            success: "",
            error: error?.message
        }
    }

    return {
        success: 'Please check your email',
        error: ''
    }
}

export const updatePassword = async (prevState: PreviousFormState, formData: FormData) => {
    const supabase = await createClientServer();
    const { error } = await supabase.auth.updateUser({
        password: formData.get("password") as string
    });
    if (error) {
        console.log("error", error);
        return {
            success: '',
            error: error.message
        }
    }
    return {
        success: 'Password updated',
        error: ''
    }

}

export const signinWithGoogle = signInWith('google')