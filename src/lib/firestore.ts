'use client';

import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
  deleteDoc,
  getDocs,
  writeBatch,
  Timestamp,
} from 'firebase/firestore';
import { app } from '@/lib/firebase';
import { type Chat, type Message } from '@/lib/types';

const db = getFirestore(app);

// ---- CHATS ----

/**
 * Creates a new chat in Firestore for a given user.
 * @param userId - The ID of the user creating the chat.
 * @returns The ID of the newly created chat.
 */
export async function createNewChatInFirestore(userId: string): Promise<string> {
  const newChatRef = await addDoc(collection(db, 'chats'), {
    userId,
    title: 'New Chat',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  // Add the initial assistant message
  await addDoc(collection(newChatRef, 'messages'), {
    role: 'assistant',
    content: 'How can I help you today?',
    createdAt: serverTimestamp(),
  });

  return newChatRef.id;
}

/**
 * Listens for real-time updates to a user's chats.
 * @param userId - The ID of the user whose chats to fetch.
 * @param callback - Function to be called with the updated chats array.
 * @returns An unsubscribe function to stop listening for updates.
 */
export function onChatsSnapshot(
  userId: string,
  callback: (chats: Chat[]) => void
) {
  const q = query(
    collection(db, 'chats'),
    where('userId', '==', userId),
    orderBy('updatedAt', 'desc')
  );

  return onSnapshot(q, snapshot => {
    const chats = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        userId: data.userId,
        title: data.title,
        createdAt: (data.createdAt as Timestamp)?.toDate().toISOString() ?? new Date().toISOString(),
        updatedAt: (data.updatedAt as Timestamp)?.toDate().toISOString() ?? new Date().toISOString(),
      };
    });
    callback(chats);
  });
}

/**
 * Deletes all chats and their messages for a specific user.
 * @param userId - The ID of the user whose chats to delete.
 */
export async function deleteAllUserChats(userId: string) {
  const q = query(collection(db, 'chats'), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);

  const batch = writeBatch(db);
  
  for (const chatDoc of querySnapshot.docs) {
    // Delete subcollection messages
    const messagesCollection = collection(db, 'chats', chatDoc.id, 'messages');
    const messagesSnapshot = await getDocs(messagesCollection);
    messagesSnapshot.forEach(messageDoc => {
      batch.delete(messageDoc.ref);
    });
    // Delete chat doc
    batch.delete(chatDoc.ref);
  }

  await batch.commit();
}

// ---- MESSAGES ----

/**
 * Listens for real-time updates to messages in a specific chat.
 * @param chatId - The ID of the chat.
 * @param callback - Function to be called with the updated messages array.
 * @returns An unsubscribe function to stop listening for updates.
 */
export function onMessagesSnapshot(
  chatId: string,
  callback: (messages: Message[]) => void
) {
  const q = query(
    collection(db, 'chats', chatId, 'messages'),
    orderBy('createdAt', 'asc')
  );

  return onSnapshot(q, snapshot => {
    const messages = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        role: data.role,
        content: data.content,
        createdAt: (data.createdAt as Timestamp)?.toDate().toISOString() ?? new Date().toISOString(),
      };
    });
    callback(messages);
  });
}

/**
 * Adds a new message to a specific chat and updates the chat's timestamp.
 * @param chatId - The ID of the chat.
 * @param message - The message object to add.
 * @param newTitle - Optional new title for the chat.
 */
export async function addMessageToChat(chatId: string, message: Omit<Message, 'id' | 'createdAt'>, newTitle?: string) {
  const chatRef = doc(db, 'chats', chatId);
  const messagesCollection = collection(chatRef, 'messages');
  
  await addDoc(messagesCollection, {
    ...message,
    createdAt: serverTimestamp(),
  });

  const updateData: { updatedAt: any; title?: string } = {
    updatedAt: serverTimestamp(),
  };

  if (newTitle) {
    updateData.title = newTitle;
  }
  
  await updateDoc(chatRef, updateData);
}
