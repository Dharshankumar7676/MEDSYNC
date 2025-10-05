"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface QuickActionsProps {
  onChangePassword: () => void
  onUpdateEmail: () => void
  onDeleteAccount: () => void
}

export function QuickActions({
  onChangePassword,
  onUpdateEmail,
  onDeleteAccount,
}: QuickActionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common settings and actions</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button variant="secondary" className="w-full justify-start neon-border" onClick={onChangePassword}>
          Change Password
        </Button>
        <Button variant="secondary" className="w-full justify-start neon-border" onClick={onUpdateEmail}>
          Update Email
        </Button>
        <Button variant="primary" className="w-full justify-start btn-primary" onClick={onDeleteAccount}>
          Delete Account
        </Button>
      </CardContent>
    </Card>
  )
}