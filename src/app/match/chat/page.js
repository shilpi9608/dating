'use client';

import ChatList from '@/components/chat-page/ChatList';
import ChatWindow from '@/components/chat-page/ChatWindow';
import { useState } from 'react';

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className='flex h-screen'>
      <div className='w-full md:w-1/3 bg-custom-pink'>
        <ChatList onSelectChat={setSelectedChat} />
      </div>
      <div className='hidden md:block md:w-2/3 bg-custom-beige'>
        {selectedChat ? (
          <ChatWindow chatId={selectedChat} />
        ) : (
          <div className='flex items-center justify-center h-full text-custom-coral text-2xl'>
            Select a chat to start messaging
          </div>
        )}
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
