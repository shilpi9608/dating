'use client';

import React from 'react';

import { useState } from 'react';
import { MessageCircle, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function CommentList({ comments }) {
  const [expandedComments, setExpandedComments] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');

  const toggleReplies = (commentId) => {
    setExpandedComments((prev) =>
      prev.includes(commentId)
        ? prev.filter((id) => id !== commentId)
        : [...prev, commentId]
    );
  };

  const handleReply = (commentId) => {
    setReplyingTo(commentId);
    setReplyContent('');
  };

  const submitReply = (commentId, e) => {
    e.preventDefault();
    // Add reply logic here
    setReplyingTo(null);
    setReplyContent('');
  };

  return (
    <div className='space-y-6'>
      {comments.map((comment) => (
        <div key={comment.id} className='space-y-4'>
          <div className='bg-background rounded-lg p-4'>
            <div className='flex justify-between mb-2'>
              <span className='font-medium'>{comment.author}</span>
              <span className='text-sm text-muted-foreground'>
                {comment.timestamp}
              </span>
            </div>
            <p className='text-sm mb-2'>{comment.content}</p>
            <div className='flex gap-4'>
              <Button
                variant='ghost'
                size='sm'
                className='text-muted-foreground'
                onClick={() => handleReply(comment.id)}
              >
                <MessageCircle className='w-4 h-4 mr-2' />
                Reply
              </Button>
              {comment.replies && comment.replies.length > 0 && (
                <Button
                  variant='ghost'
                  size='sm'
                  className='text-muted-foreground'
                  onClick={() => toggleReplies(comment.id)}
                >
                  {expandedComments.includes(comment.id) ? (
                    <ChevronDown className='w-4 h-4 mr-2' />
                  ) : (
                    <ChevronRight className='w-4 h-4 mr-2' />
                  )}
                  {comment.replies.length} replies
                </Button>
              )}
            </div>
            {replyingTo === comment.id && (
              <form
                onSubmit={(e) => submitReply(comment.id, e)}
                className='mt-4 flex gap-2'
              >
                <Input
                  placeholder='Write a reply...'
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className='bg-background'
                />
                <Button
                  type='submit'
                  className='bg-custom-coral hover:bg-custom-coral/90'
                >
                  Reply
                </Button>
              </form>
            )}
          </div>
          {comment.replies && expandedComments.includes(comment.id) && (
            <div className='ml-8 space-y-4'>
              {comment.replies.map((reply) => (
                <div key={reply.id} className='bg-background rounded-lg p-4'>
                  <div className='flex justify-between mb-2'>
                    <span className='font-medium'>{reply.author}</span>
                    <span className='text-sm text-muted-foreground'>
                      {reply.timestamp}
                    </span>
                  </div>
                  <p className='text-sm'>{reply.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
