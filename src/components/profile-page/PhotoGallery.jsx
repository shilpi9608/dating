'use client';

import React from 'react';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Heart, Camera } from 'lucide-react';

export function PhotoGallery({ photos, userName }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const goToPhoto = (index) => {
    setCurrentIndex(index);
  };

  // Touch handlers for swipe functionality
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextPhoto();
    } else if (isRightSwipe) {
      prevPhoto();
    }
  };

  // Auto-advance photos every 5 seconds (optional)
  useEffect(() => {
    const interval = setInterval(() => {
      nextPhoto();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className='overflow-hidden border-0 shadow-xl bg-white/80 backdrop-blur-sm group'>
      <div className='relative'>
        {/* Main Photo Display */}
        <div
          className='relative h-96 lg:h-[500px] xl:h-[600px] overflow-hidden'
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className='flex transition-transform duration-500 ease-out h-full'
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {photos.map((photo, index) => (
              <div key={index} className='w-full h-full flex-shrink-0 relative'>
                <img
                  src={photo || '/placeholder.svg'}
                  alt={`${userName} - Photo ${index + 1}`}
                  className='w-full h-full object-cover'
                />
                {/* Gradient overlay for better text visibility */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent' />
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          {photos.length > 1 && (
            <>
              <button
                onClick={prevPhoto}
                className='absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110'
                aria-label='Previous photo'
              >
                <ChevronLeft className='w-5 h-5 text-amber-900' />
              </button>

              <button
                onClick={nextPhoto}
                className='absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110'
                aria-label='Next photo'
              >
                <ChevronRight className='w-5 h-5 text-amber-900' />
              </button>
            </>
          )}

          {/* Heart Icon */}
          <div className='absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2'>
            <Heart className='w-5 h-5 text-pink-500' />
          </div>

          {/* Photo Counter */}
          {photos.length > 1 && (
            <div className='absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1'>
              <Camera className='w-4 h-4 text-amber-700' />
              <span className='text-sm font-medium text-amber-900'>
                {currentIndex + 1}/{photos.length}
              </span>
            </div>
          )}
        </div>

        {/* Photo Indicators */}
        {photos.length > 1 && (
          <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2'>
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToPhoto(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-white scale-125 shadow-lg'
                    : 'bg-white/60 hover:bg-white/80'
                }`}
                aria-label={`Go to photo ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Thumbnail Strip (Desktop) */}
        {photos.length > 1 && (
          <div className='hidden md:block absolute bottom-4 right-4'>
            <div className='flex gap-1 bg-white/90 backdrop-blur-sm rounded-lg p-2'>
              {photos.slice(0, 4).map((photo, index) => (
                <button
                  key={index}
                  onClick={() => goToPhoto(index)}
                  className={`w-12 h-12 rounded-md overflow-hidden transition-all duration-300 ${
                    index === currentIndex
                      ? 'ring-2 ring-orange-400 scale-110'
                      : 'hover:scale-105 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={photo || '/placeholder.svg'}
                    alt={`Thumbnail ${index + 1}`}
                    className='w-full h-full object-cover'
                  />
                </button>
              ))}
              {photos.length > 4 && (
                <div className='w-12 h-12 rounded-md bg-gradient-to-br from-orange-400 to-pink-400 flex items-center justify-center text-white text-xs font-bold'>
                  +{photos.length - 4}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <CardContent className='p-6'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-amber-900 mb-1'>{userName}</h2>
          <div className='flex items-center justify-center gap-3'>
            <span className='bg-gradient-to-r from-orange-400 to-pink-400 text-white px-3 py-1 rounded-full text-sm font-medium'>
              23 years old
            </span>
            <div className='flex items-center gap-1 bg-gradient-to-r from-pink-400 to-rose-400 text-white px-3 py-1 rounded-full text-sm font-medium'>
              <Heart className='w-4 h-4 fill-current' />
              <span>1,247 likes</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
