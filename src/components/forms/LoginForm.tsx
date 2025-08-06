"use client";
import { useActionState } from "react";
import SignInWithGoogleButton from "../buttons/SignInWithGoogleButton";
import Link from "next/link";
import { signInWithEmailPassword } from "@/utlis/actions/authActions";

export default function LoginForm() {

      const [state, formAction, isPending] = useActionState(signInWithEmailPassword,{
          error: '',
          success: ''
      });

         const {error} = state


  return (
    <div className="flex items-center justify-center px-4 mt-20">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
        Login
        </h2>
        <form action={formAction} className="space-y-4">
    
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[var(--color-accent-500)] text-white py-2 rounded-lg
             hover:bg-[#e45c29] hover:shadow-lg hover:scale-[1.02]
             transition-all duration-200 ease-in-out transform cursor-pointer"
             
          >
          {isPending ? "Logging in" : "Login"}
          </button>
        </form>
                {error && (
            <div className="mt-3 font-semibold text-center">
                <p className="text-red-500">Error: {error}</p>
            </div>
          )}

       <div className="mt-5">
   <p className="text-center">Dont have an account? Click <span className="text-purple-500 underline underline-offset-3"> <Link href={'/register'}>HERE</Link></span> to Register</p>
        <p className="text-center mt-2">Forgot your password? Click <span className="text-purple-500 underline underline-offset-3"> <Link href={'/password/forgot'}>HERE</Link></span> to Reset</p>
       
       </div>
                <SignInWithGoogleButton/>
      </div>
    </div>
  );
}
