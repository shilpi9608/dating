'use client';
import React from 'react';

import { Heart } from 'lucide-react';
export default function DecorativeOverlay() {
  return (
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
  );
}
