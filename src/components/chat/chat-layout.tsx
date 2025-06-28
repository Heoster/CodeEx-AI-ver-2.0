'use client';

import {useState, useEffect, useCallback} from 'react';
import Image from 'next/image';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {type Chat, type Settings} from '@/lib/types';
import {ChatPanel} from './chat-panel';
import {Button} from '@/components/ui/button';
import {MessageSquarePlus, Settings as SettingsIcon} from 'lucide-react';
import {ThemeToggle} from '../theme-toggle';
import {SettingsDialog} from '../settings-dialog';

const defaultSettings: Settings = {
  model: 'auto',
  tone: 'helpful',
  technicalLevel: 'intermediate',
  enableSpeech: true,
};

export function ChatLayout() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string>('');
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const createNewChat = useCallback(() => {
    const newChatId = crypto.randomUUID();
    const newChat: Chat = {
      id: newChatId,
      title: 'New Chat',
      messages: [
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: 'How can I help you today?',
        },
      ],
    };
    setChats(prev => [...prev, newChat]);
    setActiveChatId(newChatId);
  }, []);

  // This hook will run only once when the component mounts.
  useEffect(() => {
    createNewChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeChat = chats.find(chat => chat.id === activeChatId);

  const updateChat = (chatId: string, messages: Chat['messages']) => {
    setChats(prev =>
      prev.map(c =>
        c.id === chatId
          ? {
              ...c,
              messages,
              title:
                c.title === 'New Chat' && messages.length > 1
                  ? messages[1].content.substring(0, 30) + '...'
                  : c.title,
            }
          : c
      )
    );
  };

  const clearChatHistory = () => {
    setChats([]);
    // After clearing, create a new chat to avoid an empty state
    createNewChat();
  };

  return (
    <SidebarProvider defaultOpen>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Image
              src="/favicon.ico"
              alt="ALPHA AI icon"
              width={24}
              height={24}
            />
            <h1 className="text-lg font-semibold">ALPHA AI</h1>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
            onClick={createNewChat}
          >
            <MessageSquarePlus className="mr-2" />
            New Chat
          </Button>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {chats.map(chat => (
              <SidebarMenuItem key={chat.id}>
                <SidebarMenuButton
                  isActive={chat.id === activeChatId}
                  onClick={() => setActiveChatId(chat.id)}
                >
                  <span>{chat.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SettingsDialog
            settings={settings}
            onSettingsChange={setSettings}
            onClearChatHistory={clearChatHistory}
          >
            <Button variant="ghost" className="w-full justify-start">
              <SettingsIcon className="mr-2" />
              Settings
            </Button>
          </SettingsDialog>
          <ThemeToggle />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <SidebarTrigger className="md:hidden" />
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <SheetHeader>
                <SheetTitle>ALPHA AI</SheetTitle>
                <SheetDescription>
                  Your intelligent AI assistant.
                </SheetDescription>
              </SheetHeader>
              <div className="py-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={createNewChat}
                >
                  <MessageSquarePlus className="mr-2" />
                  New Chat
                </Button>
                <nav className="mt-4 grid gap-1">
                  {chats.map(chat => (
                    <SidebarMenuButton
                      key={chat.id}
                      isActive={chat.id === activeChatId}
                      onClick={() => setActiveChatId(chat.id)}
                      className="justify-start"
                    >
                      <span>{chat.title}</span>
                    </SidebarMenuButton>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <h1 className="text-lg font-semibold">{activeChat?.title}</h1>
        </header>
        {activeChat ? (
          <ChatPanel
            chat={activeChat}
            updateChat={updateChat}
            settings={settings}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Button onClick={createNewChat}>Start New Chat</Button>
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}
