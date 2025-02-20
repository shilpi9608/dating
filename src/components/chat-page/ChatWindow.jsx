import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Send } from 'lucide-react';

const mockMessages = [
  { id: '1', sender: 'match', content: "Hey there! How's your day going?" },
  {
    id: '2',
    sender: 'user',
    content: "Hi! It's going well, thanks for asking. How about yours?",
  },
  {
    id: '3',
    sender: 'match',
    content:
      "Pretty good! I was wondering if you'd like to grab coffee sometime this week?",
  },
];

export default function ChatWindow({ chatId, onBack }) {
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { id: Date.now().toString(), sender: 'user', content: newMessage },
      ]);
      setNewMessage('');
    }
  };

  return (
    <div className='flex flex-col h-full bg-custom-beige'>
      <div className='bg-custom-pink p-4 flex items-center'>
        {onBack && (
          <Button
            variant='ghost'
            size='icon'
            onClick={onBack}
            className='mr-2 md:hidden'
          >
            <ArrowLeft className='h-6 w-6' />
          </Button>
        )}
        <Avatar className='w-10 h-10 mr-4'>
          <AvatarImage src='/alice-avatar.jpg' alt='Alice' />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <h2 className='text-xl font-semibold text-custom-coral'>Alice</h2>
      </div>
      <div className='flex-grow overflow-y-auto p-4 space-y-4'>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg border-b-4 border-t-2 border-l-2 border-r-4 border-black ${
                message.sender === 'user'
                  ? 'bg-custom-babypink text-white'
                  : 'bg-white text-custom-babypink'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <div className='p-4 bg-custom-pink'>
        <div className='flex items-center'>
          <Input
            type='text'
            placeholder='Type a message...'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className='flex-grow mr-2'
          />
          <Button
            onClick={handleSendMessage}
            className='bg-custom-coral hover:bg-custom-orange'
          >
            <Send className='h-5 w-5' />
          </Button>
        </div>
      </div>
    </div>
  );
}
