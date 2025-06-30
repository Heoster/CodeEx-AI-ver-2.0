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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {type Chat, type Settings} from '@/lib/types';
import {ChatPanel} from './chat-panel';
import {Button} from '@/components/ui/button';
import {
  MessageSquarePlus,
  Settings as SettingsIcon,
  LogOut,
  Trash2,
} from 'lucide-react';
import {ThemeToggle} from '../theme-toggle';
import {SettingsDialog} from '../settings-dialog';
import {useAuth} from '@/hooks/use-auth';
import {getAuth, signOut} from 'firebase/auth';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {
  onChatsSnapshot,
  createNewChatInFirestore,
  deleteAllUserChats,
} from '@/lib/firestore';

const defaultSettings: Settings = {
  model: 'auto',
  tone: 'helpful',
  technicalLevel: 'intermediate',
  enableSpeech: true,
  voice: 'Algenib',
};

export function ChatLayout() {
  const {user} = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string>('');
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isClearHistoryAlertOpen, setIsClearHistoryAlertOpen] = useState(false);
  const auth = getAuth();

  // Listen for real-time chat updates
  useEffect(() => {
    if (user?.uid) {
      const unsubscribe = onChatsSnapshot(user.uid, newChats => {
        setChats(newChats);
        // If there's no active chat, or the active chat was deleted, set a new one.
        if (
          newChats.length > 0 &&
          (!activeChatId || !newChats.find(c => c.id === activeChatId))
        ) {
          setActiveChatId(newChats[0].id);
        } else if (newChats.length === 0) {
          setActiveChatId('');
        }
      });
      return () => unsubscribe();
    }
  }, [user?.uid, activeChatId]);

  const createNewChat = useCallback(async () => {
    if (!user) return;
    const newChatId = await createNewChatInFirestore(user.uid);
    setActiveChatId(newChatId);
  }, [user]);

  // Create an initial chat if none exist
  useEffect(() => {
    if (user && chats.length === 0) {
      createNewChat();
    }
  }, [user, chats.length, createNewChat]);

  const handleSignOut = async () => {
    await signOut(auth);
  };

  const activeChat = chats.find(chat => chat.id === activeChatId);

  const handleConfirmClearHistory = async () => {
    if (!user) return;
    await deleteAllUserChats(user.uid);
    // The onSnapshot listener will automatically clear the chats from state.
    // We create a new one to not leave the user with a blank screen.
    createNewChat();
    setIsClearHistoryAlertOpen(false);
  };

  const sidebarFooterContent = (
    <>
      <SettingsDialog settings={settings} onSettingsChange={setSettings}>
        <Button variant="ghost" className="w-full justify-start">
          <SettingsIcon className="mr-2" />
          Settings
        </Button>
      </SettingsDialog>
      <ThemeToggle />
    </>
  );

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
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-muted-foreground hover:text-destructive"
            onClick={() => setIsClearHistoryAlertOpen(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear History
          </Button>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {chats.map(chat => (
              <SidebarMenuItem key={chat.id}>
                <SidebarMenuButton
                  isActive={chat.id === activeChatId}
                  onClick={() => {
                    setActiveChatId(chat.id);
                  }}
                >
                  <span>{chat.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          {user && (
            <div className="border-t -mx-2 flex items-center gap-2 px-2 pt-2">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={user.photoURL ?? ''}
                  alt={user.displayName ?? 'User'}
                />
                <AvatarFallback>
                  {user.displayName?.charAt(0) ?? 'U'}
                </AvatarFallback>
              </Avatar>
              <span className="truncate text-sm font-medium">
                {user.displayName}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto"
                onClick={handleSignOut}
              >
                <LogOut />
                <span className="sr-only">Sign Out</span>
              </Button>
            </div>
          )}
          {sidebarFooterContent}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
          <SidebarTrigger className="md:hidden" />
          <h1 className="text-lg font-semibold">{activeChat?.title}</h1>
        </header>

        {activeChat ? (
          <ChatPanel
            key={activeChat.id}
            chat={activeChat}
            settings={settings}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <p>Create a new chat to get started.</p>
          </div>
        )}
      </SidebarInset>
      <AlertDialog
        open={isClearHistoryAlertOpen}
        onOpenChange={setIsClearHistoryAlertOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will permanently delete all of your chat history and
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmClearHistory}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SidebarProvider>
  );
}
