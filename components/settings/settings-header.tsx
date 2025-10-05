"use client"

import { Button } from "@/components/ui/button"

interface SettingsHeaderProps {
  onSave: () => void
  onReset: () => void
}

export function SettingsHeader({ onSave, onReset }: SettingsHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-4xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>
      <div className="flex items-center gap-4">
        <Button className="btn-primary" onClick={onSave}>
          Save Changes
        </Button>
        <Button variant="secondary" className="neon-border" onClick={onReset}>
          Reset
        </Button>
      </div>
    </div>
  )
}