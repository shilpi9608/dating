import React from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const SideBar = ({ gossip }) => {
  return (
    <div className='fixed w-[400px] h-screen overflow-y-auto bg-custom-orange/20 p-6 border-r'>
      <Card className='bg-transparent border-none shadow-none'>
        <CardContent className='p-0'>
          <div className='flex flex-col gap-8 items-center'>
            <div className='text-center'>
              <div className='relative w-40 h-40 mx-auto mb-4'>
                <Image
                  src={gossip.person1.image || '/placeholder.svg'}
                  alt={gossip.person1.name}
                  fill
                  className='rounded-full object-cover border-4 border-custom-coral'
                />
              </div>
              <h2 className='text-2xl font-semibold mb-2'>
                {gossip.person1.name}
              </h2>
              <div className='text-lg text-muted-foreground mb-1'>
                {gossip.person1.year}
              </div>
              <div className='text-lg text-muted-foreground mb-4'>
                {gossip.person1.major}
              </div>
              <p className='text-sm mb-4'>{gossip.person1.about}</p>
              <div className='flex flex-wrap gap-2 justify-center'>
                {gossip.person1.interests.map((interest) => (
                  <span
                    key={interest}
                    className='px-3 py-1 bg-custom-coral/20 rounded-full text-xs'
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <Heart className='w-16 h-16 text-custom-coral fill-custom-coral' />

            <div className='text-center'>
              <div className='relative w-40 h-40 mx-auto mb-4'>
                <Image
                  src={gossip.person2.image || '/placeholder.svg'}
                  alt={gossip.person2.name}
                  fill
                  className='rounded-full object-cover border-4 border-custom-coral'
                />
              </div>
              <h2 className='text-2xl font-semibold mb-2'>
                {gossip.person2.name}
              </h2>
              <div className='text-lg text-muted-foreground mb-1'>
                {gossip.person2.year}
              </div>
              <div className='text-lg text-muted-foreground mb-4'>
                {gossip.person2.major}
              </div>
              <p className='text-sm mb-4'>{gossip.person2.about}</p>
              <div className='flex flex-wrap gap-2 justify-center'>
                {gossip.person2.interests.map((interest) => (
                  <span
                    key={interest}
                    className='px-3 py-1 bg-custom-coral/20 rounded-full text-xs'
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
