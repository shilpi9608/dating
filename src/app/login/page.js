"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Heart } from "lucide-react"

export default function LoginPage() {
  const [step, setStep] = useState("phone")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (step === "phone") {
      // TODO: Implement phone verification
      setStep("otp")
    } else {
      // TODO: Implement OTP verification and login
      console.log("Login with:", phone, otp)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FFE6C9" }}>
      <Card className="w-[380px]">
        <CardHeader className="text-center">
          <div
            className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#FCC6FF" }}
          >
            <Heart className="w-6 h-6" style={{ color: "#FFA09B" }} />
          </div>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>Login to your account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === "phone" ? (
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  required
                />
                <Button type="button" variant="link" className="p-0 h-auto font-normal" style={{ color: "#FFA09B" }}>
                  Resend OTP
                </Button>
              </div>
            )}
            <Button type="submit" className="w-full" style={{ backgroundColor: "#FFA09B", color: "white" }}>
              {step === "phone" ? "Continue" : "Login"}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <a href="/register" className="underline" style={{ color: "#FFA09B" }}>
                Sign up
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


