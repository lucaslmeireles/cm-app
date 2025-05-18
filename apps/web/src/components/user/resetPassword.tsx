"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/repo/ui/components/ui/card"
import { Input } from "@/repo/ui/components/ui/input"
import { Button } from "@/repo/ui/components/ui/button"
import { Label } from "@/repo/ui/components/ui/label"
import { AlertCircle, Eye, EyeOff, Lock } from "lucide-react"
import { reset_password } from "@/fetch/user/resetPassword"
import { LoadingButton } from "@/repo/ui/components/ui/loading-button"

export default function ResetPassword({id}: {id: string}) {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [status, setStatus] = useState("idle")
  const [success, setSuccess] = useState(false)

  const handleSubmit =  async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)
    setStatus("loading")

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.")
      setStatus("error")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      setStatus("error")
      return
    }

    try {
        const data = await reset_password({password}, id)
        setStatus("success")
    } catch (e) {
        console.error(e)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto border-none">
      <CardHeader>
        <CardTitle className="text-2xl">Reset Password</CardTitle>
        <CardDescription>Enter your new password below</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <LoadingButton status={status} className="w-full" onClick={handleSubmit}>
          Reset Password
        </LoadingButton>
      </CardFooter>
    </Card>
  )
}