"use client"

import { CollegeInfoSection } from "@/components/edit-section/CollegeInfo"
import { InterestsSection } from "@/components/edit-section/InterestsSection"
import { PersonalInfoSection } from "@/components/edit-section/PersonalInfo"
import { PreferencesSection } from "@/components/edit-section/PreferencesSection"
import { PhotoGallery } from "@/components/PhotoGallery"
import { ProfileHeader } from "@/components/ProfileHeader"
import { useState } from "react"

export default function EditProfilePage() {
  const [activeSection, setActiveSection] = useState("basic")

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink to-coral">
      <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
        <ProfileHeader title="Edit Your Profile" subtitle="Make your profile stand out" />
        <div className="space-y-12">
          <PhotoGallery />
          <PersonalInfoSection />
          <CollegeInfoSection />
          <InterestsSection />
          <PreferencesSection />
        </div>
      </div>
    </div>
  )
}

