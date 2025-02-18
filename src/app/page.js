import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";

import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle
} from "@/components/ui/text-reveal-card"
import AboutSection from "@/components/About";

export default function Home() {
  return (
    <div className="min-h-screen">
    <div className="flex items-center justify-center bg-[#e9feb] h-[40rem] rounded-2xl w-full">
      <TextRevealCard
        text="You bring the spark"
        revealText="I'll make the match "
      />
    </div>
    
    <AboutSection/>
    <div className="min-h-screen">Contact</div>
</div>

    
  );
}
