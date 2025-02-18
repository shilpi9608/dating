"use client"

import  React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Upload } from "lucide-react"



export default function RegisterPage() {
  const [step, setStep] = useState("phone")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [userInfo, setUserInfo] = useState({
    name: "",
    age: "",
    gender: "",
    bio: "",
    photos: [],
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    switch (step) {
      case "phone":
        // TODO: Implement phone verification
        setStep("otp")
        break
      case "otp":
        // TODO: Verify OTP
        setStep("info")
        break
      case "info":
        setStep("photos")
        break
      case "photos":
        // TODO: Handle registration
        console.log("Register with:", { phone, userInfo })
        break
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files) {
      setUserInfo((prev) => ({
        ...prev,
        photos: [...Array.from(e.target.files || [])],
      }))
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12" style={{ backgroundColor: "#FFE6C9" }}>
      <Card className="w-[420px]">
        <CardHeader className="text-center">
          <div
            className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#FCC6FF" }}
          >
            <Heart className="w-6 h-6" style={{ color: "#FFA09B" }} />
          </div>
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>
            {step === "phone" && "Enter your phone number to get started"}
            {step === "otp" && "Enter the verification code"}
            {step === "info" && "Tell us about yourself"}
            {step === "photos" && "Add some photos to your profile"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === "phone" && (
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
            )}

            {step === "otp" && (
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

            {step === "info" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    min="18"
                    value={userInfo.age}
                    onChange={(e) => setUserInfo({ ...userInfo, age: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={userInfo.gender}
                    onValueChange={(value) => setUserInfo({ ...userInfo, gender: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    id="bio"
                    placeholder="Tell us about yourself"
                    value={userInfo.bio}
                    onChange={(e) => setUserInfo({ ...userInfo, bio: e.target.value })}
                    required
                  />
                </div>
              </>
            )}

            {step === "photos" && (
              <div className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-6 text-center" style={{ borderColor: "#FCC6FF" }}>
                  <Upload className="w-8 h-8 mx-auto mb-2" style={{ color: "#FFA09B" }} />
                  <p className="text-sm text-muted-foreground mb-2">Upload up to 6 photos</p>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    max={6}
                    onChange={handleFileChange}
                    className="hidden"
                    id="photos"
                  />
                  <Button type="button" variant="outline" onClick={() => document.getElementById("photos")?.click()}>
                    Choose Files
                  </Button>
                </div>
                {userInfo.photos.length > 0 && (
                  <p className="text-sm text-center">{userInfo.photos.length} photo(s) selected</p>
                )}
              </div>
            )}

            <Button type="submit" className="w-full" style={{ backgroundColor: "#FFA09B", color: "white" }}>
              {step === "photos" ? "Complete Registration" : "Continue"}
            </Button>
          </form>

          {step === "phone" && (
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <a href="/login" className="underline" style={{ color: "#FFA09B" }}>
                  Login
                </a>
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

