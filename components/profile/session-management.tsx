"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Laptop, Smartphone, LogOut, RefreshCw } from "lucide-react"
import { refreshToken, terminateSession, terminateAllOtherSessions } from "@/app/actions/profile"

type Session = {
    id: string
    device: string
    browser: string
    location: string
    ip: string
    lastActive: string
    isCurrent: boolean
    icon: "laptop" | "smartphone"
}

export default function SessionManagement() {
    const { toast } = useToast()
    const [sessions, setSessions] = useState<Session[]>([
        {
            id: "1",
            device: "Windows 10",
            browser: "Chrome 98",
            location: "San Francisco, CA",
            ip: "192.168.1.1",
            lastActive: "Active now",
            isCurrent: true,
            icon: "laptop",
        },
        {
            id: "2",
            device: "macOS",
            browser: "Safari 15",
            location: "New York, NY",
            ip: "192.168.1.2",
            lastActive: "2 hours ago",
            isCurrent: false,
            icon: "laptop",
        },
        {
            id: "3",
            device: "iPhone 13",
            browser: "Safari Mobile",
            location: "Chicago, IL",
            ip: "192.168.1.3",
            lastActive: "1 day ago",
            isCurrent: false,
            icon: "smartphone",
        },
        {
            id: "4",
            device: "Android 12",
            browser: "Chrome Mobile",
            location: "Miami, FL",
            ip: "192.168.1.4",
            lastActive: "3 days ago",
            isCurrent: false,
            icon: "smartphone",
        },
    ])

    const [sessionTimeout, setSessionTimeout] = useState("30")
    const [autoRefreshToken, setAutoRefreshToken] = useState(true)
    const [limitConcurrentSessions, setLimitConcurrentSessions] = useState(false)

    const handleTerminateSession = async (sessionId: string) => {
        try {
            await terminateSession(sessionId)
            setSessions(sessions.filter((session) => session.id !== sessionId))
            toast({
                title: "Session terminated",
                description: "The session has been terminated successfully.",
            })
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to terminate session. Please try again.",
                variant: "destructive",
            })
        }
    }

    const handleTerminateAllOtherSessions = async () => {
        try {
            await terminateAllOtherSessions()
            setSessions(sessions.filter((session) => session.isCurrent))
            toast({
                title: "All other sessions terminated",
                description: "All other sessions have been terminated successfully.",
            })
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to terminate sessions. Please try again.",
                variant: "destructive",
            })
        }
    }

    const handleRefreshToken = async () => {
        try {
            await refreshToken()
            toast({
                title: "Token refreshed",
                description: "Your session token has been refreshed successfully.",
            })
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to refresh token. Please try again.",
                variant: "destructive",
            })
        }
    }

    const fetchActiveSessions = async () => {
        try {
            
        } catch (error) {
            console.error("Error fetching sessions:", error)
        }
    }

    useEffect(() => {
        fetchActiveSessions()
    }, [])

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Active Sessions</CardTitle>
                    <CardDescription>Manage your active sessions across different devices.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {sessions.map((session) => (
                            <div key={session.id} className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0">
                                <div className="flex gap-3">
                                    <div className="mt-1 bg-secondary rounded-md h-fit p-1">
                                        {session.icon === "laptop" ? (
                                            <Laptop className="h-5 w-5 text-primary" />
                                        ) : (
                                            <Smartphone className="h-5 w-5 text-primary" />
                                        )}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-medium">
                                                {session.device} • {session.browser}
                                            </h4>
                                            {session.isCurrent && (
                                                <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                                                    Current
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {session.location} • {session.ip}
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">{session.lastActive}</p>
                                    </div>
                                </div>
                                {!session.isCurrent && (
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                <LogOut className="h-4 w-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Terminate Session</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Are you sure you want to terminate this session? This will log out the device immediately.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleTerminateSession(session.id)}>
                                                    Terminate
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handleRefreshToken}>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Refresh token
                    </Button>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive">
                                <LogOut className="h-4 w-4 mr-2" />
                                Terminate all other sessions
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Terminate All Other Sessions</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Are you sure you want to terminate all other sessions? This will log out all devices except the
                                    current one.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleTerminateAllOtherSessions}>Terminate All</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardFooter>
            </Card>

        </div>
    )
}

