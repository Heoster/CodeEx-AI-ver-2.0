
'use client';

import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  getAuth,
} from 'firebase/auth';
import {app, googleProvider} from '@/lib/firebase';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {useRouter} from 'next/navigation';
import {useAuth} from '@/hooks/use-auth';
import {useEffect, useState} from 'react';
import {Skeleton} from '@/components/ui/skeleton';
import {Eye, EyeOff} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import Image from 'next/image';
import Link from 'next/link';
import {triggerWelcomeEmail} from '@/app/actions';
import {useToast} from '@/hooks/use-toast';

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
    <path d="M1 1h22v22H1z" fill="none" />
  </svg>
);

const getFirebaseAuthErrorMessage = (error: unknown): string => {
  const appCheckDebugSteps = "\nThis can be caused by a Firebase App Check configuration issue. Please verify the following in your Firebase project:\n1. The reCAPTCHA v3 Site Key in your .env file (NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY) is correct.\n2. Your domain (e.g., localhost) is whitelisted in App Check -> Apps.\n3. If enforcement is on for Authentication, ensure App Check is initializing correctly.";

  if (typeof error !== 'object' || error === null) {
    return 'An unknown error occurred. Please try again.';
  }

  const err = error as { code?: string; message?: string };

  // Specific App Check error
  if (err.code === 'auth/firebase-app-check-token-is-invalid') {
    return `Authentication security check failed. ${appCheckDebugSteps}`;
  }

  // Generic errors that can be caused by App Check
  if (
    (err.message && err.message.includes('INTERNAL ASSERTION FAILED')) ||
    String(error).includes('INTERNAL ASSERTION FAILED') ||
    err.code === 'auth/internal-error' ||
    err.code === 'auth/network-request-failed'
  ) {
    return `An internal authentication error occurred. ${appCheckDebugSteps}`;
  }
  
  if (!err.code) {
    return 'An unknown error occurred. Please try again.';
  }
  
  switch (err.code) {
    case 'auth/invalid-credential':
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'Invalid credentials. Please check your email and password.';
    case 'auth/email-already-in-use':
      return 'This email is already registered. Please sign in or use a different email.';
    case 'auth/weak-password':
      return 'Your password is too weak. It must be at least 6 characters long.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/operation-not-allowed':
      return 'Email/password accounts are not enabled. Please contact support.';
    case 'auth/popup-closed-by-user':
    case 'auth/cancelled-popup-request':
      return ''; // Return an empty string to signify that this should be ignored.
    case 'auth/popup-blocked':
      return 'Sign-in failed. Please allow pop-ups for this site and try again.';
    case 'auth/unauthorized-domain':
      return 'This domain is not authorized for authentication. Please go to your Firebase project -> Authentication -> Settings -> Authorized domains, and add your domain (e.g., localhost).';
    default:
      return `An authentication error occurred. Please try again later. (Error: ${err.code})`;
  }
};

export default function LoginPage() {
  const router = useRouter();
  const {user, loading} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {toast} = useToast();

  const [isNamePromptOpen, setIsNamePromptOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [isSavingName, setIsSavingName] = useState(false);

  const handleAuthError = (error: unknown) => {
    console.error('Authentication Error:', error);
    const errorMessage = getFirebaseAuthErrorMessage(error);
    if (errorMessage) {
      setError(errorMessage);
    } else {
      // If the error message is empty, it's an ignored error (like popup closed)
      setError(null);
    }
  }

  const handleGoogleSignIn = async () => {
    setError(null);
    const auth = getAuth(app);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user.email && result.user.displayName) {
        await triggerWelcomeEmail({
          email: result.user.email,
          displayName: result.user.displayName,
        });
        toast({
          title: 'Email "Sent"',
          description: `A welcome email for ${result.user.email} was logged to the console.`,
        });
      }
    } catch (error: unknown) {
      handleAuthError(error);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 6) {
      setError('Password should be at least 6 characters.');
      return;
    }
    const auth = getAuth(app);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: unknown) {
      handleAuthError(error);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const auth = getAuth(app);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user.email && userCredential.user.displayName) {
        await triggerWelcomeEmail({
          email: userCredential.user.email,
          displayName: userCredential.user.displayName,
        });
        toast({
          title: 'Email "Sent"',
          description: `A welcome email for ${userCredential.user.email} was logged to the console.`,
        });
      }
    } catch (error: unknown) {
      handleAuthError(error);
    }
  };

  const handleSaveName = async () => {
    if (!newUserName.trim()) {
      setError('Please enter your name.');
      return;
    }
    const auth = getAuth(app);
    const currentUser = auth.currentUser;
    if (!currentUser) {
      setError('An error occurred. Please try logging in again.');
      return;
    }
    setIsSavingName(true);
    setError(null);
    try {
      await updateProfile(currentUser, {displayName: newUserName.trim()});

      if (currentUser.email) {
        await triggerWelcomeEmail({
          email: currentUser.email,
          displayName: newUserName.trim(),
        });
        toast({
          title: 'Email "Sent"',
          description: `A welcome email for ${currentUser.email} was logged to the console.`,
        });
      }

      setIsNamePromptOpen(false);
    } catch (_error) {
      setError('Could not save your name. Please try again.');
    } finally {
      setIsSavingName(false);
    }
  };

  useEffect(() => {
    if (!loading && user) {
      if (user.displayName) {
        router.push('/chat');
      } else {
        setIsNamePromptOpen(true);
      }
    }
  }, [user, loading, router]);

  if (loading || (user && user.displayName)) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Skeleton className="h-64 w-full max-w-md" />
      </div>
    );
  }

  return (
    <>
      <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
        <div className="mx-auto grid w-full max-w-md gap-6 rounded-lg border bg-card p-6 shadow-sm">
          <div className="grid gap-2 text-center">
            <div className="mb-4 flex justify-center">
              <Image
                src="/favicon.ico"
                alt="CODEEX AI Logo"
                width={48}
                height={48}
              />
            </div>
            <h1 className="text-3xl font-bold">Sign In</h1>
            <p className="text-muted-foreground">
              Enter your information to sign in to your account
            </p>
          </div>
          <div className="grid gap-4">
            <form onSubmit={handleEmailSignIn} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="relative grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-7 h-7 w-7"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </Button>
              </div>

              {error && <p className="whitespace-pre-wrap text-sm text-destructive">{error}</p>}

              <div className="flex gap-2 pt-2">
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full"
                  onClick={handleEmailSignUp}
                >
                  Sign Up
                </Button>
              </div>
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <Button
              onClick={handleGoogleSignIn}
              variant="outline"
              className="w-full"
            >
              <GoogleIcon className="mr-2 h-4 w-4" />
              Sign In with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            By signing in, you agree to our{' '}
            <Link
              href="/privacy"
              className="underline hover:text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </Link>
            .
          </div>
          <p className="text-center text-xs text-muted-foreground">
            CodeEx powered by Heoster.
          </p>
        </div>
      </div>
      <Dialog open={isNamePromptOpen} onOpenChange={setIsNamePromptOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Welcome to CODEEX AI!</DialogTitle>
            <DialogDescription>
              Please enter your name. This will be displayed in your chat
              sessions.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your name"
                value={newUserName}
                onChange={e => setNewUserName(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    handleSaveName();
                  }
                }}
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
          <DialogFooter>
            <Button onClick={handleSaveName} disabled={isSavingName}>
              {isSavingName ? 'Saving...' : 'Save and Continue'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
