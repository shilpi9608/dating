import { ProfileActions } from "@/components/ProfileActions";
import { ViewProfile } from "@/components/ViewProfile";


export default function ViewProfilePage({ params }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink to-coral p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <ViewProfile userId={params.id} />
        <ProfileActions userId={params.id} />
      </div>
    </div>
  )
}

