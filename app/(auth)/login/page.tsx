import { LoginForm } from "./_components/LoginForm";


export default function LoginPage() {
  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
