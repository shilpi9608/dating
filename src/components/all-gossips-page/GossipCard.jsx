'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, TrendingUp, Clock, Users, MessageSquare } from 'lucide-react';
import Link from 'next/link';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export function GossipCard({ gossip }) {
  return (
    <Card className='overflow-hidden border-0 shadow-lg bg-white/90 backdrop-blur-sm border border-pink-100/50 hover:shadow-xl transition-all duration-300 group rounded-2xl min-h-[300px]'>
      <CardContent className='p-0'>
        {/* Top gradient bar */}
        <div className='h-2 bg-gradient-to-r from-orange-400 to-pink-400'></div>

        <div className='p-6 flex flex-col gap-6'>
          {/* People involved */}
          <div className='flex items-center justify-between'>
            {/* Person 1 */}
            <div className='flex items-center gap-3'>
              <div className='relative'>
                <div className='w-12 h-12 rounded-full bg-gradient-to-br from-orange-300 to-pink-300 flex items-center justify-center text-white text-lg font-bold shadow-md'>
                  {gossip.person1.name?.charAt(0)}
                </div>
                <div className='absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white flex items-center justify-center shadow'>
                  <span className='text-[10px] font-bold text-amber-900'>
                    {gossip.person1.year}
                  </span>
                </div>
              </div>
              <div>
                <p className='font-semibold text-amber-900'>
                  {gossip.person1.name}
                </p>
                <p className='text-xs text-amber-700'>
                  Year {gossip.person1.year}
                </p>
              </div>
            </div>

            <Users className='w-6 h-6 text-pink-400' />

            {/* Person 2 */}
            <div className='flex items-center gap-3'>
              <div className='text-right'>
                <p className='font-semibold text-amber-900'>
                  {gossip.person2.name}
                </p>
                <p className='text-xs text-amber-700'>
                  Year {gossip.person2.year}
                </p>
              </div>
              <div className='relative'>
                <div className='w-12 h-12 rounded-full bg-gradient-to-br from-pink-300 to-purple-300 flex items-center justify-center text-white text-lg font-bold shadow-md'>
                  {gossip.person2.name?.charAt(0)}
                </div>
                <div className='absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white flex items-center justify-center shadow'>
                  <span className='text-[10px] font-bold text-amber-900'>
                    {gossip.person2.year}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Gossip preview (content not shown in object) */}
          <Link key={gossip._id} href={`/gossips/${gossip._id}`}>
            <div className='bg-gradient-to-r cursor-pointer from-orange-50 to-pink-50 rounded-xl p-4 shadow-inner'>
              <p className='text-amber-900 cursor-pointer text-md leading-relaxed italic'>
                Click to view the full gossip...
              </p>
            </div>
          </Link>

          {/* Footer with likes, comments, and date */}
          <div className='flex items-center justify-between pt-2'>
            <div className='flex items-center gap-3'>
              <Badge
                className='bg-gradient-to-r from-orange-200 to-pink-200 text-amber-900 border-0 px-3 py-1 text-xs'
                variant='secondary'
              >
                <TrendingUp className='w-3 h-3 mr-1' />
                {gossip.likes.length > 10
                  ? 'Hot'
                  : gossip.likes.length > 5
                  ? 'Trending'
                  : 'New'}
              </Badge>

              <div className='flex items-center text-xs text-amber-700 gap-1 ml-2'>
                <MessageSquare className='w-3 h-3' />
                <span>{gossip.comments.length}</span>
              </div>
            </div>

            <div className='text-sm text-amber-700 flex items-center'>
              <Clock className='w-3 h-3 mr-1' />
              {formatDate(gossip.createdAt)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
