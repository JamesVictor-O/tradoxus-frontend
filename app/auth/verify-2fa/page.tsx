"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { Shield } from "lucide-react"

export default function Verify2FAPage() {
    const router = useRouter()
    const [code, setCode] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleVerify = async () => {
        setIsLoading(true)
        setError(null)

        try {
            // In a real application, this would call a server action to verify the 2FA code
            // await verify2FACode(code  this would call a server action to verify the 2FA code
            // await verify2FACode(code)

            // For demo purposes, we'll simulate a successful verification
            setTimeout(() => {
                router.push("/dashboard")
            }, 1000)
        } catch (error) {
            setError("Invalid verification code. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
            <Card className="w-full max-w-md mx-auto">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <Shield className="h-12 w-12 text-primary" />
                    </div>
                    <CardTitle>Two-factor authentication</CardTitle>
                    <CardDescription>Enter the verification code to continue</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {error && <div className="p-3 bg-destructive/15 text-destructive text-sm rounded-md">{error}</div>}

                    <div className="space-y-2">
                        <Label htmlFor="code">Verification code</Label>
                        <Input
                            id="code"
                            placeholder="Enter 6-digit code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            maxLength={6}
                        />
                        <p className="text-xs text-muted-foreground">Enter the code from your authenticator app, SMS, or email</p>
                    </div>

                    <Button onClick={handleVerify} className="w-full" disabled={isLoading}>
                        {isLoading ? "Verifying..." : "Verify"}
                    </Button>
                </CardContent>
            </Card>
        </main>
    )
}

