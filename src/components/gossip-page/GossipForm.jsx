'use client';

import React from 'react';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Heart,
  MessageCircleHeart,
  Search,
  Sparkles,
  FlowerIcon,
  CloudIcon as CloudHeart,
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export default function CreateGossipForm() {
  const [loading, setLoading] = useState(false);
  const [person1, setPerson1] = useState('');
  const [person2, setPerson2] = useState('');
  const [year1, setYear1] = useState('');
  const [year2, setYear2] = useState('');
  const [gossip, setGossip] = useState('');
  const [sparklePosition, setSparklePosition] = useState({ x: 0, y: 0 });
  const [showSparkle, setShowSparkle] = useState(false);

  // Animated sparkle effect
  useEffect(() => {
    const interval = setInterval(() => {
      setSparklePosition({
        x: Math.random() * 100,
        y: Math.random() * 100,
      });
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 700);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate form
    if (!person1 || !person2 || !year1 || !year2 || !gossip) {
      alert('Please fill in all fields!');
      setLoading(false);
      return;
    }

    // Simulate API call
    console.log({
      person1,
      person2,
      year1,
      year2,
      gossip,
    });

    // Reset form after submission
    setTimeout(() => {
      setLoading(false);
      setPerson1('');
      setPerson2('');
      setYear1('');
      setYear2('');
      setGossip('');
      alert('Gossip posted successfully! 💕');
    }, 1000);
  };

  // Simulated registered users for search functionality
  const registeredUsers = [
    { name: 'Emma', year: '2nd Year' },
    { name: 'Noah', year: '3rd Year' },
    { name: 'Olivia', year: '1st Year' },
    { name: 'Liam', year: '1st Year' },
    { name: 'Sophia', year: '4th Year' },
    { name: 'Jackson', year: '3rd Year' },
  ];

  const searchUser = (input, setPerson, setYear) => {
    const user = registeredUsers.find((u) =>
      u.name.toLowerCase().includes(input.toLowerCase())
    );

    if (user) {
      setPerson(user.name);
      // Convert "1st Year" to "1" for the select value
      const yearValue = user.year.split(' ')[0].replace(/\D/g, '');
      setYear(yearValue);
    }
  };

  return (
    <div className='relative p-6 max-w-md mx-auto'>
      {/* Decorative elements */}
      <div className='absolute top-0 right-0 -z-10'>
        <FlowerIcon className='h-16 w-16 text-pink-200' />
      </div>
      <div className='absolute bottom-0 left-0 -z-10'>
        <FlowerIcon className='h-16 w-16 text-purple-200' />
      </div>
      {showSparkle && (
        <div
          className='absolute -z-10 transition-all duration-700 ease-in-out'
          style={{
            top: `${sparklePosition.y}%`,
            left: `${sparklePosition.x}%`,
            opacity: showSparkle ? 1 : 0,
          }}
        >
          <Sparkles className='h-6 w-6 text-yellow-300' />
        </div>
      )}

      <div className='text-center mb-6'>
        <h1 className='text-2xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
          Campus Crush Gossip
        </h1>
        <p className='text-sm text-pink-500 flex items-center justify-center gap-1 mt-1'>
          <Heart className='h-3 w-3' fill='#FDA4AF' /> Spill the tea about who's
          crushing on who! <Heart className='h-3 w-3' fill='#FDA4AF' />
        </p>
      </div>

      <form onSubmit={handleSubmit} className='space-y-5'>
        <div className='space-y-3 bg-gradient-to-r from-pink-100 to-purple-100 p-5 rounded-3xl shadow-sm border border-pink-200 relative overflow-hidden'>
          <div className='absolute -right-4 -top-4 opacity-10'>
            <Heart className='h-20 w-20' fill='#FD6C9E' />
          </div>

          <Label className='text-sm font-medium flex items-center gap-1 text-pink-600'>
            <Heart className='h-4 w-4' fill='#FD6C9E' />
            Crush #1
          </Label>
          <div className='flex gap-2'>
            <div className='relative flex-1'>
              <Input
                placeholder='Enter name...'
                value={person1}
                onChange={(e) => setPerson1(e.target.value)}
                className='pl-8 rounded-full border-pink-300 bg-white/70 focus:border-pink-500 focus:ring-pink-300'
              />
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-pink-400' />
            </div>
            <Button
              type='button'
              variant='outline'
              size='sm'
              className='text-xs border-pink-300 text-pink-600 hover:bg-pink-100 rounded-full'
              onClick={() => searchUser(person1, setPerson1, setYear1)}
            >
              Find
            </Button>
          </div>
          <Select value={year1} onValueChange={setYear1}>
            <SelectTrigger className='rounded-full border-pink-300 bg-white/70 focus:ring-pink-300'>
              <SelectValue placeholder='Select year' />
            </SelectTrigger>
            <SelectContent className='rounded-xl border-pink-200'>
              <SelectItem value='1'>1st Year</SelectItem>
              <SelectItem value='2'>2nd Year</SelectItem>
              <SelectItem value='3'>3rd Year</SelectItem>
              <SelectItem value='4'>4th Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='relative flex justify-center items-center my-2'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-pink-200 border-dotted'></div>
          </div>
          <div className='relative bg-white px-3'>
            <CloudHeart className='h-6 w-6 text-pink-400' />
          </div>
        </div>

        <div className='space-y-3 bg-gradient-to-r from-purple-100 to-blue-100 p-5 rounded-3xl shadow-sm border border-purple-200 relative overflow-hidden'>
          <div className='absolute -left-4 -top-4 opacity-10'>
            <Heart className='h-20 w-20' fill='#9F7AEA' />
          </div>

          <Label className='text-sm font-medium flex items-center gap-1 text-purple-600'>
            <Heart className='h-4 w-4' fill='#9F7AEA' />
            Crush #2
          </Label>
          <div className='flex gap-2'>
            <div className='relative flex-1'>
              <Input
                placeholder='Enter name...'
                value={person2}
                onChange={(e) => setPerson2(e.target.value)}
                className='pl-8 rounded-full border-purple-300 bg-white/70 focus:border-purple-500 focus:ring-purple-300'
              />
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-purple-400' />
            </div>
            <Button
              type='button'
              variant='outline'
              size='sm'
              className='text-xs border-purple-300 text-purple-600 hover:bg-purple-100 rounded-full'
              onClick={() => searchUser(person2, setPerson2, setYear2)}
            >
              Find
            </Button>
          </div>
          <Select value={year2} onValueChange={setYear2}>
            <SelectTrigger className='rounded-full border-purple-300 bg-white/70 focus:ring-purple-300'>
              <SelectValue placeholder='Select year' />
            </SelectTrigger>
            <SelectContent className='rounded-xl border-purple-200'>
              <SelectItem value='1'>1st Year</SelectItem>
              <SelectItem value='2'>2nd Year</SelectItem>
              <SelectItem value='3'>3rd Year</SelectItem>
              <SelectItem value='4'>4th Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-3 bg-gradient-to-r from-yellow-50 to-orange-50 p-5 rounded-3xl shadow-sm border border-yellow-200 relative overflow-hidden'>
          <div className='absolute -right-4 -bottom-4 opacity-10'>
            <MessageCircleHeart className='h-20 w-20' fill='#FBBF24' />
          </div>

          <Label className='text-sm font-medium flex items-center gap-1 text-amber-600'>
            <MessageCircleHeart className='h-4 w-4 text-amber-500' />
            Spill The Tea!
          </Label>
          <Textarea
            placeholder="Share the juicy gossip... What's the scoop? 💕 👀"
            className='min-h-[120px] rounded-2xl border-yellow-300 bg-white/70 focus:border-amber-400 focus:ring-amber-200'
            value={gossip}
            onChange={(e) => setGossip(e.target.value)}
          />
        </div>

        <Button
          type='submit'
          className={cn(
            'w-full bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 hover:from-pink-500 hover:via-purple-500 hover:to-pink-500',
            'text-white rounded-full py-7 shadow-md font-medium text-lg relative overflow-hidden transition-all duration-300',
            'hover:shadow-lg hover:-translate-y-0.5'
          )}
          disabled={loading}
        >
          <div className='relative flex items-center justify-center'>
            <Heart
              className='absolute left-0 h-5 w-5 animate-pulse'
              fill='white'
            />
            <span className='mx-6'>
              {loading ? 'Posting...' : 'Post Gossip'}
            </span>
            <Sparkles className='absolute right-0 h-5 w-5' />
          </div>
        </Button>
      </form>

      <div className='text-center mt-4 text-xs text-pink-400 italic'>
        All gossip is anonymous & just for fun! 💖
      </div>
    </div>
  );
}
