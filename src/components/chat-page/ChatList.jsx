'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, Search, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';

const mockChats = [
  {
    id: '1',
    name: 'Alice',
    lastMessage: 'Hey, how are you?',
    avatar: '/alice-avatar.jpg',
    time: '2m ago',
  },
  {
    id: '2',
    name: 'Bob',
    lastMessage: 'Want to grab coffee?',
    avatar: '/bob-avatar.jpg',
    time: '1h ago',
  },
  {
    id: '3',
    name: 'Charlie',
    lastMessage: 'See you at the library!',
    avatar: '/charlie-avatar.jpg',
    time: '3h ago',
  },
  {
    id: '4',
    name: 'Diana',
    lastMessage: 'The movie was amazing!',
    avatar: '/placeholder.svg?height=100&width=100',
    time: 'Yesterday',
  },
  {
    id: '5',
    name: 'Ethan',
    lastMessage: 'Thanks for the recommendation!',
    avatar: '/placeholder.svg?height=100&width=100',
    time: 'Yesterday',
  },
];

export default function ChatList({ onSelectChat }) {
  const [chats, setChats] = useState(mockChats);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectChat = (id) => {
    setSelectedId(id);
    onSelectChat(id);
  };

  return (
    <div className='h-full flex flex-col'>
      <div className='p-4 bg-[#de6b48] border-b-2 border-black'>
        <h2 className='text-2xl font-bold text-white flex items-center gap-2 mb-4'>
          <Heart className='h-6 w-6 fill-white' /> Your Matches
        </h2>
        <div className='relative'>
          <Input
            className='chat-input pl-10 w-full'
            placeholder='Search matches...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search
            className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
            size={18}
          />
        </div>
      </div>

      <div className='flex items-center justify-between px-4 py-2 bg-[#de6b48]/20 border-b-2 border-black'>
        <div className='flex items-center gap-2 text-[#de6b48] font-medium'>
          <Users size={16} />
          <span>{filteredChats.length} Matches</span>
        </div>
        <span className='text-xs text-[#de6b48]/70'>Online: 3</span>
      </div>

      <div className='flex-1 overflow-y-auto'>
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <div
              key={chat.id}
              className={`chat-list-item flex items-center p-4 cursor-pointer ${
                selectedId === chat.id ? 'bg-[#de6b48]/20' : ''
              }`}
              onClick={() => handleSelectChat(chat.id)}
            >
              <div className='relative'>
                <Avatar className='w-14 h-14 border-2 border-black'>
                  <AvatarImage src={chat.avatar} alt={chat.name} />
                  <AvatarFallback className='bg-[#f4978e] text-white font-bold'>
                    {chat.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className='absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border border-black'></div>
              </div>
              <div className='ml-4 flex-1'>
                <div className='flex justify-between items-center'>
                  <h3 className='font-bold text-textColor'>{chat.name}</h3>
                  <span className='text-xs text-[#de6b48]'>{chat.time}</span>
                </div>
                <p className='text-sm text-black/70 truncate'>
                  {chat.lastMessage}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className='flex flex-col items-center justify-center h-full p-4 text-center'>
            <Heart className='text-[#de6b48] mb-2' size={32} />
            <p className='text-[#de6b48]'>No matches found</p>
          </div>
        )}
      </div>
    </div>
  );
}
