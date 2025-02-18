import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EditableField } from "@/components/EditableField"

export function PreferencesSection() {
  const preferences = {
    lookingFor: "Serious Relationship",
    interestedIn: "Men",
    desiredQualities: "Ambitious, kind, and with a good sense of humor",
  }

  const handleSave = (field, value) => {
    console.log(`Saving ${field}: ${value}`)
    // In a real app, you'd send this to your backend
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <EditableField
          label="Looking For"
          value={preferences.lookingFor}
          onSave={(value) => handleSave("lookingFor", value)}
        />
        <EditableField
          label="Interested In"
          value={preferences.interestedIn}
          onSave={(value) => handleSave("interestedIn", value)}
        />
        <EditableField
          label="Desired Qualities"
          value={preferences.desiredQualities}
          onSave={(value) => handleSave("desiredQualities", value)}
        />
      </CardContent>
    </Card>
  )
}

