"use client"

import { Button } from "@/components/ui/button"
import { Heart, Star, X } from "lucide-react"
export function ProfileActions({ userId }) {
  return (
    <div className="flex justify-center gap-4">
      <Button size="lg" variant="outline" className="rounded-full h-16 w-16 bg-background">
        <X className="w-8 h-8 text-destructive" />
      </Button>
      <Button size="lg" variant="outline" className="rounded-full h-16 w-16 bg-background">
        <Star className="w-8 h-8 text-orange" />
      </Button>
      <Button size="lg" variant="outline" className="rounded-full h-16 w-16 bg-background">
        <Heart className="w-8 h-8 text-coral" />
      </Button>
    </div>
  )
}

