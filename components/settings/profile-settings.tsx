"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ProfileSettingsProps {
  darkMode: boolean
  onDarkModeChange: (checked: boolean) => void
  notifications: boolean
  onNotificationsChange: (checked: boolean) => void
}

export function ProfileSettings({
  darkMode,
  onDarkModeChange,
  notifications,
  onNotificationsChange,
}: ProfileSettingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Update your profile details and preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between space-x-4">
          <Label htmlFor="notifications">Enable Notifications</Label>
          <Switch
            id="notifications"
            checked={notifications}
            onCheckedChange={onNotificationsChange}
          />
        </div>
        <div className="flex items-center justify-between space-x-4">
          <Label htmlFor="darkMode">Dark Mode</Label>
          <Switch 
            id="darkMode" 
            checked={darkMode}
            onCheckedChange={onDarkModeChange}
          />
        </div>
      </CardContent>
    </Card>
  )
}