import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const mockChats = [
  {
    id: '1',
    name: 'Alice',
    lastMessage: 'Hey, how are you?',
    avatar: '/alice-avatar.jpg',
  },
  {
    id: '2',
    name: 'Bob',
    lastMessage: 'Want to grab coffee?',
    avatar: '/bob-avatar.jpg',
  },
  {
    id: '3',
    name: 'Charlie',
    lastMessage: 'See you at the library!',
    avatar: '/charlie-avatar.jpg',
  },
];

export default function ChatList({ onSelectChat }) {
  const [chats] = useState(mockChats);

  return (
    <div className='h-full overflow-y-auto'>
      <h2 className='text-2xl font-bold p-4 text-custom-coral'>Your Matches</h2>
      {chats.map((chat) => (
        <div
          key={chat.id}
          className='flex items-center p-4 hover:bg-custom-orange cursor-pointer'
          onClick={() => onSelectChat(chat.id)}
        >
          <Avatar className='w-12 h-12 mr-4'>
            <AvatarImage src={chat.avatar} alt={chat.name} />
            <AvatarFallback>{chat.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className='font-semibold text-custom-coral'>{chat.name}</h3>
            <p className='text-sm text-custom-coral opacity-70'>
              {chat.lastMessage}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
