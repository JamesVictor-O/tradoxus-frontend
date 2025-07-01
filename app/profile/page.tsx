import type { Metadata } from "next"
import ProfileTabs from "@/components/profile/profile-tabs"
import {Separator}  from "@/components/ui/separator"

export const metadata: Metadata = {
    title: "Profile",
    description: "Manage your profile settings and account preferences.",
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Responsive container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 max-w-7xl">
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Header section - responsive typography */}
          <div className="space-y-2 sm:space-y-3">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Profile Settings
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400">
              Manage your account settings and set your preferences.
            </p>
          </div>
          
          <Separator />
          
          <ProfileTabs />
        </div>
      </div>
    </div>
  );
}

