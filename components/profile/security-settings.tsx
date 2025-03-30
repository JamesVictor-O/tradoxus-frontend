"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { AlertCircle, Check, X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Add imports for server actions
import { updatePassword } from "@/app/actions/profile"

const passwordSchema = z
    .object({
        currentPassword: z.string().min(1, { message: "Current password is required" }),
        newPassword: z
            .string()
            .min(8, { message: "Password must be at least 8 characters" })
            .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
            .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
            .regex(/[0-9]/, { message: "Password must contain at least one number" })
            .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })

type PasswordFormValues = z.infer<typeof passwordSchema>

export default function SecuritySettings() {
    const { toast } = useToast()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [passwordStrength, setPasswordStrength] = useState(0)
    const [showAccountLockAlert, setShowAccountLockAlert] = useState(false)
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
    const [notificationsEnabled, setNotificationsEnabled] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const form = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    })

    const watchNewPassword = form.watch("newPassword")

    // Calculate password strength whenever the password changes
    useState(() => {
        if (!watchNewPassword) {
            setPasswordStrength(0)
            return
        }

        let strength = 0

        // Length check
        if (watchNewPassword.length >= 8) strength += 20

        // Uppercase check
        if (/[A-Z]/.test(watchNewPassword)) strength += 20

        // Lowercase check
        if (/[a-z]/.test(watchNewPassword)) strength += 20

        // Number check
        if (/[0-9]/.test(watchNewPassword)) strength += 20

        // Special character check
        if (/[^A-Za-z0-9]/.test(watchNewPassword)) strength += 20

        setPasswordStrength(strength)
    })

    // Update the onSubmit function
    async function onSubmit(data: PasswordFormValues) {
        setIsSubmitting(true)
        setError(null)

        try {
            await updatePassword(data.currentPassword, data.newPassword)
            form.reset()
            setPasswordStrength(0)
            toast({
                title: "Password updated",
                description: "Your password has been updated successfully.",
            })
        } catch (error: any) {
            setError(error.message || "Failed to update password. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    function getPasswordStrengthColor() {
        if (passwordStrength < 40) return "bg-destructive"
        if (passwordStrength < 80) return "bg-yellow-500"
        return "bg-green-500"
    }

    function getPasswordStrengthText() {
        if (passwordStrength < 40) return "Weak"
        if (passwordStrength < 80) return "Medium"
        return "Strong"
    }

    // Add a function to fetch security activity
    const fetchSecurityActivity = async () => {
        try {
         
            // Update state with security activity data
        } catch (error) {
            console.error("Error fetching security activity:", error)
        }
    }

    // Add useEffect to fetch security activity on component mount
    useEffect(() => {
        fetchSecurityActivity()
    }, [])

    return (
        <div className="space-y-6">
            {showAccountLockAlert && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Account Lockout Warning</AlertTitle>
                    <AlertDescription className="flex items-center justify-between">
                        <span>
                            Multiple failed login attempts detected. Your account will be locked after 2 more failed attempts.
                        </span>
                        <Button variant="ghost" size="sm" onClick={() => setShowAccountLockAlert(false)}>
                            Dismiss
                        </Button>
                    </AlertDescription>
                </Alert>
            )}

            <Card>
                <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Update your password to keep your account secure.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="currentPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Current Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <div className="mt-2 space-y-2">
                                            <div className="space-y-1">
                                                <div className="flex justify-between text-xs">
                                                    <span>Password strength:</span>
                                                    <span
                                                        className={
                                                            passwordStrength >= 80
                                                                ? "text-green-500"
                                                                : passwordStrength >= 40
                                                                    ? "text-yellow-500"
                                                                    : "text-destructive"
                                                        }
                                                    >
                                                        {getPasswordStrengthText()}
                                                    </span>
                                                </div>
                                                <Progress value={passwordStrength} className={`h-2 ${getPasswordStrengthColor()}`} />
                                            </div>

                                            <div className="text-xs space-y-1">
                                                <div className="flex items-center gap-1">
                                                    {/[A-Z]/.test(watchNewPassword) ? (
                                                        <Check className="h-3 w-3 text-green-500" />
                                                    ) : (
                                                        <X className="h-3 w-3 text-muted-foreground" />
                                                    )}
                                                    <span className={/[A-Z]/.test(watchNewPassword) ? "text-green-500" : "text-muted-foreground"}>
                                                        At least one uppercase letter
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-1">
                                                    {/[a-z]/.test(watchNewPassword) ? (
                                                        <Check className="h-3 w-3 text-green-500" />
                                                    ) : (
                                                        <X className="h-3 w-3 text-muted-foreground" />
                                                    )}
                                                    <span className={/[a-z]/.test(watchNewPassword) ? "text-green-500" : "text-muted-foreground"}>
                                                        At least one lowercase letter
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-1">
                                                    {/[0-9]/.test(watchNewPassword) ? (
                                                        <Check className="h-3 w-3 text-green-500" />
                                                    ) : (
                                                        <X className="h-3 w-3 text-muted-foreground" />
                                                    )}
                                                    <span className={/[0-9]/.test(watchNewPassword) ? "text-green-500" : "text-muted-foreground"}>
                                                        At least one number
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-1">
                                                    {/[^A-Za-z0-9]/.test(watchNewPassword) ? (
                                                        <Check className="h-3 w-3 text-green-500" />
                                                    ) : (
                                                        <X className="h-3 w-3 text-muted-foreground" />
                                                    )}
                                                    <span
                                                        className={
                                                            /[^A-Za-z0-9]/.test(watchNewPassword) ? "text-green-500" : "text-muted-foreground"
                                                        }
                                                    >
                                                        At least one special character
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-1">
                                                    {watchNewPassword.length >= 8 ? (
                                                        <Check className="h-3 w-3 text-green-500" />
                                                    ) : (
                                                        <X className="h-3 w-3 text-muted-foreground" />
                                                    )}
                                                    <span className={watchNewPassword.length >= 8 ? "text-green-500" : "text-muted-foreground"}>
                                                        At least 8 characters long
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm New Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Updating..." : "Update password"}
                            </Button>
                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                    <CardDescription>Add an extra layer of security to your account.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <div className="font-medium">Two-factor authentication</div>
                            <div className="text-sm text-muted-foreground">Require a verification code when logging in.</div>
                        </div>
                        <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
                    </div>

                    {twoFactorEnabled && (
                        <div className="pt-2">
                            <Button variant="outline">Configure 2FA</Button>
                        </div>
                    )}

                    <Separator />

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <div className="font-medium">Security notifications</div>
                            <div className="text-sm text-muted-foreground">
                                Receive alerts about suspicious activity on your account.
                            </div>
                        </div>
                        <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Security Activity</CardTitle>
                    <CardDescription>Review recent security events on your account.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="border rounded-md">
                            <div className="p-4 border-b">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-medium">Password changed</h4>
                                        <p className="text-sm text-muted-foreground">Your password was changed successfully</p>
                                    </div>
                                    <div className="text-sm text-muted-foreground">2 days ago</div>
                                </div>
                                <div className="mt-2 text-xs text-muted-foreground">
                                    <span className="font-medium">IP Address:</span> 192.168.1.1
                                </div>
                            </div>

                            <div className="p-4 border-b">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-medium">New login</h4>
                                        <p className="text-sm text-muted-foreground">New login from Chrome on Windows</p>
                                    </div>
                                    <div className="text-sm text-muted-foreground">5 days ago</div>
                                </div>
                                <div className="mt-2 text-xs text-muted-foreground">
                                    <span className="font-medium">IP Address:</span> 192.168.1.1
                                </div>
                            </div>

                            <div className="p-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-medium text-destructive">Failed login attempt</h4>
                                        <p className="text-sm text-muted-foreground">Failed login attempt from Safari on macOS</p>
                                    </div>
                                    <div className="text-sm text-muted-foreground">1 week ago</div>
                                </div>
                                <div className="mt-2 text-xs text-muted-foreground">
                                    <span className="font-medium">IP Address:</span> 203.0.113.1 (Unknown location)
                                </div>
                            </div>
                        </div>

                        <Button variant="outline" className="w-full">
                            View all activity
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

