'use client';
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CommentList } from '@/components/gossip-page/CommentList';

export const GossipChat = ({ gossip }) => {
  const [newComment, setNewComment] = useState('');
  const handleSubmitComment = (e) => {
    e.preventDefault();
    // Add comment logic here
    setNewComment('');
  };
  return (
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
  );
};
