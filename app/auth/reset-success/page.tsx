import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function ResetSuccessPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
            <Card className="w-full max-w-md mx-auto">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <CheckCircle className="h-12 w-12 text-primary" />
                    </div>
                    <CardTitle>Password updated</CardTitle>
                    <CardDescription>Your password has been successfully updated</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <Button asChild className="w-full">
                        <Link href="/">Back to login</Link>
                    </Button>
                </CardContent>
            </Card>
        </main>
    )
}

