'use client';

import React from 'react';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { CommentList } from '@/components/gossip-page/CommentList';
import { CreateGossipDialog } from '@/components/gossip-page/CreateGossip';
export default function GossipPage() {
  const [newComment, setNewComment] = useState('');

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

  const handleSubmitComment = (e) => {
    e.preventDefault();
    // Add comment logic here
    setNewComment('');
  };

  return (
    <>
      <main className='min-h-screen bg-gradient-to-b from-custom-pink to-custom-beige'>
        <div className='grid grid-cols-[400px_1fr]'>
          {/* Left Sidebar - Fixed */}
          <div className='fixed w-[400px] h-screen overflow-y-auto bg-custom-orange/20 p-6 border-r'>
            <Card className='bg-transparent border-none shadow-none'>
              <CardContent className='p-0'>
                <div className='flex flex-col gap-8 items-center'>
                  <div className='text-center'>
                    <div className='relative w-40 h-40 mx-auto mb-4'>
                      <Image
                        src={gossip.person1.image || '/placeholder.svg'}
                        alt={gossip.person1.name}
                        fill
                        className='rounded-full object-cover border-4 border-custom-coral'
                      />
                    </div>
                    <h2 className='text-2xl font-semibold mb-2'>
                      {gossip.person1.name}
                    </h2>
                    <div className='text-lg text-muted-foreground mb-1'>
                      {gossip.person1.year}
                    </div>
                    <div className='text-lg text-muted-foreground mb-4'>
                      {gossip.person1.major}
                    </div>
                    <p className='text-sm mb-4'>{gossip.person1.about}</p>
                    <div className='flex flex-wrap gap-2 justify-center'>
                      {gossip.person1.interests.map((interest) => (
                        <span
                          key={interest}
                          className='px-3 py-1 bg-custom-coral/20 rounded-full text-xs'
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Heart className='w-16 h-16 text-custom-coral fill-custom-coral' />

                  <div className='text-center'>
                    <div className='relative w-40 h-40 mx-auto mb-4'>
                      <Image
                        src={gossip.person2.image || '/placeholder.svg'}
                        alt={gossip.person2.name}
                        fill
                        className='rounded-full object-cover border-4 border-custom-coral'
                      />
                    </div>
                    <h2 className='text-2xl font-semibold mb-2'>
                      {gossip.person2.name}
                    </h2>
                    <div className='text-lg text-muted-foreground mb-1'>
                      {gossip.person2.year}
                    </div>
                    <div className='text-lg text-muted-foreground mb-4'>
                      {gossip.person2.major}
                    </div>
                    <p className='text-sm mb-4'>{gossip.person2.about}</p>
                    <div className='flex flex-wrap gap-2 justify-center'>
                      {gossip.person2.interests.map((interest) => (
                        <span
                          key={interest}
                          className='px-3 py-1 bg-custom-coral/20 rounded-full text-xs'
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Content - Scrollable */}
          <div className='col-start-2 min-h-screen relative'>
            <div className='p-6 pb-24'>
              <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-semibold'>Comments</h2>
              </div>
              <CommentList comments={gossip.comments} />
            </div>

            {/* Fixed Comment Input */}
            <div className='fixed bottom-0 right-0 left-[400px] bg-background border-t p-4'>
              <form onSubmit={handleSubmitComment} className='flex gap-4'>
                <Input
                  placeholder='Add a comment...'
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className='bg-background'
                />
                <Button
                  type='submit'
                  className='bg-custom-coral hover:bg-custom-coral/90'
                >
                  <Send className='w-4 h-4 mr-2' />
                  Send
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
