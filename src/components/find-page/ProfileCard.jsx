import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';

export default function ProfileCard({ profile }) {
  // Map incoming profile data to the props our UI expects
  const imageUrl = profile.photos?.[0] || profile.image || '/placeholder.svg';
  const name = profile.personalInformation?.name || 'Unnamed';
  const age = profile.personalInformation?.age || '-';
  const major = profile.collegeInformation?.branch || 'N/A';
  const year = profile.collegeInformation?.year || '-';
  const bio = profile.about || '';
  const interests = Array.isArray(profile.interests) ? profile.interests : [];
  const id = profile._id || profile.id;

  return (
    <div className='bg-white rounded-3xl shadow-md overflow-hidden transition-all hover:shadow-lg border-2 border-pink-200 group'>
      <div className='relative'>
        <Image
          src={imageUrl}
          alt={name}
          width={400}
          height={300}
          className='w-full h-48 object-cover'
        />
        <Button
          size='icon'
          variant='outline'
          className='absolute top-2 right-2 bg-white/80 hover:bg-white hover:text-pink-600 rounded-full border-pink-200 group-hover:border-pink-400 transition-all transform hover:scale-110'
        >
          <Heart className='h-4 w-4 group-hover:fill-pink-400' />
        </Button>

        {/* Decorative corner hearts with extra cute hover effects */}
        <div className='absolute top-0 left-0 w-12 h-12 opacity-70 transform transition-transform group-hover:scale-110'>
          <Heart className='absolute top-2 left-2 w-4 h-4 fill-pink-400' />
        </div>
        <div className='absolute bottom-0 right-0 w-12 h-12 opacity-70 transform transition-transform group-hover:rotate-12'>
          <Heart className='absolute bottom-2 right-2 w-4 h-4 fill-pink-400' />
        </div>
      </div>
      <div className='p-4'>
        <div className='flex justify-between items-start mb-2'>
          <div>
            <h3 className='font-bold text-lg text-pink-600'>
              {name}, {age}
            </h3>
            <p className='text-gray-600 text-sm'>{major}</p>
          </div>
          <Badge
            variant='outline'
            className='bg-pink-100 text-pink-800 border-pink-200 rounded-full'
          >
            {year}
          </Badge>
        </div>
        <p className='text-gray-700 text-sm mb-3'>{bio}</p>
        <div className='flex flex-wrap gap-1 mb-3'>
          {interests.map((interest, index) => (
            <Badge
              key={index}
              variant='secondary'
              className='bg-purple-100 text-purple-800 text-xs rounded-full'
            >
              {interest}
            </Badge>
          ))}
        </div>
        <div className='flex justify-end'>
          <Link href={`/profile/${id}`}>
            <Button
              size='sm'
              className='bg-pink-500 hover:bg-pink-600 text-xs rounded-full transition-all'
            >
              View Profile
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
