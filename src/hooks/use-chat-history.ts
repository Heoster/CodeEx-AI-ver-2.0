'use client';

import {useState, useEffect, useCallback} from 'react';
import {useLocalStorage} from './use-local-storage';
import {type Chat, type Message} from '@/lib/types';
import {useAuth} from './use-auth';

const getUserStorageKey = (userId: string, key: string) => `${userId}_${key}`;

export function useChatHistory() {
  const {user} = useAuth();
  const userId = user?.uid;

  // The useLocalStorage hook will automatically update when the key (containing userId) changes.
  const [chats, setChats] = useLocalStorage<Chat[]>(
    userId ? getUserStorageKey(userId, 'chats') : 'fallback_chats', // Provide a non-null key
    []
  );
  const [messages, setMessages] = useLocalStorage<Record<string, Message[]>>(
    userId ? getUserStorageKey(userId, 'messages') : 'fallback_messages', // Provide a non-null key
    {}
  );

  const [activeChatId, setActiveChatId] = useState<string>('');

  // When chats load or change, set the active chat
  useEffect(() => {
    if (!userId) {
      // Clear active chat if user logs out
      setActiveChatId('');
      return;
    }
    if (chats && chats.length > 0) {
      // Ensure active chat is valid, otherwise default to the first one.
      const activeChatExists = chats.some(c => c.id === activeChatId);
      if (!activeChatExists) {
        // sort by `updatedAt` to ensure the most recent is first.
        const sortedChats = [...chats].sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
        setActiveChatId(sortedChats[0].id);
      }
    } else if (chats.length === 0) {
      // If there are no chats for the user, create a new one.
      createNewChat();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chats, activeChatId, userId]); // Dependencies are correct

  const createNewChat = useCallback(() => {
    if (!userId) return;

    const newChat: Chat = {
      id: crypto.randomUUID(),
      userId,
      title: 'New Chat',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const initialMessage: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: 'How can I help you today?',
      createdAt: new Date().toISOString(),
    };

    // Prepend to chats array
    setChats(prevChats => [newChat, ...prevChats]);
    setMessages(prevMessages => ({
      ...prevMessages,
      [newChat.id]: [initialMessage],
    }));
    setActiveChatId(newChat.id);
  }, [userId, setChats, setMessages]);

  const deleteAllUserChats = () => {
    if (!userId) return;
    setChats([]);
    setMessages({});
    createNewChat();
  };

  const addMessage = (
    chatId: string,
    message: Omit<Message, 'id' | 'createdAt'>,
    newTitle?: string
  ) => {
    if (!userId) return;

    const newMessage: Message = {
      ...message,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    setMessages(prev => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), newMessage],
    }));

    setChats(prev =>
      prev.map(chat =>
        chat.id === chatId
          ? {
              ...chat,
              title: newTitle ?? chat.title,
              updatedAt: new Date().toISOString(),
            }
          : chat
      )
    );
  };

  const activeChat = chats.find(c => c.id === activeChatId);
  const activeChatMessages = messages[activeChatId] || [];

  return {
    chats: chats.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    ), // Always return sorted chats
    activeChat,
    activeChatId,
    setActiveChatId,
    activeChatMessages,
    createNewChat,
    deleteAllUserChats,
    addMessage,
  };
}
