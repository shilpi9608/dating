'use client';

import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
import { Search, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import axios from 'axios';
import { toast } from 'react-toastify';
import ProfileCard from '@/components/find-page/ProfileCard';

// Load DecorativeOverlay client-side only to avoid SSR mismatch
const DecorativeOverlay = dynamic(
  () => import('@/components/find-page/DecorativeOverlay'),
  { ssr: false }
);

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMajor, setFilterMajor] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [filterInterest, setFilterInterest] = useState('');
  const [suggestedProfiles, setSuggestedProfiles] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loadingSuggested, setLoadingSuggested] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [error, setError] = useState('');
  const limit = 12;

  useEffect(() => {
    const loadSuggested = async () => {
      setLoadingSuggested(true);
      setError('');
      try {
        const res = await axios.get(`/api/browse/all?page=1&limit=${limit}`);
        console.log(res.data.users);
        setSuggestedProfiles(res.data.users);
      } catch (err) {
        console.error(err);
        setError('Failed to load suggested profiles.');
        toast.error('Failed to load suggested profiles.');
      } finally {
        setLoadingSuggested(false);
      }
    };
    loadSuggested();
  }, []);

  const handleSearch = async () => {
    setLoadingSearch(true);
    setError('');

    try {
      const res = await axios.get(`/api/browse/all?page=1&limit=${limit}`);
      let users = res.data.users;

      const term = searchTerm.toLowerCase();
      users = users.filter((p) => {
        // safe defaults:
        const name = p.personalInformation?.name?.toLowerCase() || '';
        const branch = p.collegeInformation?.branch?.toLowerCase() || '';
        const year = p.collegeInformation?.year
          ? String(p.collegeInformation.year)
          : '';
        const ints = Array.isArray(p.interests) ? p.interests : [];

        const matchesTerm =
          name.includes(term) ||
          branch.includes(term) ||
          ints.some((i) => i.toLowerCase().includes(term));

        const matchesMajor = filterMajor
          ? branch === filterMajor.toLowerCase()
          : true;
        const matchesYear = filterYear ? year === filterYear : true;
        const matchesInterest = filterInterest
          ? ints.includes(filterInterest)
          : true;

        return matchesTerm && matchesMajor && matchesYear && matchesInterest;
      });

      setSearchResults(users);
    } catch (err) {
      console.error(err);
      setError('Search failed.');
      toast.error('Search failed.');
    } finally {
      setLoadingSearch(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 relative overflow-hidden'>
      <DecorativeOverlay />

      <div className='container mx-auto px-4 py-8 relative z-10'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-pink-600 mb-2 relative inline-block'>
            Find Your Campus Match
            <div className="absolute -bottom-2 left-0 right-0 h-2 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%2010%22%3E%3Cpath%20fill%3D%22none%22%20stroke%3D%22%23ff6b9d%22%20stroke-width%3D%222%22%20d%3D%22M0%2C5%20Q25%2C0%2050%2C5%20T100%2C5%22%2F%3E%3C%2Fsvg%3E')] bg-repeat-x"></div>
          </h1>
          <p className='text-gray-600 mb-2'>
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              onClick={handleSearch}
              className='bg-pink-500 hover:bg-pink-600 rounded-full shadow-lg transform hover:scale-105 transition-all'
              disabled={loadingSearch}
            >
              {loadingSearch ? 'Searching...' : 'Search'}
            </Button>
          </div>

          {/* Filters */}
          <div className='flex flex-col sm:flex-row gap-4'>
            <div className='flex-1'>
              <label className='text-sm font-medium text-gray-700 mb-1 block'>
                Major
              </label>
              <Select onValueChange={setFilterMajor} value={filterMajor}>
                <SelectTrigger className='border-pink-200 rounded-full bg-pink-50 focus:ring-pink-400'>
                  <SelectValue placeholder='Select major' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Computer Science'>
                    Computer Science
                  </SelectItem>
                  <SelectItem value='Business'>Business</SelectItem>
                  <SelectItem value='Psychology'>Psychology</SelectItem>
                  <SelectItem value='Engineering'>Engineering</SelectItem>
                  <SelectItem value='Arts & Humanities'>
                    Arts & Humanities
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='flex-1'>
              <label className='text-sm font-medium text-gray-700 mb-1 block'>
                Year
              </label>
              <Select onValueChange={setFilterYear} value={filterYear}>
                <SelectTrigger className='border-pink-200 rounded-full bg-pink-50 focus:ring-pink-400'>
                  <SelectValue placeholder='Select year' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='1'>Freshman</SelectItem>
                  <SelectItem value='2'>Sophomore</SelectItem>
                  <SelectItem value='3'>Junior</SelectItem>
                  <SelectItem value='4'>Senior</SelectItem>
                  <SelectItem value='Graduate'>Graduate</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='flex-1'>
              <label className='text-sm font-medium text-gray-700 mb-1 block'>
                Interests
              </label>
              <Select onValueChange={setFilterInterest} value={filterInterest}>
                <SelectTrigger className='border-pink-200 rounded-full bg-pink-50 focus:ring-pink-400'>
                  <SelectValue placeholder='Select interest' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Sports'>Sports</SelectItem>
                  <SelectItem value='Music'>Music</SelectItem>
                  <SelectItem value='Art'>Art</SelectItem>
                  <SelectItem value='Gaming'>Gaming</SelectItem>
                  <SelectItem value='Outdoors'>Outdoors</SelectItem>
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
            {loadingSuggested ? (
              <p>Loading...</p>
            ) : (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {suggestedProfiles?.map((profile) => (
                  <ProfileCard key={profile._id} profile={profile} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Search Results */}
          <TabsContent value='search'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              {searchResults?.map((profile) => (
                <ProfileCard key={profile._id} profile={profile} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
