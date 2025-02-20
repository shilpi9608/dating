import Image from 'next/image';
import Link from 'next/link';
import { Heart, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function GossipCard({ gossip }) {
  return (
    <Link href={`/gossips/${gossip.id}`}>
      <Card className='overflow-hidden hover:shadow-lg transition-shadow bg-custom-orange/20'>
        <CardHeader className='p-4 bg-custom-coral/20'>
          <div className='flex justify-center gap-4 items-center'>
            <div className='text-center'>
              <div className='relative w-16 h-16 mx-auto mb-2'>
                <Image
                  src={gossip.person1.image || '/placeholder.svg'}
                  alt={gossip.person1.name}
                  fill
                  className='rounded-full object-cover'
                />
              </div>
              <div className='font-medium text-sm'>{gossip.person1.name}</div>
              <div className='text-xs text-muted-foreground'>
                {gossip.person1.year}
              </div>
            </div>
            <Heart className='w-8 h-8 text-custom-coral fill-custom-coral' />
            <div className='text-center'>
              <div className='relative w-16 h-16 mx-auto mb-2'>
                <Image
                  src={gossip.person2.image || '/placeholder.svg'}
                  alt={gossip.person2.name}
                  fill
                  className='rounded-full object-cover'
                />
              </div>
              <div className='font-medium text-sm'>{gossip.person2.name}</div>
              <div className='text-xs text-muted-foreground'>
                {gossip.person2.year}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className='p-4'>
          <div className='flex items-center justify-center gap-2 text-muted-foreground'>
            <MessageCircle className='w-4 h-4' />
            <span>{gossip.commentsCount} comments</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
