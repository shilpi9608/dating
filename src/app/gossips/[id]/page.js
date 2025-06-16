'use client';

import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  Heart,
  Send,
  MessageCircle,
  MoreHorizontal,
  Crown,
} from 'lucide-react';
import Background from '@/components/gossip-page/Background';
import Image from 'next/image';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';

export default function GossipPage({ params }) {
  const { id } = React.use(params);
  const commentInputRef = useRef(null);
  const [comment, setComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [gossip, setGossip] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState([]);

  // Fetch gossip data
  useEffect(() => {
    const fetchGossip = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const res = await axios.post('/api/gossip/get', { id });
        if (res.data.gossip) {
          setGossip(res.data.gossip);
          setComments(res.data.gossip.comments || []);
          setLikes(res.data.gossip.likes || []);
        }
      } catch (error) {
        console.error('Error fetching gossip:', error);
      } finally {
        console.log(gossip);
        setLoading(false);
      }
    };

    fetchGossip();
  }, [id]);

  // Handle like action for gossip
  const handleGossipLike = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post(
        '/api/gossip/likes',
        { gossipId: id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data.success) {
        setLikes(res.data.likes);
      }
    } catch (error) {
      console.error('Error toggling gossip like:', error);
      if (
        error.response?.data?.error === 'You have already liked this gossip.'
      ) {
        // Handle already liked case if needed
      }
    }
  };

  // Handle comment submission
  const handleSubmitComment = async (e) => {
    const token = localStorage.getItem('token');
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      const res = await axios.post(
        '/api/gossip/comment',
        {
          gossipId: id,
          content: comment,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 201) {
        setComments([res.data.comment, ...comments]);
        setComment('');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  // Handle reply submission
  const handleSubmitReply = async (commentId) => {
    const token = localStorage.getItem('token');
    if (!replyText.trim()) return;

    try {
      const res = await axios.post(
        '/api/gossip/reply',
        {
          gossipId: id,
          commentIndex: replyingTo,
          content: replyText,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 201) {
        setComments(
          comments.map((c, i) => {
            if (i === commentId) {
              return {
                ...c,
                reply: [...(c.reply || []), res.data.reply], // safely handle undefined
              };
            }
            return c;
          })
        );
        setReplyingTo(null);
        setReplyText('');
      }
    } catch (error) {
      console.error('Error posting reply:', error);
    }
  };

  // Get total comment count
  const getCommentCount = () => {
    return comments.reduce(
      (total, comment) => total + 1 + (comment.reply?.length || 0),
      0
    );
  };

  // Handle Reply Toggle
  const handleReply = (commentId) => {
    // Toggle reply field: close if already open for same comment
    if (replyingTo === commentId) {
      setReplyingTo(null);
      setReplyText('');
    } else {
      setReplyingTo(commentId);
      setReplyText('');
    }
  };

  // Format time
  const formatTime = (input) => {
    let timestamp;

    if (typeof input === 'object' && input?.$date?.$numberLong) {
      timestamp = Number(input.$date.$numberLong);
    } else if (typeof input === 'string' || typeof input === 'number') {
      timestamp = input;
    }

    const date = new Date(timestamp);

    if (isNaN(date)) return 'Invalid date';

    return formatDistanceToNow(date, { addSuffix: true });
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-[#FFF3E0] flex items-center justify-center'>
        <p>Loading gossip...</p>
      </div>
    );
  }

  if (!gossip) {
    return (
      <div className='min-h-screen bg-[#FFF3E0] flex items-center justify-center'>
        <p>Gossip not found</p>
      </div>
    );
  }

  const isGossipLiked = false;
  const gossipLikesCount = likes.length;

  return (
    <div className='min-h-screen bg-[#FFF3E0] relative overflow-hidden'>
      <Background />
      <main className='container mx-auto px-4 py-8'>
        <div className='flex flex-col xl:flex-row gap-8'>
          {/* Left Panel - Profiles and Gossip */}
          <div className='xl:w-2/5 flex justify-center flex-col space-y-6'>
            <div className='relative w-full flex items-center justify-center mb-8'>
              <div className='relative w-full h-44'>
                {/* Person 1 Circle */}
                <div className='absolute left-1/2 transform -translate-x-[85%] z-10'>
                  <div className='relative'>
                    <div className='absolute inset-0 rounded-full bg-gradient-to-r from-pink-300 to-pink-400 blur-md transform scale-110'></div>
                    <Avatar className='h-48 w-48 border-4 border-white'>
                      <AvatarImage
                        src={gossip.person1.avatar}
                        alt={gossip.person1.name}
                      />
                      <AvatarFallback className='bg-pink-200 text-4xl'>
                        {gossip.person1.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className='absolute bottom-0 left-0 bg-pink-100 rounded-full px-4 py-2 text-sm font-bold border-2 border-white shadow-md'>
                    <div>{gossip.person1.name}</div>
                    <div className='text-xs text-pink-600'>
                      {gossip.person1.year}
                    </div>
                  </div>
                </div>

                {/* Person 2 Circle */}
                <div className='absolute left-1/2 transform -translate-x-[5%] z-10'>
                  <div className='relative'>
                    <div className='absolute inset-0 rounded-full bg-gradient-to-r from-blue-300 to-purple-400 blur-md transform scale-110'></div>
                    <Avatar className='h-48 w-48 border-4 border-white'>
                      <AvatarImage
                        src={gossip.person2.avatar}
                        alt={gossip.person2.name}
                      />
                      <AvatarFallback className='bg-blue-200 text-4xl'>
                        {gossip.person2.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className='absolute bottom-0 right-0 bg-blue-100 rounded-full px-4 py-2 text-sm font-bold border-2 border-white shadow-md'>
                    <div>{gossip.person2.name}</div>
                    <div className='text-xs text-blue-600'>
                      {gossip.person2.year}
                    </div>
                  </div>
                </div>

                {/* Question Mark */}
                <div className='absolute left-[45%] top-14 z-20 bg-yellow-300 rounded-full h-20 w-20 flex items-center justify-center border-4 border-white shadow-lg animate-pulse'>
                  <Image
                    src='/question.svg'
                    alt='question'
                    width={70}
                    height={70}
                  />
                </div>
              </div>
            </div>

            {/* Gossip Content */}
            <Card className='bg-white/80 backdrop-blur-sm rounded-2xl border-pink-200 overflow-hidden'>
              <CardHeader className='bg-gradient-to-r from-pink-100 to-pink-200 pb-2'>
                <h3 className='text-md font-bold'>Campus Whispers</h3>
              </CardHeader>
              <CardContent className='p-4'>
                <p className='text-lg mb-4'>{gossip.content}</p>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-gray-500'>
                    {formatTime(gossip.createdAt)}
                  </span>
                  <Button
                    variant='ghost'
                    size='sm'
                    className={`flex items-center ${
                      isGossipLiked ? 'text-pink-500' : 'text-gray-500'
                    }`}
                    onClick={handleGossipLike}
                  >
                    <Heart
                      className='h-4 w-4 mr-1'
                      fill={isGossipLiked ? '#FFB6C1' : 'none'}
                    />
                    {gossipLikesCount > 0 && gossipLikesCount}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Additional Info Cards */}
            <div className='hidden xl:block space-y-4'>
              <Card className='bg-white/80 backdrop-blur-sm rounded-2xl border-pink-100 overflow-hidden'>
                <CardHeader className='bg-gradient-to-r from-pink-100 to-pink-200 pb-2'>
                  <h3 className='text-md font-bold'>
                    About {gossip.person1.name}
                  </h3>
                </CardHeader>
                <CardContent className='p-4'>
                  <p className='text-sm'>
                    <span className='font-bold'>Major:</span>{' '}
                    {gossip.person1.major}
                  </p>
                  <p className='text-sm'>
                    <span className='font-bold'>Year:</span>{' '}
                    {gossip.person1.year}
                  </p>
                  <p className='text-sm mt-2'>
                    Known for always carrying a cute teddy bear keychain and
                    acing all her coding assignments!
                  </p>
                </CardContent>
              </Card>

              <Card className='bg-white/80 backdrop-blur-sm rounded-2xl border-blue-100 overflow-hidden'>
                <CardHeader className='bg-gradient-to-r from-blue-100 to-blue-200 pb-2'>
                  <h3 className='text-md font-bold'>
                    About {gossip.person2.name}
                  </h3>
                </CardHeader>
                <CardContent className='p-4'>
                  <p className='text-sm'>
                    <span className='font-bold'>Major:</span>{' '}
                    {gossip.person2.major}
                  </p>
                  <p className='text-sm'>
                    <span className='font-bold'>Year:</span>{' '}
                    {gossip.person2.year}
                  </p>
                  <p className='text-sm mt-2'>
                    Star of the engineering department and always seen at the
                    campus coffee shop studying late!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Panel - Comments */}
          <div className='xl:w-3/5'>
            <Card className='bg-white/90 backdrop-blur-sm rounded-3xl border-pink-200 overflow-hidden shadow-xl'>
              <CardHeader className='bg-gradient-to-r from-pink-200 to-purple-200 pb-2'>
                <h2 className='text-xl font-bold flex items-center gap-2'>
                  <MessageCircle className='text-pink-500' size={18} />
                  Campus Tea ({getCommentCount()})
                </h2>
              </CardHeader>
              <CardContent className='p-0'>
                <form
                  onSubmit={handleSubmitComment}
                  className='p-4 border-b border-pink-100 flex gap-2'
                >
                  <Input
                    ref={commentInputRef}
                    placeholder='Spill the tea...'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className='rounded-full border-pink-200'
                  />
                  <Button
                    type='submit'
                    size='icon'
                    className='rounded-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 transition-all'
                  >
                    <Send size={18} className='text-white' />
                  </Button>
                </form>

                <div className='max-h-[600px] overflow-y-auto'>
                  {comments.map((comment, idx) => {
                    return (
                      <div key={idx} className='border-b border-pink-100'>
                        {/* Main comment */}
                        <div className='p-4 hover:bg-pink-50/30 transition-colors'>
                          <div className='flex gap-3'>
                            <div className='flex-1'>
                              <div className='flex justify-between items-start'>
                                <div className='flex items-center'>
                                  <span className='font-semibold text-sm'>
                                    {comment.username}
                                  </span>
                                  {comment.username === 'shilpi' && (
                                    <span className='ml-1 bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded-full flex items-center'>
                                      <Crown
                                        className='h-3 w-3 mr-1 text-yellow-500'
                                        fill='#FFD700'
                                      />
                                      Cutest
                                    </span>
                                  )}
                                  <span className='text-xs text-gray-500 ml-2'>
                                    {formatTime(comment.time)}
                                  </span>
                                </div>
                                <Button
                                  variant='ghost'
                                  size='icon'
                                  className='h-6 w-6'
                                >
                                  <MoreHorizontal size={14} />
                                </Button>
                              </div>
                              <p className='text-sm mt-1'>{comment.content}</p>
                              <div className='flex gap-4 mt-2'>
                                <Button
                                  variant='ghost'
                                  size='sm'
                                  className='h-6 text-xs text-gray-500 hover:text-blue-500'
                                  onClick={() => handleReply(idx)}
                                >
                                  Reply
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Reply form */}
                        {replyingTo === idx && (
                          <div className='pl-12 pr-4 pb-3 bg-blue-50/30'>
                            <div className='flex gap-2'>
                              <Input
                                placeholder={`Reply to ${comment.username}...`}
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                className='rounded-full border-blue-200 text-xs h-8'
                                autoFocus
                              />
                              <Button
                                size='sm'
                                className='h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white'
                                onClick={() => handleSubmitReply(idx)}
                              >
                                Reply
                              </Button>
                            </div>
                          </div>
                        )}

                        {/* reply */}
                        {comment.reply?.length > 0 && replyingTo === idx && (
                          <div className='pl-12 pr-4 pb-2 bg-gray-50/50'>
                            {comment.reply.map((reply, i) => {
                              return (
                                <div
                                  key={i}
                                  className='py-3 border-t border-gray-100'
                                >
                                  <div className='flex gap-2'>
                                    <div className='flex-1'>
                                      <div className='flex justify-between items-start'>
                                        <div>
                                          <span className='font-semibold text-xs'>
                                            {reply.username}
                                          </span>
                                          <span className='text-xs text-gray-500 ml-2'>
                                            {formatTime(reply.time)}
                                          </span>
                                        </div>
                                      </div>
                                      <p className='text-xs mt-1'>
                                        {reply.content}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
              <CardFooter className='bg-gradient-to-r from-pink-100 to-purple-100 p-3 text-center text-xs text-gray-500'>
                <p className='w-full'>
                  End of comments • Keep the tea hot but friendly! 🔥
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
}
