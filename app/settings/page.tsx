"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SettingsHeader } from "@/components/settings/settings-header"
import { ProfileSettings } from "@/components/settings/profile-settings"
import { QuickActions } from "@/components/settings/quick-actions"
import { AppearanceSettings } from "@/components/settings/appearance-settings"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { SecuritySettings } from "@/components/settings/security-settings"

export default function SettingsPage() {
  // State management
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)

  // Event handlers
  const handleSave = () => {
    // Implement save functionality
    console.log("Saving changes...")
  }

  const handleReset = () => {
    // Implement reset functionality
    setDarkMode(false)
    setNotifications(true)
  }

  const handleChangePassword = () => {
    // Implement change password
    console.log("Changing password...")
  }

  const handleUpdateEmail = () => {
    // Implement email update
    console.log("Updating email...")
  }

  const handleDeleteAccount = () => {
    // Implement account deletion
    console.log("Deleting account...")
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col gap-8">
        <SettingsHeader onSave={handleSave} onReset={handleReset} />

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6 mt-6">
            <ProfileSettings
              darkMode={darkMode}
              onDarkModeChange={setDarkMode}
              notifications={notifications}
              onNotificationsChange={setNotifications}
            />
            <QuickActions
              onChangePassword={handleChangePassword}
              onUpdateEmail={handleUpdateEmail}
              onDeleteAccount={handleDeleteAccount}
            />
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6 mt-6">
            <AppearanceSettings />
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6 mt-6">
            <NotificationSettings />
          </TabsContent>

          <TabsContent value="security" className="space-y-6 mt-6">
            <SecuritySettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
  
  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">Settings</h1>
            <p className="text-muted-foreground">Manage your account settings and preferences</p>
          </div>
          <div className="flex items-center gap-4">
            <Button className="btn-primary">Save Changes</Button>
            <Button variant="secondary" className="neon-border">Reset</Button>
          </div>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your profile details and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between space-x-4">
                  <Label htmlFor="notifications">Enable Notifications</Label>
                  <Switch id="notifications" />
                </div>
                <div className="flex items-center justify-between space-x-4">
                  <Label htmlFor="darkMode">Dark Mode</Label>
                  <Switch 
                    id="darkMode" 
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common settings and actions</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Button variant="secondary" className="w-full justify-start neon-border">
                  Change Password
                </Button>
                <Button variant="secondary" className="w-full justify-start neon-border">
                  Update Email
                </Button>
                <Button variant="primary" className="w-full justify-start btn-primary">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Theme Settings</CardTitle>
                <CardDescription>Customize your visual experience</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Theme settings content */}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage your notification settings</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Notification settings content */}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your security preferences</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Security settings content */}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
