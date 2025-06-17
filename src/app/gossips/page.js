'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Heart,
  Search,
  Star,
  Sparkles,
  TrendingUp,
  Clock,
  Users,
} from 'lucide-react';
import { GossipCard } from '@/components/all-gossips-page/GossipCard';
import axios from 'axios';
import Link from 'next/link';
import Decoration from '@/components/all-gossips-page/Decoration';

export default function GossipPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('recent');
  const [likedGossips, setLikedGossips] = useState([]);
  const [gossips, setGossips] = useState([]);

  useEffect(() => {
    const fetchGossips = async () => {
      try {
        const res = await axios.get('/api/gossip/all'); // Adjust this if your API route differs
        setGossips(res.data.gossips); // no need for res.data.gossips unless your structure is { gossips: [...] }
        console.log(res.data);
      } catch (error) {
        console.error('Error fetching gossips:', error);
      }
    };

    fetchGossips();
  }, []);

  // ✅ Use real gossips instead of mockGossips
  const sortedGossips = [...gossips].sort((a, b) => {
    if (activeTab === 'recent') {
      return new Date(b.createdAt) - new Date(a.createdAt); // newest first
    } else {
      return b.likes.length - a.likes.length; // most liked first
    }
  });

  // ✅ Add optional chaining in case content is undefined
  const filteredGossips = sortedGossips.filter(
    (gossip) =>
      gossip?.person1?.name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      gossip?.person2?.name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      gossip?.content?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ✅ Like toggle (just UI state; does not persist to backend)
  const toggleLike = (gossipId) => {
    setLikedGossips((prev) =>
      prev.includes(gossipId)
        ? prev.filter((id) => id !== gossipId)
        : [...prev, gossipId]
    );
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 via-orange-50 to-amber-50 relative overflow-hidden'>
      {/* Decorative Elements */}
      <Decoration />

      <div className='relative z-10 max-w-6xl mx-auto px-4 py-8'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-amber-900 mb-2'>
            Campus Gossips
          </h1>
          <div className='w-32 h-1 bg-gradient-to-r from-orange-400 to-pink-400 mx-auto rounded-full'></div>
          <p className='text-amber-700 mt-4 max-w-2xl mx-auto'>
            Discover the latest whispers and connections happening around
            campus! 💕
          </p>
        </div>

        {/* Search Bar */}
        <div className='max-w-3xl mx-auto mb-8'>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <Search className='h-5 w-5 text-amber-500' />
            </div>
            <Input
              type='text'
              placeholder='Search for names or gossips...'
              className='pl-10 py-6 bg-white/90 backdrop-blur-sm border-pink-200 rounded-full shadow-md focus:ring-pink-400 focus:border-pink-400 text-amber-900'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className='absolute inset-y-0 right-0 pr-3 flex items-center'>
              <Sparkles className='h-5 w-5 text-pink-400 animate-pulse' />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs
          defaultValue='recent'
          className='max-w-5xl mx-auto'
          onValueChange={(value) => setActiveTab(value)}
        >
          <div className='flex justify-center mb-6'>
            <TabsList className='bg-white/80 backdrop-blur-sm border border-pink-100 p-1 rounded-full'>
              <TabsTrigger
                value='recent'
                className='rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-400 data-[state=active]:to-pink-400 data-[state=active]:text-white px-6 py-2'
              >
                <Clock className='w-4 h-4 mr-2' />
                Recent
              </TabsTrigger>
              <TabsTrigger
                value='trending'
                className='rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-400 data-[state=active]:to-pink-400 data-[state=active]:text-white px-6 py-2'
              >
                <TrendingUp className='w-4 h-4 mr-2' />
                Trending
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value='recent' className='mt-0'>
            <div className='grid md:grid-cols-2 gap-6'>
              {filteredGossips.map((gossip) => (
                <GossipCard
                  key={gossip.id}
                  gossip={gossip}
                  isLiked={likedGossips.includes(gossip.id)}
                  onLike={() => toggleLike(gossip.id)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value='trending' className='mt-0'>
            <div className='grid md:grid-cols-2 gap-6'>
              {filteredGossips.map((gossip) => (
                <GossipCard gossip={gossip} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {filteredGossips.length === 0 && (
          <div className='text-center py-16'>
            <div className='bg-white/90 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto shadow-lg border border-pink-100'>
              <Sparkles className='w-12 h-12 text-pink-400 mx-auto mb-4' />
              <h3 className='text-xl font-semibold text-amber-900 mb-2'>
                No gossips found
              </h3>
              <p className='text-amber-700'>
                Try searching for different names or check back later for new
                campus gossips!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
