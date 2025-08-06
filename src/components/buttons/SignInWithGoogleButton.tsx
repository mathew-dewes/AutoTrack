import { signinWithGoogle } from "@/utlis/actions/authActions";

export default function SignInWithGoogleButton(){
    return(
          <form className="mt-10 text-center">
                    <button className="border p-3 rounded-xl cursor-pointer" formAction={signinWithGoogle}>Login With Google</button>
                
                </form>
    )
}