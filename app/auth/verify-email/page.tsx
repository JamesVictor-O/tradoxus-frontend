import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function VerifyEmailPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
            <Card className="w-full max-w-md mx-auto">
                <CardHeader className="text-center">
                    <CardTitle>Check your email</CardTitle>
                    <CardDescription>We've sent a verification link to your email address</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-center">
                    <p className="text-sm text-muted-foreground">
                        Click the link in the email to verify your account. If you don't see the email, check your spam folder.
                    </p>
                    <div className="flex flex-col space-y-2">
                        <Button asChild variant="outline">
                            <Link href="/">Back to login</Link>
                        </Button>
                        <Button variant="link">Resend verification email</Button>
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}

