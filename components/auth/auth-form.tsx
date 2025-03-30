"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import LoginForm from "./login-form"
import RegisterForm from "./register-form"
import SocialAuth from "./social-auth"
import { Separator } from "@/components/ui/separator"

export default function AuthForm() {
    const [activeTab, setActiveTab] = useState<string>("login")

    return (
        <Card className="w-full">
            <CardHeader>
                <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="register">Register</TabsTrigger>
                    </TabsList>
                </Tabs>
            </CardHeader>
            <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsContent value="login">
                        <LoginForm />
                    </TabsContent>
                    <TabsContent value="register">
                        <RegisterForm />
                    </TabsContent>
                </Tabs>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <Separator />
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-background px-2 text-muted-foreground text-sm">Or continue with</span>
                    </div>
                </div>

                <SocialAuth />
            </CardContent>
        </Card>
    )
}

