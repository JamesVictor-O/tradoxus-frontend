"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Download, Trash2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Add imports for server actions
import { exportUserData, deleteAccount } from "@/app/actions/profile"

export default function AccountManagement() {
  const { toast } = useToast()
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)
  const [deleteConfirmation, setDeleteConfirmation] = useState("")

  // Update the handleExportData function
  const handleExportData = async () => {
    setIsExporting(true)
    setExportProgress(0)

    try {
      // Start the export process
      const { downloadUrl } = await exportUserData("current-user-id")

      // Simulate progress for better UX
      const interval = setInterval(() => {
        setExportProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)

            // Trigger download when complete
            const link = document.createElement("a")
            link.href = downloadUrl
            link.download = "user_data_export.zip"
            link.click()

            setIsExporting(false)
            toast({
              title: "Data exported",
              description: "Your data has been exported successfully.",
            })

            return 100
          }
          return prev + 10
        })
      }, 300)
    } catch (error) {
      setIsExporting(false)
      toast({
        title: "Error",
        description: "Failed to export data. Please try again.",
        variant: "destructive",
      })
    }
  }

  const isDeleteButtonDisabled = deleteConfirmation !== "DELETE"

  // Update the delete account functionality
  const handleDeleteAccount = async () => {
    try {
      await deleteAccount("current-user-id")
      // The server action will handle the redirect
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete account. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Data Export</CardTitle>
          <CardDescription>Export all your personal data in compliance with GDPR.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">You can request a copy of your personal data, including:</p>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>Profile information</li>
            <li>Account activity</li>
            <li>Login history</li>
            <li>Preferences and settings</li>
            <li>Content you've created</li>
          </ul>

          {isExporting && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Preparing export...</span>
                <span>{exportProgress}%</span>
              </div>
              <Progress value={exportProgress} className="h-2" />
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleExportData} disabled={isExporting} className="w-full">
            <Download className="h-4 w-4 mr-2" />
            {isExporting ? "Preparing export..." : "Export my data"}
          </Button>
        </CardFooter>
      </Card>

      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Delete Account</CardTitle>
          <CardDescription>Permanently delete your account and all associated data.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">This action is irreversible. Once you delete your account:</p>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>All your personal data will be permanently deleted</li>
            <li>You will lose access to all your content</li>
            <li>Your username will be available for others to use</li>
            <li>You will be logged out of all devices</li>
          </ul>

          <Separator />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove all your data from
                  our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="space-y-2 py-2">
                <Label htmlFor="confirm" className="text-sm font-medium">
                  Type DELETE to confirm
                </Label>
                <Input
                  id="confirm"
                  value={deleteConfirmation}
                  onChange={(e) => setDeleteConfirmation(e.target.value)}
                  placeholder="DELETE"
                />
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setDeleteConfirmation("")}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  disabled={isDeleteButtonDisabled}
                  onClick={handleDeleteAccount}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  )
}

