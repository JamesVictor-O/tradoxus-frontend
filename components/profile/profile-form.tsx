"use client"

import type React from "react"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Check, Upload } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"

const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  bio: z.string().max(160, { message: "Bio must not be longer than 160 characters." }).optional(),
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." })
    .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores." }),
  website: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
  location: z.string().max(30, { message: "Location must not be longer than 30 characters." }).optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// Dummy updateProfile function for demonstration
const updateProfile = async (data: any) => {
  console.log("Updating profile with data:", data)
  // Simulate an API call
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return { success: true }
}

export default function ProfileForm() {
  const { toast } = useToast()
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [showVerificationAlert, setShowVerificationAlert] = useState(!isEmailVerified)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "John Doe",
      email: "john.doe@example.com",
      bio: "Software developer with a passion for building user-friendly applications.",
      username: "johndoe",
      website: "https://johndoe.com",
      location: "San Francisco, CA",
    },
  })

  async function uploadAvatar(file: File) {
    const formData = new FormData()
    formData.append("avatar", file)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/avatar`, {
        method: "POST",
        body: formData,
        // The browser will automatically set the correct Content-Type for FormData
      })

      if (!response.ok) {
        throw new Error("Failed to upload avatar")
      }

      const data = await response.json()
      return data.avatarUrl
    } catch (error) {
      console.error("Error uploading avatar:", error)
      throw error
    }
  }

  async function onSubmit(data: ProfileFormValues) {
    setIsSubmitting(true)

    try {
      // Upload avatar if there's a new one
      let avatarUrl
      if (avatarFile) {
        avatarUrl = await uploadAvatar(avatarFile)
      }

      // Update profile with avatar URL if available
      await updateProfile({
        ...data,
        avatarUrl,
      })

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    setAvatarFile(file)

    // Create a preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  function handleVerifyEmail() {
    // Simulate sending verification email
    toast({
      title: "Verification email sent",
      description: "Please check your inbox for the verification link.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Update your profile information and how others see you on the platform.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {showVerificationAlert && !isEmailVerified && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Email not verified</AlertTitle>
            <AlertDescription className="flex items-center justify-between">
              <span>Please verify your email address to access all features.</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleVerifyEmail}>
                  Resend verification
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setShowVerificationAlert(false)}>
                  Dismiss
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex flex-col items-center gap-2">
            <Avatar className="h-24 w-24">
              <AvatarImage src={avatarPreview || "/placeholder.svg?height=96&width=96"} alt="Profile picture" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="relative">
              <Input type="file" id="avatar" className="sr-only" accept="image/*" onChange={handleAvatarChange} />
              <Button variant="outline" size="sm" asChild>
                <label htmlFor="avatar" className="cursor-pointer flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Change avatar
                </label>
              </Button>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="username" {...field} />
                      </FormControl>
                      <FormDescription>Your unique username on the platform.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Email
                      {isEmailVerified ? (
                        <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                          <Check className="h-3 w-3 mr-1" /> Verified
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200">
                          Not verified
                        </Badge>
                      )}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="City, Country" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell us a little bit about yourself" className="resize-none" {...field} />
                    </FormControl>
                    <FormDescription>Brief description for your profile. Maximum 160 characters.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save changes"}
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  )
}

