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
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <Card className="w-full">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-xl sm:text-2xl">Profile Information</CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Update your profile information and how others see you on the platform.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 space-y-6">
          {showVerificationAlert && !isEmailVerified && (
            <Alert variant="destructive" className="w-full">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <AlertTitle className="text-sm sm:text-base">Email not verified</AlertTitle>
              <AlertDescription className="mt-2 space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
                <span className="text-sm block sm:inline">
                  Please verify your email address to access all features.
                </span>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleVerifyEmail}
                    className="w-full sm:w-auto text-xs sm:text-sm"
                  >
                    Resend verification
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowVerificationAlert(false)}
                    className="w-full sm:w-auto text-xs sm:text-sm"
                  >
                    Dismiss
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
            {/* Avatar Section - Mobile: Full width, Desktop: Fixed width */}
            <div className="flex flex-col items-center gap-3 w-full lg:w-auto lg:shrink-0">
              <Avatar className="h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28">
                <AvatarImage 
                  src={avatarPreview || "/placeholder.svg?height=96&width=96"} 
                  alt="Profile picture" 
                  className="object-cover"
                />
                <AvatarFallback className="text-lg sm:text-xl">JD</AvatarFallback>
              </Avatar>
              <div className="relative w-full max-w-xs">
                <Input 
                  type="file" 
                  id="avatar" 
                  className="sr-only" 
                  accept="image/*" 
                  onChange={handleAvatarChange} 
                />
                <Button variant="outline" size="sm" asChild className="w-full">
                  <label htmlFor="avatar" className="cursor-pointer flex items-center justify-center gap-2">
                    <Upload className="h-4 w-4" />
                    <span className="text-xs sm:text-sm">Change avatar</span>
                  </label>
                </Button>
              </div>
            </div>

            {/* Form Section - Takes remaining space */}
            <div className="w-full lg:flex-1 min-w-0">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                  {/* Name and Username Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your name" 
                              {...field} 
                              className="w-full"
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Username</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="username" 
                              {...field} 
                              className="w-full"
                            />
                          </FormControl>
                          <FormDescription className="text-xs">
                            Your unique username on the platform.
                          </FormDescription>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Email Field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm font-medium">
                          <span>Email</span>
                          {isEmailVerified ? (
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200 w-fit">
                              <Check className="h-3 w-3 mr-1" /> Verified
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200 w-fit">
                              Not verified
                            </Badge>
                          )}
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="email@example.com" 
                            {...field} 
                            className="w-full"
                            type="email"
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* Website and Location Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Website</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="https://example.com" 
                              {...field} 
                              className="w-full"
                              type="url"
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Location</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="City, Country" 
                              {...field} 
                              className="w-full"
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Bio Field */}
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Bio</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us a little bit about yourself" 
                            className="resize-none w-full min-h-[100px] sm:min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          Brief description for your profile. Maximum 160 characters.
                        </FormDescription>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full sm:w-auto min-w-[120px]"
                    >
                      {isSubmitting ? "Saving..." : "Save changes"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}