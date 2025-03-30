import type { Metadata } from "next"
import ProfileTabs from "@/components/profile/profile-tabs"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
    title: "Profile",
    description: "Manage your profile settings and account preferences.",
}

export default function ProfilePage() {
    return (
        <div className="container mx-auto py-10">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
                    <p className="text-muted-foreground">Manage your account settings and set your preferences.</p>
                </div>
                <Separator />
                <ProfileTabs />
            </div>
        </div>
    )
}

