"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileForm from "@/components/profile/profile-form";
import SecuritySettings from "@/components/profile/security-settings";
import AccountManagement from "@/components/profile/account-management";
import SessionManagement from "@/components/profile/session-management";
import { User, Shield, Settings, Clock } from "lucide-react";

export default function ProfileTabs() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <Tabs
      defaultValue="profile"
      value={activeTab}
      onValueChange={setActiveTab}
      className="space-y-4"
    >
      <TabsList className="flex flex-wrap gap-1 w-full">
        <TabsTrigger
          value="profile"
          className="flex items-center gap-2 flex-1 min-w-0 sm:flex-none"
        >
          <User className="h-4 w-4 flex-shrink-0" />
          <span className="hidden sm:inline">Profile</span>
        </TabsTrigger>
        <TabsTrigger
          value="security"
          className="flex items-center gap-2 flex-1 min-w-0 sm:flex-none"
        >
          <Shield className="h-4 w-4 flex-shrink-0" />
          <span className="hidden sm:inline">Security</span>
        </TabsTrigger>
        <TabsTrigger
          value="sessions"
          className="flex items-center gap-2 flex-1 min-w-0 sm:flex-none"
        >
          <Clock className="h-4 w-4 flex-shrink-0" />
          <span className="hidden sm:inline">Sessions</span>
        </TabsTrigger>
        <TabsTrigger
          value="account"
          className="flex items-center gap-2 flex-1 min-w-0 sm:flex-none"
        >
          <Settings className="h-4 w-4 flex-shrink-0" />
          <span className="hidden sm:inline">Account</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <ProfileForm />
      </TabsContent>
      <TabsContent value="security">
        <SecuritySettings />
      </TabsContent>
      <TabsContent value="sessions">
        <SessionManagement />
      </TabsContent>
      <TabsContent value="account">
        <AccountManagement />
      </TabsContent>
    </Tabs>
  );
}
