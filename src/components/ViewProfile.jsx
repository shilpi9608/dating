import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Verified } from "lucide-react"

export function ViewProfile({ userId }) {
  // This would normally fetch user data based on the ID
  const mockUser = {
    name: "Sarah Parker",
    age: 24,
    photos: ["/placeholder.svg?height=400&width=300"],
    verified: true,
    college: {
      year: "3rd Year",
      branch: "Computer Science",
    },
    height: "165",
    religion: "Hindu",
    lifestyle: {
      smoking: "No",
      drinking: "No",
    },
    lookingFor: "Serious Relationship",
    interestedIn: "Men",
    interests: ["Photography", "Travel", "Music", "Reading"],
    bio: "Computer Science student who loves to code and explore new places. Looking for someone who shares my passion for technology and adventure.",
    desiredQualities: "Looking for someone ambitious, kind, and with a good sense of humor.",
  }

  return (
    <Card className="w-full overflow-hidden">
      <div className="relative h-[400px]">
        <Image src={mockUser.photos[0] || "/placeholder.svg"} alt={mockUser.name} fill className="object-cover" />
      </div>
      <CardHeader className="flex flex-row items-center gap-2">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            {mockUser.name}, {mockUser.age}
            {mockUser.verified && <Verified className="w-5 h-5 text-primary" />}
          </h2>
          <p className="text-muted-foreground flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            {mockUser.college.year} • {mockUser.college.branch}
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <h3 className="text-sm font-medium">Height</h3>
            <p className="text-muted-foreground">{mockUser.height} cm</p>
          </div>
          <div>
            <h3 className="text-sm font-medium">Religion</h3>
            <p className="text-muted-foreground">{mockUser.religion}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium">Smoking</h3>
            <p className="text-muted-foreground">{mockUser.lifestyle.smoking}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium">Drinking</h3>
            <p className="text-muted-foreground">{mockUser.lifestyle.drinking}</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">About</h3>
          <p className="text-muted-foreground">{mockUser.bio}</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Looking For</h3>
          <p className="text-muted-foreground">
            {mockUser.lookingFor} • Interested in {mockUser.interestedIn}
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Desired Qualities</h3>
          <p className="text-muted-foreground">{mockUser.desiredQualities}</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Interests</h3>
          <div className="flex flex-wrap gap-2">
            {mockUser.interests.map((interest) => (
              <Badge key={interest} variant="secondary">
                {interest}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

