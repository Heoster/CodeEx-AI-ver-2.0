'use client';

import {ChatLayout} from '@/components/chat/chat-layout';
import {ProtectedRoute} from '@/hooks/use-auth';

export default function Home() {
  return (
    <ProtectedRoute>
      <ChatLayout />
    </ProtectedRoute>
  );
}
