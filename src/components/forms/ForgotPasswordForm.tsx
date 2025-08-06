"use client";
import { sendResetPasswordEmail } from "@/utlis/actions/authActions";
import Link from "next/link";
import { useActionState } from "react";

export default function ForgotPasswordForm() {

  const [state, formAction, isPending] = useActionState(sendResetPasswordEmail, {
    error: '',
    success: ''
  });

  const {error, success} = state;

  return (
    <div className="flex items-center justify-center px-4 mt-20">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
        Reset Password
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
  
          <button
          disabled={isPending}
            type="submit"
            className="w-full bg-[var(--color-accent-500)] text-white py-2 rounded-lg
             hover:bg-[#e45c29] hover:shadow-lg hover:scale-[1.02]
             transition-all duration-200 ease-in-out transform cursor-pointer"
             
          >
            {isPending ? "Processing..." : "Reset Password"}
          </button>
              {error && (
            <div>
                <p className="text-red-500">Error: {error}</p>
            </div>
          )}
          {success && (
            <div>
                <p className="text-green-400">{success}</p>
            </div>
          )}
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
        

        </p>
        <p className="text-center">Already have an account? Click <span className="text-purple-500 underline underline-offset-3"> <Link href={'/login'}>HERE</Link></span> to Login</p>
  
       
      </div>
    </div>
  );
}
