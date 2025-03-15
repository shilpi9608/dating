import React from 'react';

import { Search, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';
import Link from 'next/link';

export default function SearchPage() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 relative overflow-hidden'>
      {/* Extra ultra-cute decorative overlay */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        {/* Floating hearts */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`heart-${i}`}
            className='absolute animate-float opacity-20'
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 20}s`,
            }}
          >
            <Heart
              fill='#ff6b9d'
              color='#ff6b9d'
              size={10 + Math.random() * 20}
            />
          </div>
        ))}

        {/* Floating flower elements */}
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={`flower-${i}`}
            className='absolute animate-float opacity-20'
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 20}s`,
            }}
          >
            <div className='text-2xl'>🌸</div>
          </div>
        ))}

        {/* Sparkling confetti falling from the top */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`confetti-${i}`}
            className='absolute animate-confetti opacity-70'
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${12 + Math.random() * 10}px`,
            }}
          >
            {['🍭', '💖', '🍬'][Math.floor(Math.random() * 3)]}
          </div>
        ))}

        {/* Extra sparkles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className='absolute animate-pulse opacity-30'
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            <div className='text-xl'>✨</div>
          </div>
        ))}

        {/* Floating bouncing stars */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={`star-${i}`}
            className='absolute animate-bounce opacity-40'
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            <div className='text-3xl'>⭐</div>
          </div>
        ))}
      </div>

      <div className='container mx-auto px-4 py-8 relative z-10'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-center text-pink-600 mb-2 relative inline-block'>
            Find Your Campus Match
            <div className="absolute -bottom-2 left-0 right-0 h-2 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%2010%22%3E%3Cpath%20fill%3D%22none%22%20stroke%3D%22%23ff6b9d%22%20stroke-width%3D%222%22%20d%3D%22M0%2C5%20Q25%2C0%2050%2C5%20T100%2C5%22%2F%3E%3C%2Fsvg%3E')] bg-repeat-x"></div>
          </h1>
          <p className='text-center text-gray-600 mb-2'>
            Discover amazing people right on your campus
          </p>
          <div className='flex justify-center gap-1'>
            <Heart size={16} className='text-pink-400 fill-pink-400' />
            <Heart size={16} className='text-pink-400 fill-pink-400' />
            <Heart size={16} className='text-pink-400 fill-pink-400' />
          </div>
        </div>

        {/* Search Section */}
        <div className='bg-white rounded-3xl shadow-md p-6 mb-8 border-2 border-pink-200 relative overflow-hidden'>
          <div className='absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300'></div>
          <div className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300'></div>

          <div className='flex flex-col md:flex-row gap-4 mb-6'>
            <div className='relative flex-1'>
              <Search className='absolute left-3 top-3 h-4 w-4 text-pink-400' />
              <Input
                placeholder='Search by name, major, interests...'
                className='pl-10 bg-pink-50 border-pink-200 focus:border-pink-400 focus:ring-pink-400 rounded-full'
              />
            </div>
            <Button className='bg-pink-500 hover:bg-pink-600 rounded-full shadow-lg transform hover:scale-105 transition-all'>
              Search
            </Button>
          </div>

          {/* Filters */}
          <div className='flex flex-col sm:flex-row gap-4'>
            <div className='flex-1'>
              <label className='text-sm font-medium text-gray-700 mb-1 block'>
                Major
              </label>
              <Select>
                <SelectTrigger className='border-pink-200 rounded-full bg-pink-50 focus:ring-pink-400'>
                  <SelectValue placeholder='Select major' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='cs'>Computer Science</SelectItem>
                  <SelectItem value='business'>Business</SelectItem>
                  <SelectItem value='psychology'>Psychology</SelectItem>
                  <SelectItem value='engineering'>Engineering</SelectItem>
                  <SelectItem value='arts'>Arts & Humanities</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='flex-1'>
              <label className='text-sm font-medium text-gray-700 mb-1 block'>
                Year
              </label>
              <Select>
                <SelectTrigger className='border-pink-200 rounded-full bg-pink-50 focus:ring-pink-400'>
                  <SelectValue placeholder='Select year' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='freshman'>Freshman</SelectItem>
                  <SelectItem value='sophomore'>Sophomore</SelectItem>
                  <SelectItem value='junior'>Junior</SelectItem>
                  <SelectItem value='senior'>Senior</SelectItem>
                  <SelectItem value='graduate'>Graduate</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='flex-1'>
              <label className='text-sm font-medium text-gray-700 mb-1 block'>
                Interests
              </label>
              <Select>
                <SelectTrigger className='border-pink-200 rounded-full bg-pink-50 focus:ring-pink-400'>
                  <SelectValue placeholder='Select interest' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='sports'>Sports</SelectItem>
                  <SelectItem value='music'>Music</SelectItem>
                  <SelectItem value='art'>Art</SelectItem>
                  <SelectItem value='gaming'>Gaming</SelectItem>
                  <SelectItem value='outdoors'>Outdoors</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Tabs for Suggested and Search Results */}
        <Tabs defaultValue='suggested' className='mb-8'>
          <TabsList className='grid w-full grid-cols-2 mb-6 rounded-full p-1 bg-pink-100 border-2 border-pink-200'>
            <TabsTrigger
              value='suggested'
              className='text-sm sm:text-base rounded-full data-[state=active]:bg-white data-[state=active]:text-pink-600 data-[state=active]:shadow-sm'
            >
              Suggested For You
            </TabsTrigger>
            <TabsTrigger
              value='search'
              className='text-sm sm:text-base rounded-full data-[state=active]:bg-white data-[state=active]:text-pink-600 data-[state=active]:shadow-sm'
            >
              Search Results
            </TabsTrigger>
          </TabsList>

          {/* Suggested Matches */}
          <TabsContent value='suggested'>
            <div className='flex items-center justify-center mb-6'>
              <div className='h-px bg-pink-200 flex-grow'></div>
              <h2 className='text-xl font-semibold text-pink-600 mx-4 relative'>
                People You Might Like
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%2010%22%3E%3Cpath%20fill%3D%22none%22%20stroke%3D%22%23f9a8d4%22%20stroke-width%3D%222%22%20d%3D%22M0%2C5%20Q25%2C0%2050%2C5%20T100%2C5%22%2F%3E%3C%2Fsvg%3E')] bg-repeat-x"></div>
              </h2>
              <div className='h-px bg-pink-200 flex-grow'></div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              {suggestedProfiles.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          </TabsContent>

          {/* Search Results */}
          <TabsContent value='search'>
            <div className='flex items-center justify-center mb-6'>
              <div className='h-px bg-pink-200 flex-grow'></div>
              <h2 className='text-xl font-semibold text-pink-600 mx-4 relative'>
                Search Results
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%2010%22%3E%3Cpath%20fill%3D%22none%22%20stroke%3D%22%23f9a8d4%22%20stroke-width%3D%222%22%20d%3D%22M0%2C5%20Q25%2C0%2050%2C5%20T100%2C5%22%2F%3E%3C%2Fsvg%3E')] bg-repeat-x"></div>
              </h2>
              <div className='h-px bg-pink-200 flex-grow'></div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              {searchResults.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Profile Card Component
function ProfileCard({ profile }) {
  return (
    <div className='bg-white rounded-3xl shadow-md overflow-hidden transition-all hover:shadow-lg border-2 border-pink-200 group'>
      <div className='relative'>
        <Image
          src={profile.image || '/placeholder.svg'}
          alt={profile.name}
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
              {profile.name}, {profile.age}
            </h3>
            <p className='text-gray-600 text-sm'>{profile.major}</p>
          </div>
          <Badge
            variant='outline'
            className='bg-pink-100 text-pink-800 border-pink-200 rounded-full'
          >
            {profile.year}
          </Badge>
        </div>
        <p className='text-gray-700 text-sm mb-3'>{profile.bio}</p>
        <div className='flex flex-wrap gap-1 mb-3'>
          {profile.interests.map((interest, index) => (
            <Badge
              key={index}
              variant='secondary'
              className='bg-purple-100 text-purple-800 text-xs rounded-full'
            >
              {interest}
            </Badge>
          ))}
        </div>
        <div className='flex justify-between'>
          <Button
            variant='outline'
            size='sm'
            className='text-xs rounded-full border-pink-200 hover:bg-pink-50 hover:text-pink-600 transition-all'
          >
            Message
          </Button>
          <Link href={`/profile/${profile.id}`}>
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

// Sample data
const suggestedProfiles = [
  {
    id: 1,
    name: 'Emma',
    age: 20,
    major: 'Psychology',
    year: 'Junior',
    bio: 'Coffee enthusiast, bookworm, and always up for a good conversation!',
    interests: ['Reading', 'Coffee', 'Hiking'],
    image: '/placeholder.svg?height=300&width=400',
  },
  {
    id: 2,
    name: 'Liam',
    age: 21,
    major: 'Computer Science',
    year: 'Senior',
    bio: 'Coding by day, gaming by night. Looking for someone to share adventures with.',
    interests: ['Coding', 'Gaming', 'Movies'],
    image: '/placeholder.svg?height=300&width=400',
  },
  {
    id: 3,
    name: 'Sophia',
    age: 19,
    major: 'Business',
    year: 'Sophomore',
    bio: 'Aspiring entrepreneur with a passion for travel and trying new foods.',
    interests: ['Travel', 'Food', 'Entrepreneurship'],
    image: '/placeholder.svg?height=300&width=400',
  },
  {
    id: 4,
    name: 'Noah',
    age: 22,
    major: 'Engineering',
    year: 'Senior',
    bio: 'Basketball player and math nerd. Looking for someone to explore the city with.',
    interests: ['Basketball', 'Math', 'Music'],
    image: '/placeholder.svg?height=300&width=400',
  },
];

const searchResults = [
  {
    id: 5,
    name: 'Olivia',
    age: 20,
    major: 'Arts',
    year: 'Junior',
    bio: 'Painter and photographer looking for creative inspiration and meaningful connections.',
    interests: ['Art', 'Photography', 'Nature'],
    image: '/placeholder.svg?height=300&width=400',
  },
  {
    id: 6,
    name: 'Jackson',
    age: 19,
    major: 'Music',
    year: 'Sophomore',
    bio: "Guitarist in a band, coffee addict, and film buff. Let's talk about your favorite movies!",
    interests: ['Music', 'Films', 'Coffee'],
    image: '/placeholder.svg?height=300&width=400',
  },
  {
    id: 7,
    name: 'Ava',
    age: 21,
    major: 'Environmental Science',
    year: 'Senior',
    bio: 'Nature lover and activist. Looking for someone who cares about the planet as much as I do.',
    interests: ['Environment', 'Hiking', 'Yoga'],
    image: '/placeholder.svg?height=300&width=400',
  },
  {
    id: 8,
    name: 'Ethan',
    age: 20,
    major: 'Physics',
    year: 'Junior',
    bio: "Star gazer and science enthusiast. Let's have deep conversations about the universe.",
    interests: ['Astronomy', 'Science', 'Reading'],
    image: '/placeholder.svg?height=300&width=400',
  },
];