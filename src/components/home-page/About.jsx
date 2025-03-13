import Image from 'next/image';
import { Star, CircleDot } from 'lucide-react';
import { FeaturesSection } from './Features';

export default function AboutSection() {
  return (
    <div className='min-h-screen w-full' style={{ backgroundColor: '#FFE6C9' }}>
      <div className='container mx-auto px-4 py-16 space-y-16'>
        {/* Header with decorative elements */}
        <div className='relative text-center mb-20'>
          <div className='absolute -top-8 right-1/4 transform rotate-12'>
            <Star className='w-6 h-6' style={{ color: '#FFC785' }} />
          </div>
          <div className='absolute top-0 right-1/3'>
            <CircleDot className='w-4 h-4' style={{ color: '#FFA09B' }} />
          </div>
          <h1 className='text-4xl md:text-5xl font-bold mb-4 text-secondaryBtn'>
            About us
          </h1>
          <p className='text-lg max-w-2xl mx-auto' style={{ color: '#666' }}>
            Discover meaningful connections in a safe and engaging environment.
            We're here to help you find your perfect match.
          </p>
        </div>

        {/* Image Grid */}
        <FeaturesSection />

        {/* Feature Section */}
        <div className='grid md:grid-cols-2 gap-16 pt-16'>
          <div>
            <h2 className='text-3xl font-bold mb-6 text-primaryBtn text-opacity-60'>
              We make finding love easier & more natural
            </h2>
            <p className='text-gray-600 leading-relaxed'>
              Our platform uses advanced matching algorithms and thoughtful
              design to create an environment where genuine connections can
              flourish. We understand that finding the right person is about
              more than just swiping - it's about creating meaningful
              interactions.
            </p>
          </div>
          <div className='space-y-6'>
            <div
              className='p-6 rounded-2xl bg-secondaryBtn bg-opacity-30'
              style={{ backgroundColor: '#FCC6FF20' }}
            >
              <h3 className='font-semibold mb-2 text-primaryBtn text-opacity-60'>
                Smart Matching
              </h3>
              <p className='text-gray-600'>
                Our intelligent algorithm learns your preferences to suggest the
                most compatible matches.
              </p>
            </div>
            <div
              className='p-6 rounded-2xl bg-primaryBtn bg-opacity-30'
              style={{ backgroundColor: '#FFC78520' }}
            >
              <h3 className='font-semibold mb-2 text-primaryBtn text-opacity-60'>
                Safe & Secure
              </h3>
              <p className='text-gray-600'>
                Your privacy and security are our top priorities. Feel confident
                while connecting with others.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
