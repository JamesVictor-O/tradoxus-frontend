import AuthForm from "@/components/auth/auth-form"

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
            <div className="w-full max-w-md mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Welcome</h1>
                    <p className="text-muted-foreground mt-2">Sign in to your account or create a new one</p>
                </div>
                <AuthForm />
            </div>
        </main>
    )
}