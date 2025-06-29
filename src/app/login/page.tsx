'use client';

import {signInWithPopup} from 'firebase/auth';
import {auth, googleProvider} from '@/lib/firebase';
import {Button} from '@/components/ui/button';
import {useRouter} from 'next/navigation';
import {useAuth} from '@/hooks/use-auth';
import {useEffect} from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function LoginPage() {
  const router = useRouter();
  const {user, loading} = useAuth();

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Error signing in with Google: ', error);
    }
  };

  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading || user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Skeleton className="h-24 w-full max-w-sm" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="mx-auto flex w-full max-w-sm flex-col items-center justify-center space-y-6 rounded-lg border bg-card p-8 shadow-sm">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome to ALPHA AI</h1>
          <p className="text-muted-foreground">
            Sign in to start chatting with your intelligent assistant.
          </p>
        </div>
        <Button onClick={handleSignIn} className="w-full">
          Sign In with Google
        </Button>
      </div>
    </div>
  );
}
