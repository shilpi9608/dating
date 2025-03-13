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
    <div className='min-h-screen bg-gradient-to-b from-pink-50 to-purple-50'>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold text-center text-pink-600 mb-2'>
          Find Your Campus Match
        </h1>
        <p className='text-center text-gray-600 mb-8'>
          Discover amazing people right on your campus
        </p>

        {/* Search Section */}
        <div className='bg-white rounded-xl shadow-md p-6 mb-8'>
          <div className='flex flex-col md:flex-row gap-4 mb-6'>
            <div className='relative flex-1'>
              <Search className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
              <Input
                placeholder='Search by name, major, interests...'
                className='pl-10 bg-gray-50 border-gray-200'
              />
            </div>
            <Button className='bg-pink-600 hover:bg-pink-700'>Search</Button>
          </div>

          {/* Filters */}
          <div className='flex flex-col sm:flex-row gap-4'>
            <div className='flex-1'>
              <label className='text-sm font-medium text-gray-700 mb-1 block'>
                Major
              </label>
              <Select>
                <SelectTrigger>
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
                <SelectTrigger>
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
                <SelectTrigger>
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
          <TabsList className='grid w-full grid-cols-2 mb-6'>
            <TabsTrigger value='suggested' className='text-sm sm:text-base'>
              Suggested For You
            </TabsTrigger>
            <TabsTrigger value='search' className='text-sm sm:text-base'>
              Search Results
            </TabsTrigger>
          </TabsList>

          {/* Suggested Matches */}
          <TabsContent value='suggested'>
            <h2 className='text-xl font-semibold text-gray-800 mb-4'>
              People You Might Like
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              {suggestedProfiles.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          </TabsContent>

          {/* Search Results */}
          <TabsContent value='search'>
            <h2 className='text-xl font-semibold text-gray-800 mb-4'>
              Search Results
            </h2>
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
    <div className='bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg'>
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
          className='absolute top-2 right-2 bg-white/80 hover:bg-white hover:text-pink-600 rounded-full'
        >
          <Heart className='h-4 w-4' />
        </Button>
      </div>
      <div className='p-4'>
        <div className='flex justify-between items-start mb-2'>
          <div>
            <h3 className='font-bold text-lg'>
              {profile.name}, {profile.age}
            </h3>
            <p className='text-gray-600 text-sm'>{profile.major}</p>
          </div>
          <Badge
            variant='outline'
            className='bg-pink-100 text-pink-800 border-pink-200'
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
              className='bg-purple-100 text-purple-800 text-xs'
            >
              {interest}
            </Badge>
          ))}
        </div>
        <div className='flex justify-between'>
          <Button variant='outline' size='sm' className='text-xs'>
            Message
          </Button>
          <Link href={`/profile/${profile.id}`}>
            <Button size='sm' className='bg-pink-600 hover:bg-pink-700 text-xs'>
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
