'use client';

import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Heart, Image, Send, Smile } from 'lucide-react';

const mockMessages = [
  {
    id: '1',
    sender: 'match',
    content: "Hey there! How's your day going? 😊",
    time: '10:30 AM',
  },
  {
    id: '2',
    sender: 'user',
    content: "Hi! It's going well, thanks for asking. How about yours? 💕",
    time: '10:32 AM',
  },
  {
    id: '3',
    sender: 'match',
    content:
      "Pretty good! I was wondering if you'd like to grab coffee sometime this week? ☕",
    time: '10:35 AM',
  },
];

const mockUsers = {
  1: { name: 'Alice', avatar: '/alice-avatar.jpg', status: 'online' },
  2: { name: 'Bob', avatar: '/bob-avatar.jpg', status: 'offline' },
  3: { name: 'Charlie', avatar: '/charlie-avatar.jpg', status: 'online' },
};

export default function ChatWindow({ chatId, onBack }) {
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const user = mockUsers[chatId] || mockUsers['1'];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: Date.now().toString(),
        sender: 'user',
        content: newMessage,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setMessages([...messages, newMsg]);
      setNewMessage('');

      // Simulate reply
      setIsTyping(true);
      setTimeout(() => {
        const replyMsg = {
          id: (Date.now() + 1).toString(),
          sender: 'match',
          content:
            "That sounds great! I'm looking forward to our conversation! 😊",
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };
        setMessages((prev) => [...prev, replyMsg]);
        setIsTyping(false);
      }, 3000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className='flex flex-col h-full bg-background relative'>
      <div className='chat-header p-4 flex items-center'>
        {onBack && (
          <Button
            variant='ghost'
            size='icon'
            onClick={onBack}
            className='mr-2 md:hidden text-textColor hover:text-textColor hover:bg-[#de6b48]/50'
          >
            <ArrowLeft className='h-6 w-6' />
          </Button>
        )}
        <Avatar className='w-12 h-12 border-2 border-black'>
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className='bg-primaryBtn/80 text-textColor font-bold'>
            {user.name[0]}
          </AvatarFallback>
        </Avatar>
        <div className='ml-4'>
          <h2 className='text-xl font-bold text-textColor'>{user.name}</h2>
          <div className='flex items-center'>
            <div
              className={`w-2 h-2 rounded-full mr-2 ${
                user.status === 'online' ? 'bg-green-400' : 'bg-gray-400'
              }`}
            ></div>
            <span className='text-xs text-textColor/80'>
              {user.status === 'online' ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
        <div className='ml-auto'>
          <Heart className='text-textColor fill-textColor hover:fill-textColor transition-all cursor-pointer' />
        </div>
      </div>

      <div className='flex-grow overflow-y-auto p-6 space-y-6 bg-[url("/placeholder.svg?height=500&width=500")] bg-opacity-5 bg-fixed bg-center'>
        <div className='text-center'>
          <span className='inline-block px-4 py-1 rounded-full bg-[#de6b48]/20 text-[#de6b48] text-xs'>
            Today
          </span>
        </div>

        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`flex flex-col ${
              message.sender === 'user' ? 'items-end' : 'items-start'
            } space-y-1`}
          >
            <div
              className={
                message.sender === 'user'
                  ? 'chat-bubble-user'
                  : 'chat-bubble-match'
              }
            >
              {message.content}
            </div>
            <span className='text-xs text-gray-500 px-2'>{message.time}</span>
          </div>
        ))}

        {isTyping && (
          <div className='flex items-start space-y-1'>
            <div className='chat-bubble-match flex items-center space-x-1'>
              <div
                className='w-2 h-2 bg-gray-600 rounded-full animate-bounce'
                style={{ animationDelay: '0ms' }}
              ></div>
              <div
                className='w-2 h-2 bg-gray-600 rounded-full animate-bounce'
                style={{ animationDelay: '150ms' }}
              ></div>
              <div
                className='w-2 h-2 bg-gray-600 rounded-full animate-bounce'
                style={{ animationDelay: '300ms' }}
              ></div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className='p-4 bg-secondaryBackground border-t-2 border-black'>
        <div className='flex items-center gap-2'>
          <Button
            variant='ghost'
            className='rounded-full p-2 bg-secondaryBackground/40 border-2 border-black hover:bg-textColor/80'
          >
            <Image size={20} className='text-[#de6b48]' />
          </Button>
          <Button
            variant='ghost'
            className='rounded-full p-2 bg-secondaryBackground/40 border-2 border-black hover:bg-textColor/80'
          >
            <Smile size={20} className='text-[#de6b48]' />
          </Button>

          <Input
            type='text'
            placeholder='Type a message...'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className='chat-input flex-grow'
          />

          <Button
            onClick={handleSendMessage}
            className='send-button  bg-textColor'
            disabled={!newMessage.trim()}
          >
            <Send className='h-5 w-5' />
          </Button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className='absolute top-1/4 right-6 opacity-10'>
        <Heart size={24} className='text-[#de6b48]' />
      </div>
      <div className='absolute bottom-1/4 left-6 opacity-10'>
        <Heart size={24} className='text-[#de6b48]' />
      </div>
    </div>
  );
}
