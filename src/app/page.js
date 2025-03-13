import AboutSection from '@/components/home-page/About';
import Hero from '@/components/home-page/hero';

export default function Home() {
  return (
    <div className='min-h-screen'>
      {/* <div className="flex items-center justify-center bg-[#e9feb] h-[40rem] rounded-2xl w-full">
      <TextRevealCard
        text="You bring the spark"
        revealText="I'll make the match "
      />
    </div> */}
      <Hero />
      <AboutSection />
      <div className='min-h-screen'>Contact</div>
    </div>
  );
}
