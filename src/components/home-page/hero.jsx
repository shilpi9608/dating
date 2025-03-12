import Link from 'next/link';
import { Button } from '../ui/button';
import FallingLeaves from './FallingLeaves';

export default function Hero() {
  return (
    <main className='relative min-h-screen overflow-hidden'>
      {/* Animated falling leaves background */}
      <FallingLeaves />

      {/* Hero section */}
      <div className='container relative z-10 px-4 mx-auto'>
        <div className='flex flex-col items-center justify-between py-12 md:flex-row md:py-24 lg:py-32'>
          <div className='max-w-md text-center md:text-left md:max-w-lg'>
            <h1 className='text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl'>
              <span className='block text-primary'>You bring the spark,</span>
              <span className='block mt-2'>I'll make the match</span>
            </h1>
            <p className='mt-6 text-lg text-muted-foreground'>
              Find your perfect match in a world where connections bloom
              naturally. Join thousands of couples who found love with us.
            </p>
            <div className='flex flex-col mt-8 space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 md:justify-start justify-center'>
              <Link href='/find'>
                <Button size='lg' className='px-8'>
                  Start matching
                </Button>
              </Link>
              <Button size='lg' variant='outline'>
                Learn more
              </Button>
            </div>
            <div className='flex items-center justify-center mt-10 space-x-6 md:justify-start'>
              <div className='text-center'>
                <p className='text-2xl font-bold'>10k+</p>
                <p className='text-sm text-muted-foreground'>Active users</p>
              </div>
              <div className='h-10 border-l'></div>
              <div className='text-center'>
                <p className='text-2xl font-bold'>5k+</p>
                <p className='text-sm text-muted-foreground'>Matches made</p>
              </div>
              <div className='h-10 border-l'></div>
              <div className='text-center'>
                <p className='text-2xl font-bold'>1k+</p>
                <p className='text-sm text-muted-foreground'>Success stories</p>
              </div>
            </div>
          </div>
          <div className='relative mt-12 md:mt-0'>
            <div className='relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96'>
              <div className='absolute top-0 right-0 w-56 h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 bg-pink-100 rounded-full'></div>
              <div className='absolute bottom-0 left-0 w-56 h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 bg-purple-100 rounded-full'></div>
              <div className='absolute inset-4 overflow-hidden bg-white rounded-lg shadow-xl'>
                <img
                  src='/homepic.jpg'
                  alt='Happy couple'
                  className='object-cover w-full h-full'
                />
              </div>
              <div className='absolute -top-4 -right-4 flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg'>
                <span className='text-2xl'>💖</span>
              </div>
              <div className='absolute -bottom-4 -left-4 flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg'>
                <span className='text-2xl'>✨</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
