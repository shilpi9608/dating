"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera, GraduationCap, Heart, Sparkles, User } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


export function EditProfileForm({ activeSection, onSectionChange }) {
  const [interests, setInterests] = useState(["Travel", "Music", "Sports", "Reading"])

  return (
    <Card className="w-full">
      <CardHeader>
        <Tabs value={activeSection} onValueChange={onSectionChange}>
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="basic" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Basic Info
            </TabsTrigger>
            <TabsTrigger value="college" className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              College
            </TabsTrigger>
            <TabsTrigger value="photos" className="flex items-center gap-2">
              <Camera className="w-4 h-4" />
              Photos
            </TabsTrigger>
            <TabsTrigger value="interests" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Interests
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Preferences
            </TabsTrigger>
          </TabsList>
        
          <CardContent>
            <TabsContent value="basic" className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" type="number" placeholder="Your age" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input id="height" type="number" placeholder="Your height" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Religion</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your religion" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hindu">Hindu</SelectItem>
                      <SelectItem value="muslim">Muslim</SelectItem>
                      <SelectItem value="christian">Christian</SelectItem>
                      <SelectItem value="sikh">Sikh</SelectItem>
                      <SelectItem value="buddhist">Buddhist</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Lifestyle Choices</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Smoking</Label>
                      <RadioGroup defaultValue="no" className="flex gap-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="smoking-yes" />
                          <Label htmlFor="smoking-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="smoking-no" />
                          <Label htmlFor="smoking-no">No</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="space-y-2">
                      <Label>Drinking</Label>
                      <RadioGroup defaultValue="no" className="flex gap-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="drinking-yes" />
                          <Label htmlFor="drinking-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="drinking-no" />
                          <Label htmlFor="drinking-no">No</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="college" className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="year">Year of Study</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1st Year</SelectItem>
                      <SelectItem value="2">2nd Year</SelectItem>
                      <SelectItem value="3">3rd Year</SelectItem>
                      <SelectItem value="4">4th Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="branch">Branch/Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your branch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cse">Computer Science</SelectItem>
                      <SelectItem value="it">Information Technology</SelectItem>
                      <SelectItem value="ece">Electronics & Communication</SelectItem>
                      <SelectItem value="ee">Electrical Engineering</SelectItem>
                      <SelectItem value="me">Mechanical Engineering</SelectItem>
                      <SelectItem value="ce">Civil Engineering</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="photos" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center relative group cursor-pointer hover:border-primary"
                  >
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                    <Camera className="w-8 h-8 text-muted-foreground/25 group-hover:text-primary" />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="interests" className="space-y-4">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <Badge
                      key={interest}
                      variant="secondary"
                      className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Add new interest" />
                  <Button>Add</Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label>Looking For</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="What are you looking for?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="casual">Casual Dating</SelectItem>
                      <SelectItem value="serious">Serious Relationship</SelectItem>
                      <SelectItem value="friendship">Friendship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Interested In</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="men">Men</SelectItem>
                      <SelectItem value="women">Women</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Desired Qualities</Label>
                  <Textarea placeholder="What qualities are you looking for in a partner?" className="min-h-[100px]" />
                </div>
                <div className="grid gap-2">
                  <Label>About Me</Label>
                  <Textarea placeholder="Tell others about yourself..." className="min-h-[100px]" />
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </CardHeader>
    </Card>
  )
}