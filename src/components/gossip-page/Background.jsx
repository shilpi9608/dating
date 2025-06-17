import React from 'react';

import { Star } from 'lucide-react';

const Background = () => {
  return (
    <div className='fixed inset-0 pointer-events-none'>
      {/* Pastel pattern background */}
      <div className='absolute inset-0 opacity-10 z-0'>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=200&width=200')] opacity-20"></div>
      </div>

      {/* Floating hearts */}
      {[...Array(20)].map((_, i) => (
        <div
          key={`heart-${i}`}
          className='absolute opacity-20'
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 45}deg)`,
            animation: `float ${Math.random() * 10 + 15}s ease-in-out infinite, 
                          pulse ${Math.random() * 5 + 3}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        >
          <img
            src='\pink-hearts.png'
            alt='floating hearts'
            style={{
              width: `${Math.random() * 300 + 15}px`,
              height: 'auto',
            }}
          />
        </div>
      ))}

      {/* Decorative circles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={`circle-${i}`}
          className='absolute rounded-full'
          style={{
            width: `${Math.random() * 60 + 20}px`,
            height: `${Math.random() * 60 + 20}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: [
              'rgba(255, 182, 193, 0.3)', // Light pink
              'rgba(255, 218, 185, 0.3)', // Peach
              'rgba(255, 255, 224, 0.3)', // Light yellow
              'rgba(230, 230, 250, 0.3)', // Lavender
              'rgba(176, 224, 230, 0.3)', // Powder blue
            ][Math.floor(Math.random() * 5)],
            animation: `float ${Math.random() * 20 + 10}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      {/* Cute stars */}
      {[...Array(10)].map((_, i) => (
        <div
          key={`star-${i}`}
          className='absolute opacity-30'
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `pulse ${Math.random() * 4 + 2}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        >
          <Star
            size={Math.random() * 20 + 10}
            className='text-yellow-300'
            fill='#FFD700'
          />
        </div>
      ))}
    </div>
  );
};

export default Background;
