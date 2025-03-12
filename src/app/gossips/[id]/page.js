'use client';
import React from 'react';
import { SideBar } from '@/components/individual-gossip/SideBar';
import { GossipChat } from '@/components/individual-gossip/GossipChat';

export default function GossipPage() {
  const gossip = {
    person1: {
      name: 'Sarah Johnson',
      year: 'Junior',
      major: 'Computer Science',
      image: '/placeholder.svg?height=200&width=200',
      about: 'Loves coding and coffee ☕',
      interests: ['AI/ML', 'Web Development', 'Reading'],
    },
    person2: {
      name: 'Mike Smith',
      year: 'Senior',
      major: 'Business',
      image: '/placeholder.svg?height=200&width=200',
      about: 'Basketball team captain 🏀',
      interests: ['Sports', 'Entrepreneurship', 'Music'],
    },
    comments: [
      {
        id: 1,
        author: 'Alex',
        content: 'They would make such a cute couple! 💕',
        timestamp: '2h ago',
        replies: [
          {
            id: 2,
            author: 'Jamie',
            content: 'I saw them studying together in the library!',
            timestamp: '1h ago',
          },
        ],
      },
      {
        id: 3,
        author: 'Alex',
        content: 'They would make such a cute couple! 💕',
        timestamp: '2h ago',
        replies: [
          {
            id: 4,
            author: 'Jamie',
            content: 'I saw them studying together in the library!',
            timestamp: '1h ago',
          },
        ],
      },
      {
        id: 5,
        author: 'Alex',
        content: 'They would make such a cute couple! 💕',
        timestamp: '2h ago',
        replies: [
          {
            id: 6,
            author: 'Jamie',
            content: 'I saw them studying together in the library!',
            timestamp: '1h ago',
          },
        ],
      },
      {
        id: 7,
        author: 'Alex',
        content: 'They would make such a cute couple! 💕',
        timestamp: '2h ago',
        replies: [
          {
            id: 8,
            author: 'Jamie',
            content: 'I saw them studying together in the library!',
            timestamp: '1h ago',
          },
        ],
      },
    ],
  };

  return (
    <>
      <main className='min-h-screen bg-gradient-to-b from-custom-pink to-custom-beige'>
        <div className='grid grid-cols-[400px_1fr]'>
          {/* Left Sidebar - Fixed */}
          <SideBar gossip={gossip} />
          {/* Right Content - Scrollable */}
          <GossipChat gossip={gossip} />
        </div>
      </main>
    </>
  );
}
