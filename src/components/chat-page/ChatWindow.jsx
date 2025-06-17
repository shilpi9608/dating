'use client';

import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Heart, Image, Send, Smile } from 'lucide-react';

export default function ChatWindow({ chatId, onBack }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false); // can use for real-time; here unused
  const [userId, setUserId] = useState(null);
  const [otherUser, setOtherUser] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);
  const emojiPickerRef = useRef(null);

  // Simple emoji list; add more as desired
  const emojis = [
    '😂',
    '❤️',
    '😘',
    '🥰',
    '😍',
    '🤣',
    '😊',
    '🔥',
    '😉',
    '😅',
    '😇',
    '🥺',
    '💖',
    '💕',
    '💯',
    '😜',
    '🤗',
    '☺️',
    '👀',
    '✨',
    '💘',
    '😄',
    '😚',
    '💞',
    '😻',
    '😢',
    '😛',
    '💓',
    '💗',
    '🎉',
    '💋',
    '🌹',
    '💐',
    '💝',
    '🤭',
    '🤤',
  ];

  // Auto scroll to bottom on new messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch match messages on mount or when chatId changes
  useEffect(() => {
    const fetchChat = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token for fetching chat');
          return;
        }
        // Adjust path if needed:
        const res = await axios.get(`/api/match/${chatId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 201) {
          const { match, userId: uid } = res.data;
          setUserId(uid);

          // Determine the other participant
          const other =
            match.person1._id === uid ? match.person2 : match.person1;

          setOtherUser({
            id: other._id,
            name: other.personalInformation?.name || 'Unknown',
            avatar:
              other.personalInformation?.avatar ||
              '/placeholder.svg?height=100&width=100',
            status: 'online', // could fetch real status separately
          });

          // Structure messages into local format
          const structuredMessages = match.messages.map((msg) => ({
            id: msg._id,
            sender: msg.sender === uid ? 'user' : 'match',
            content: msg.content,
            time: new Date(msg.time).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          }));

          setMessages(structuredMessages);
        } else {
          console.error('Failed to fetch chat:', res.status, res.data);
        }
      } catch (err) {
        console.error('Failed to fetch chat:', err);
      }
    };

    if (chatId) {
      fetchChat();
    }
  }, [chatId]);

  // Click outside emoji picker closes it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(e.target)
      ) {
        setShowEmojiPicker(false);
      }
    };
    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);

  const handleSendMessage = async () => {
    const content = newMessage.trim();
    if (!content) return;

    // Optimistically append? Or wait for response? Here we'll wait for response to ensure saved.
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token for sending message');
        return;
      }
      // POST to backend
      const res = await axios.post(
        `/api/match/${chatId}/messages`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 201) {
        const returned = res.data.message;
        // Append returned message
        setMessages((prev) => [
          ...prev,
          {
            id: returned._id,
            sender: returned.sender === userId ? 'user' : 'match',
            content: returned.content,
            time: new Date(returned.time).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          },
        ]);
        setNewMessage('');
        setShowEmojiPicker(false);
      } else {
        console.error('Failed to send message:', res.status, res.data);
      }
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const handleEmojiClick = (emoji) => {
    // Insert emoji at cursor position or at end
    // For simplicity, append at end:
    setNewMessage((prev) => prev + emoji);
    // Keep picker open for multiple selections, or close after one:
    // setShowEmojiPicker(false);
  };

  if (!otherUser) {
    return <div className='p-4 text-center text-lg'>Loading chat...</div>;
  }

  return (
    <div className='flex flex-col h-full bg-background relative'>
      {/* Header */}
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
          <AvatarImage src={otherUser.avatar} alt={otherUser.name} />
          <AvatarFallback className='bg-primaryBtn/80 text-textColor font-bold'>
            {otherUser.name[0]}
          </AvatarFallback>
        </Avatar>
        <div className='ml-4'>
          <h2 className='text-xl font-bold text-textColor'>{otherUser.name}</h2>
          <div className='flex items-center'>
            <div
              className={`w-2 h-2 rounded-full mr-2 ${
                otherUser.status === 'online' ? 'bg-green-400' : 'bg-gray-400'
              }`}
            ></div>
            <span className='text-xs text-textColor/80'>
              {otherUser.status === 'online' ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
        <div className='ml-auto'>
          <Heart className='text-textColor fill-textColor hover:fill-textColor transition-all cursor-pointer' />
        </div>
      </div>

      {/* Messages */}
      <div className='flex-grow overflow-y-auto p-6 space-y-6 bg-[url("/placeholder.svg?height=500&width=500")] bg-opacity-5 bg-fixed bg-center'>
        <div className='text-center'>
          <span className='inline-block px-4 py-1 rounded-full bg-[#de6b48]/20 text-[#de6b48] text-xs'>
            Today
          </span>
        </div>

        {messages.map((message) => (
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

      {/* Input + Emoji Picker */}
      <div className='p-4 bg-secondaryBackground border-t-2 border-black relative'>
        <div className='flex items-center gap-2'>
          <Button
            variant='ghost'
            className='rounded-full p-2 bg-secondaryBackground/40 border-2 border-black hover:bg-textColor/80'
            onClick={toggleEmojiPicker}
          >
            <Smile size={20} className='text-[#de6b48]' />
          </Button>
          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div
              ref={emojiPickerRef}
              className='absolute bottom-16 left-4 bg-white border border-gray-300 rounded shadow p-2 grid grid-cols-6 gap-2 z-50 max-w-xs'
            >
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  type='button'
                  onClick={() => handleEmojiClick(emoji)}
                  className='text-xl'
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}

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
            className='send-button bg-textColor'
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
