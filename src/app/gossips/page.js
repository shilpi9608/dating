'use client';

import { useState } from 'react';
import {
  Search,
  Heart,
  Filter,
  Sparkles,
  MessageCircleHeart,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import CreateGossipForm from '@/components/gossip-page/GossipForm';

// Sample data for gossips
const SAMPLE_GOSSIPS = [
  {
    id: 1,
    person1: {
      name: 'Emma',
      year: '2nd Year',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    person2: {
      name: 'Noah',
      year: '3rd Year',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    content:
      'Spotted holding hands at the library! They were giggling over the same book in the romance section 👀',
    likes: 24,
    timestamp: '2 hours ago',
    trending: true,
  },
  {
    id: 2,
    person1: {
      name: 'Olivia',
      year: '1st Year',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    person2: {
      name: 'Liam',
      year: '1st Year',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    content:
      "Both 'accidentally' showed up to the same study group even though neither is taking that class! 💕",
    likes: 18,
    timestamp: '5 hours ago',
    trending: true,
  },
  {
    id: 3,
    person1: {
      name: 'Sophia',
      year: '4th Year',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    person2: {
      name: 'Jackson',
      year: '3rd Year',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    content:
      "Sophia was seen wearing Jackson's varsity jacket at the football game yesterday!",
    likes: 32,
    timestamp: '1 day ago',
    trending: false,
  },
  {
    id: 4,
    person1: {
      name: 'Ava',
      year: '2nd Year',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    person2: {
      name: 'Mason',
      year: '2nd Year',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    content:
      "They've been partnering up for every chemistry lab, but we think they're creating a different kind of chemistry! 🧪❤️",
    likes: 15,
    timestamp: '2 days ago',
    trending: false,
  },
  {
    id: 5,
    person1: {
      name: 'Isabella',
      year: '3rd Year',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    person2: {
      name: 'Lucas',
      year: '4th Year',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    content:
      "Isabella has been tutoring Lucas in Spanish, but word is they're practicing French instead! 💋",
    likes: 29,
    timestamp: '3 days ago',
    trending: true,
  },
  {
    id: 6,
    person1: {
      name: 'Mia',
      year: '1st Year',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    person2: {
      name: 'Ethan',
      year: '2nd Year',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    content:
      "Ethan waited outside Mia's dorm with coffee every morning this week! ☕️",
    likes: 12,
    timestamp: '4 days ago',
    trending: false,
  },
];

export default function GossipPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [filteredGossips, setFilteredGossips] = useState(SAMPLE_GOSSIPS);
  const isMobile = true;

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterGossips(query, yearFilter);
  };

  const handleYearFilter = (year) => {
    setYearFilter(year);
    filterGossips(searchQuery, year);
  };

  const filterGossips = (query, year) => {
    let filtered = SAMPLE_GOSSIPS;

    if (query) {
      filtered = filtered.filter(
        (gossip) =>
          gossip.person1.name.toLowerCase().includes(query.toLowerCase()) ||
          gossip.person2.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (year) {
      filtered = filtered.filter(
        (gossip) =>
          gossip.person1.year.includes(year) ||
          gossip.person2.year.includes(year)
      );
    }

    setFilteredGossips(filtered);
  };

  return (
    <main className='min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 pb-20'>
      {/* Header */}
      <header className='bg-white shadow-sm sticky top-0 z-10'>
        <div className='container mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between'>
          <div className='flex items-center justify-between'>
            <h1 className='text-2xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent flex items-center'>
              <Heart className='h-6 w-6 mr-2 text-pink-400' fill='#FDA4AF' />
              Campus Crush
            </h1>
            {isMobile && (
              <Button
                variant='ghost'
                size='sm'
                className='md:hidden text-pink-500'
                onClick={() => setShowCreateForm(!showCreateForm)}
              >
                {showCreateForm ? <X /> : <MessageCircleHeart />}
              </Button>
            )}
          </div>

          {/* Search and Filter - Desktop */}
          <div
            className={cn(
              'mt-4 md:mt-0 flex flex-col md:flex-row gap-2 md:items-center transition-all duration-300',
              isMobile && showCreateForm ? 'hidden' : 'block'
            )}
          >
            <div className='relative flex-1'>
              <Input
                placeholder='Search by name...'
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className='pl-9 rounded-full border-pink-200 focus:border-pink-400 focus:ring-pink-200'
              />
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-pink-400' />
            </div>

            <Select value={yearFilter} onValueChange={handleYearFilter}>
              <SelectTrigger className='w-[140px] rounded-full border-pink-200 focus:ring-pink-200'>
                <div className='flex items-center'>
                  <Filter className='h-3.5 w-3.5 mr-2 text-pink-400' />
                  <SelectValue placeholder='Year' />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Years</SelectItem>
                <SelectItem value='1st'>1st Year</SelectItem>
                <SelectItem value='2nd'>2nd Year</SelectItem>
                <SelectItem value='3rd'>3rd Year</SelectItem>
                <SelectItem value='4th'>4th Year</SelectItem>
              </SelectContent>
            </Select>

            {!isMobile && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className='bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white rounded-full'>
                    <MessageCircleHeart className='h-4 w-4 mr-2' />
                    New Gossip
                  </Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-md rounded-3xl border-pink-200 p-0'>
                  <CreateGossipForm />
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </header>

      <div className='container mx-auto px-4 py-6'>
        {/* Mobile Create Form */}
        {isMobile && showCreateForm ? (
          <div className='mb-6'>
            <CreateGossipForm />
          </div>
        ) : (
          <>
            {/* Trending Section */}
            <section className='mb-8'>
              <div className='flex items-center mb-4'>
                <h2 className='text-xl font-semibold text-pink-600 flex items-center'>
                  <Sparkles className='h-5 w-5 mr-2 text-pink-400' />
                  Trending Gossip
                </h2>
                <div className='ml-3 px-2 py-1 bg-pink-100 rounded-full text-xs font-medium text-pink-600'>
                  Hot! 🔥
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {filteredGossips
                  .filter((gossip) => gossip.trending)
                  .map((gossip) => (
                    <GossipCard key={gossip.id} gossip={gossip} />
                  ))}
              </div>
            </section>

            {/* Recent Gossips */}
            <section>
              <h2 className='text-xl font-semibold text-purple-600 mb-4 flex items-center'>
                <MessageCircleHeart className='h-5 w-5 mr-2 text-purple-400' />
                Recent Gossip
              </h2>

              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {filteredGossips
                  .filter((gossip) => !gossip.trending)
                  .map((gossip) => (
                    <GossipCard key={gossip.id} gossip={gossip} />
                  ))}
              </div>

              {filteredGossips.length === 0 && (
                <div className='text-center py-12'>
                  <MessageCircleHeart className='h-12 w-12 mx-auto text-gray-300' />
                  <p className='mt-4 text-gray-500'>
                    No gossips found. Try a different search!
                  </p>
                </div>
              )}
            </section>
          </>
        )}
      </div>

      {/* Mobile Floating Action Button */}
      {isMobile && !showCreateForm && (
        <Button
          onClick={() => setShowCreateForm(true)}
          className='fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 shadow-lg flex items-center justify-center'
        >
          <MessageCircleHeart className='h-6 w-6' />
        </Button>
      )}

      {/* Footer */}
      <footer className='bg-white border-t border-pink-100 py-4 mt-auto'>
        <div className='container mx-auto px-4 text-center text-sm text-pink-400'>
          <p>
            Campus Crush Gossip © 2025 • All gossip is anonymous & just for fun!
            💖
          </p>
          <div className='flex justify-center gap-4 mt-2'>
            <a href='#' className='text-pink-500 hover:text-pink-600'>
              About
            </a>
            <a href='#' className='text-pink-500 hover:text-pink-600'>
              Privacy
            </a>
            <a href='#' className='text-pink-500 hover:text-pink-600'>
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function GossipCard({ gossip }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className='bg-white rounded-3xl border border-pink-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300'>
      <div className='p-4'>
        <div className='flex justify-between items-start mb-3'>
          <div className='flex items-center gap-2'>
            <div className='flex -space-x-2'>
              <img
                src={gossip.person1.avatar || '/placeholder.svg'}
                alt={gossip.person1.name}
                className='h-8 w-8 rounded-full border-2 border-white ring-2 ring-pink-100'
              />
              <img
                src={gossip.person2.avatar || '/placeholder.svg'}
                alt={gossip.person2.name}
                className='h-8 w-8 rounded-full border-2 border-white ring-2 ring-pink-100'
              />
            </div>
            <div>
              <p className='text-sm font-medium line-clamp-1'>
                {gossip.person1.name} & {gossip.person2.name}
              </p>
              <p className='text-xs text-gray-500'>
                {gossip.person1.year} • {gossip.person2.year}
              </p>
            </div>
          </div>
          <span className='text-xs text-gray-400'>{gossip.timestamp}</span>
        </div>

        <p className='text-sm mb-3'>{gossip.content}</p>

        <div className='flex justify-between items-center'>
          <Button
            variant='ghost'
            size='sm'
            className={cn(
              'text-xs gap-1 px-2 rounded-full',
              liked ? 'text-pink-500' : 'text-gray-500'
            )}
            onClick={() => setLiked(!liked)}
          >
            <Heart className='h-3.5 w-3.5' fill={liked ? '#FDA4AF' : 'none'} />
            {liked ? gossip.likes + 1 : gossip.likes}
          </Button>

          {gossip.trending && (
            <span className='text-xs bg-pink-50 text-pink-500 px-2 py-0.5 rounded-full flex items-center'>
              <Sparkles className='h-3 w-3 mr-1' />
              Trending
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
