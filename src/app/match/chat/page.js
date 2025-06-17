'use client';

import ChatList from '@/components/chat-page/ChatList';
import ChatWindow from '@/components/chat-page/ChatWindow';
import { useState } from 'react';
import { Heart, MessageCircleHeart } from 'lucide-react';

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className='flex h-screen bg-gradient-to-br from-[#ffefd5] to-[#f7c9c0]'>
      <div className='w-full md:w-1/3 bg-[#e8a87c]/80 backdrop-blur-sm border-r-2 border-black'>
        <ChatList onSelectChat={setSelectedChat} />
      </div>
      <div className='hidden md:block md:w-2/3 bg-[#ffefd5] relative'>
        {selectedChat ? (
          <ChatWindow
            chatId={selectedChat}
            onBack={() => setSelectedChat(null)}
          />
        ) : (
          <div className='flex flex-col items-center justify-center h-full'>
            <div className='empty-state'>
              <Heart
                className='mx-auto mb-4 text-[#de6b48] heart-float'
                size={48}
              />
              <h3 className='text-2xl font-bold text-[#de6b48] mb-2'>
                Start Chatting!
              </h3>
              <p className='text-[#de6b48]/80'>
                Select a match from the list to begin your conversation
              </p>
            </div>
          </div>
        )}

        {/* Decorative elements */}
        <div className='absolute top-10 right-10 opacity-20 rotate-12'>
          <MessageCircleHeart size={40} className='text-[#f4978e]' />
        </div>
        <div className='absolute bottom-10 left-10 opacity-20 -rotate-12'>
          <MessageCircleHeart size={40} className='text-[#f4978e]' />
        </div>
      </div>
      {selectedChat && (
        <div className='fixed inset-0 z-10 md:hidden'>
          <ChatWindow
            chatId={selectedChat}
            onBack={() => setSelectedChat(null)}
          />
        </div>
      )}
    </div>
  );
}
