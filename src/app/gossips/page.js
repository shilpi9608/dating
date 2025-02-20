'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GossipCard } from '@/components/gossip-page/GossipCard';
import { useState } from 'react';
import { CreateGossipDialog } from '@/components/gossip-page/CreateGossip';

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const gossips = [
    {
      id: 1,
      person1: {
        name: 'Sarah Johnson',
        year: 'Junior',
        image: '/placeholder.svg?height=100&width=100',
      },
      person2: {
        name: 'Mike Smith',
        year: 'Senior',
        image: '/placeholder.svg?height=100&width=100',
      },
      commentsCount: 15,
    },
    {
      id: 2,
      person1: {
        name: 'Emily Davis',
        year: 'Sophomore',
        image: '/placeholder.svg?height=100&width=100',
      },
      person2: {
        name: 'Alex Turner',
        year: 'Freshman',
        image: '/placeholder.svg?height=100&width=100',
      },
      commentsCount: 8,
    },
  ];

  return (
    <main className='container mx-auto p-4 min-h-screen bg-gradient-to-b from-custom-pink to-custom-beige'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-2xl font-bold text-foreground'>College Gossip</h1>
        <Button
          className='bg-custom-coral hover:bg-custom-coral/90'
          onClick={() => setIsDialogOpen(true)}
        >
          Create New Gossip
        </Button>
      </div>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {gossips.map((gossip) => (
          <GossipCard key={gossip.id} gossip={gossip} />
        ))}
      </div>

      <CreateGossipDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </main>
  );
}
