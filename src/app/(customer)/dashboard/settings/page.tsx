"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { NIGERIAN_STATES } from "@/components/shared/NigeriaData"
import { User, Lock } from "lucide-react"

const MOCK_USER = {
  full_name: "Kemi Adebayo",
  email: "kemi@example.com",
  phone: "+2348012345678",
  state: "Lagos",
}

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    full_name: MOCK_USER.full_name,
    email: MOCK_USER.email,
    phone: MOCK_USER.phone,
    state: MOCK_USER.state,
  })

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  })

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Settings saved successfully")
  }

  const handlePasswordSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (passwords.new !== passwords.confirm) {
      toast.error("New passwords do not match")
      return
    }
    if (passwords.new.length < 8) {
      toast.error("Password must be at least 8 characters")
      return
    }
    toast.success("Password updated successfully")
    setPasswords({ current: "", new: "", confirm: "" })
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-secondary">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your account information and security</p>
      </div>

      {/* Profile Section */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
          <h2 className="text-base font-semibold text-secondary">Profile Information</h2>
        </div>

        <form onSubmit={handleProfileSave} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={profile.full_name}
              onChange={(e) => setProfile((p) => ({ ...p, full_name: e.target.value }))}
              placeholder="Your full name"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              readOnly
              className="bg-gray-50 cursor-not-allowed opacity-70"
            />
            <p className="text-xs text-gray-400">Email address cannot be changed</p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
              placeholder="+2348012345678"
            />
          </div>

          <div className="space-y-1.5">
            <Label>State</Label>
            <Select
              value={profile.state}
              onValueChange={(val) => setProfile((p) => ({ ...p, state: val ?? p.state }))}
            >
              <SelectTrigger className="w-full h-9">
                <SelectValue placeholder="Select your state" />
              </SelectTrigger>
              <SelectContent>
                {NIGERIAN_STATES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Save Profile
            </Button>
          </div>
        </form>
      </div>

      {/* Password Section */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Lock className="w-4 h-4 text-primary" />
          </div>
          <h2 className="text-base font-semibold text-secondary">Change Password</h2>
        </div>

        <form onSubmit={handlePasswordSave} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="currentPwd">Current Password</Label>
            <Input
              id="currentPwd"
              type="password"
              value={passwords.current}
              onChange={(e) => setPasswords((p) => ({ ...p, current: e.target.value }))}
              placeholder="Enter current password"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="newPwd">New Password</Label>
            <Input
              id="newPwd"
              type="password"
              value={passwords.new}
              onChange={(e) => setPasswords((p) => ({ ...p, new: e.target.value }))}
              placeholder="Enter new password"
            />
            <p className="text-xs text-gray-400">Minimum 8 characters</p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="confirmPwd">Confirm New Password</Label>
            <Input
              id="confirmPwd"
              type="password"
              value={passwords.confirm}
              onChange={(e) => setPasswords((p) => ({ ...p, confirm: e.target.value }))}
              placeholder="Confirm new password"
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90"
              disabled={!passwords.current || !passwords.new || !passwords.confirm}
            >
              Update Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
