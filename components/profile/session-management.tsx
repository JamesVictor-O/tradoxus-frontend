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
        <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
            <Card className="w-full">
                <CardHeader className="px-4 sm:px-6">
                    <CardTitle className="text-xl sm:text-2xl">Active Sessions</CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                        Manage your active sessions across different devices.
                    </CardDescription>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                    <div className="space-y-4 sm:space-y-6">
                        {sessions.map((session) => (
                            <div 
                                key={session.id} 
                                className="flex flex-col sm:flex-row sm:items-start sm:justify-between border-b pb-4 last:border-0 last:pb-0 gap-3 sm:gap-4"
                            >
                                <div className="flex gap-3 flex-1 min-w-0">
                                    {/* Device Icon */}
                                    <div className="mt-1 bg-secondary rounded-md h-fit p-2 shrink-0">
                                        {session.icon === "laptop" ? (
                                            <Laptop className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                                        ) : (
                                            <Smartphone className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                                        )}
                                    </div>
                                    
                                    {/* Session Details */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                                            <h4 className="font-medium text-sm sm:text-base leading-tight">
                                                <span className="block sm:inline">{session.device}</span>
                                                <span className="hidden sm:inline"> • </span>
                                                <span className="block sm:inline text-muted-foreground sm:text-current">
                                                    {session.browser}
                                                </span>
                                            </h4>
                                            {session.isCurrent && (
                                                <Badge 
                                                    variant="outline" 
                                                    className="text-xs bg-green-50 text-green-700 border-green-200 w-fit shrink-0"
                                                >
                                                    Current
                                                </Badge>
                                            )}
                                        </div>
                                        
                                        {/* Location and IP */}
                                        <div className="space-y-1">
                                            <p className="text-xs sm:text-sm text-muted-foreground break-all">
                                                <span className="block sm:inline">{session.location}</span>
                                                <span className="hidden sm:inline"> • </span>
                                                <span className="block sm:inline">{session.ip}</span>
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {session.lastActive}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Action Button */}
                                {!session.isCurrent && (
                                    <div className="flex justify-end sm:justify-start shrink-0">
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm" 
                                                    className="h-8 w-8 sm:h-9 sm:w-9 p-0"
                                                >
                                                    <LogOut className="h-4 w-4" />
                                                    <span className="sr-only">Terminate session</span>
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent className="mx-4 max-w-md">
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle className="text-lg">
                                                        Terminate Session
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription className="text-sm">
                                                        Are you sure you want to terminate this session? This will log out the device immediately.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                                                    <AlertDialogCancel className="w-full sm:w-auto">
                                                        Cancel
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction 
                                                        onClick={() => handleTerminateSession(session.id)}
                                                        className="w-full sm:w-auto"
                                                    >
                                                        Terminate
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
                
                {/* Card Footer with Action Buttons */}
                <CardFooter className="px-4 sm:px-6 flex flex-col sm:flex-row gap-3 sm:justify-between">
                    <Button 
                        variant="outline" 
                        onClick={handleRefreshToken}
                        className="w-full sm:w-auto order-2 sm:order-1"
                    >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        <span className="text-sm">Refresh token</span>
                    </Button>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button 
                                variant="destructive"
                                className="w-full sm:w-auto order-1 sm:order-2"
                            >
                                <LogOut className="h-4 w-4 mr-2" />
                                <span className="text-sm">Terminate all other sessions</span>
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="mx-4 max-w-md">
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-lg">
                                    Terminate All Other Sessions
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-sm">
                                    Are you sure you want to terminate all other sessions? This will log out all devices except the current one.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                                <AlertDialogCancel className="w-full sm:w-auto">
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction 
                                    onClick={handleTerminateAllOtherSessions}
                                    className="w-full sm:w-auto"
                                >
                                    Terminate All
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardFooter>
            </Card>
        </div>
    )
}