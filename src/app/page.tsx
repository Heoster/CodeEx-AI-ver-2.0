'use client';

import {ChatLayout} from '@/components/chat/chat-layout';
import dynamic from 'next/dynamic';

// Dynamically import SpeechInputComponent with SSR disabled
const SpeechInputComponent = dynamic(
  () => import('@/components/SpeechInputComponent'),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <ChatLayout />
      <SpeechInputComponent /> {/* Add the voice input component here */}
    </>
  );
}
