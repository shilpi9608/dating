'use client';

import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, Search, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import axios from 'axios';

export default function ChatList({ onSelectChat }) {
  const [matches, setMatches] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [userId, setUserId] = useState(null); // Your user ID

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await axios.get('/api/match', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = res.data;
        if (res.status === 201) {
          setUserId(data.userId);
          const processed = data.matches.map((match) => {
            const otherUser =
              match.person1._id === data.userId ? match.person2 : match.person1;
            console.log(match.messages);
            return {
              id: match._id,
              userId: otherUser._id,
              name: otherUser.personalInformation?.name || 'Unknown',
              avatar:
                otherUser.personalInformation?.avatar ||
                '/placeholder.svg?height=100&width=100',
              lastMessage: match.messages?.at(-1)?.content || 'No messages yet',
              time: new Date(match.updatedAt).toLocaleDateString(),
            };
          });
          setMatches(processed);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchMatches();
  }, []);

  const filteredMatches = matches.filter((match) =>
    match.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectChat = (matchId) => {
    setSelectedId(matchId);
    onSelectChat(matchId); // match _id, not userId
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
          <span>{filteredMatches.length} Matches</span>
        </div>
        <span className='text-xs text-[#de6b48]/70'>Online: 3</span>
      </div>

      <div className='flex-1 overflow-y-auto'>
        {filteredMatches.length > 0 ? (
          filteredMatches.map((chat) => (
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
