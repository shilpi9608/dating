import React from 'react';
import { Sparkles, Star } from 'lucide-react';

const Decoration = () => {
  return (
    <div className='absolute inset-0 pointer-events-none'>
      {/* Floating hearts */}
      <div className='absolute top-20 left-10 w-8 h-8 bg-pink-300 rounded-full opacity-60 animate-pulse'></div>
      <div className='absolute top-40 right-20 w-6 h-6 bg-rose-300 rounded-full opacity-50 animate-bounce'></div>
      <div className='absolute bottom-40 left-20 w-10 h-10 bg-amber-300 rounded-full opacity-40 animate-pulse'></div>
      <div className='absolute top-60 left-1/3 w-4 h-4 bg-pink-400 rounded-full opacity-60 animate-bounce'></div>
      <div className='absolute bottom-60 right-1/4 w-12 h-12 bg-orange-200 rounded-full opacity-30 animate-pulse'></div>
      <div className='absolute top-80 right-1/3 w-6 h-6 bg-rose-200 rounded-full opacity-50 animate-bounce'></div>
      <div className='absolute bottom-80 left-1/4 w-8 h-8 bg-pink-200 rounded-full opacity-40 animate-pulse'></div>

      {/* More flower shapes and sparkles */}
      <div className='absolute top-32 right-10 animate-pulse'>
        <Star
          className='w-6 h-6 text-pink-400 opacity-70'
          fill='currentColor'
        />
      </div>
      <div className='absolute bottom-32 left-16 animate-bounce'>
        <Star
          className='w-8 h-8 text-rose-300 opacity-60'
          fill='currentColor'
        />
      </div>
      <div className='absolute top-1/2 right-8 animate-pulse'>
        <Star
          className='w-5 h-5 text-amber-400 opacity-80'
          fill='currentColor'
        />
      </div>
      <div className='absolute top-1/4 left-1/2 animate-bounce'>
        <Star
          className='w-4 h-4 text-pink-300 opacity-60'
          fill='currentColor'
        />
      </div>
      <div className='absolute bottom-1/4 right-1/2 animate-pulse'>
        <Star
          className='w-6 h-6 text-rose-400 opacity-50'
          fill='currentColor'
        />
      </div>

      {/* Cute sparkle effects */}
      <div className='absolute top-16 left-1/4'>
        <Sparkles className='w-5 h-5 text-pink-300 opacity-60 animate-pulse' />
      </div>
      <div className='absolute bottom-16 right-1/3'>
        <Sparkles className='w-4 h-4 text-orange-300 opacity-50 animate-bounce' />
      </div>
    </div>
  );
};

export default Decoration;
