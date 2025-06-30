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
import {useEffect, useState, useRef} from 'react';
import {Skeleton} from '@/components/ui/skeleton';
import {Eye, EyeOff} from 'lucide-react';
import {Checkbox} from '@/components/ui/checkbox';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import Image from 'next/image';
import ReCAPTCHA from 'react-google-recaptcha';

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

const getFirebaseAuthErrorMessage = (error: any): string => {
  if (!error.code) {
    return 'An unknown error occurred. Please try again.';
  }
  switch (error.code) {
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
      return 'Sign-in cancelled. The sign-in window was closed.';
    case 'auth/popup-blocked':
      return 'Sign-in failed. Please allow pop-ups for this site and try again.';
    case 'auth/unauthorized-domain':
      return 'This domain is not authorized for authentication. Please add it to the authorized domains list in your Firebase project settings.';
    case 'auth/internal-error':
      return 'An internal authentication error occurred. This may be a temporary issue. Please try again in a few moments.';
    case 'auth/firebase-app-check-token-is-invalid':
      return 'App Check token is invalid. This app is not configured correctly. Please contact the developer.';
    default:
      return `An authentication error occurred. Please try again later. (Error: ${error.code})`;
  }
};

export default function LoginPage() {
  const router = useRouter();
  const auth = getAuth(app);
  const {user, loading} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // New state for name prompt
  const [isNamePromptOpen, setIsNamePromptOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [isSavingName, setIsSavingName] = useState(false);

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
    setError(null);
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      console.error('Error signing in with Google: ', error);
      setError(getFirebaseAuthErrorMessage(error));
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!captchaToken) {
      setError('Please complete the CAPTCHA before signing up.');
      return;
    }
    if (password.length < 6) {
      setError('Password should be at least 6 characters.');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // The useEffect will handle prompting for name
    } catch (error: any) {
      console.error('Error signing up with email: ', error);
      setError(getFirebaseAuthErrorMessage(error));
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!captchaToken) {
      setError('Please complete the CAPTCHA before signing in.');
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // The useEffect will handle prompting for name if needed
    } catch (error: any) {
      console.error('Error signing in with email: ', error);
      setError(getFirebaseAuthErrorMessage(error));
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    }
  };

  // New function to save user's display name
  const handleSaveName = async () => {
    if (!newUserName.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!auth.currentUser) {
      setError('An error occurred. Please try logging in again.');
      return;
    }
    setIsSavingName(true);
    setError(null);
    try {
      await updateProfile(auth.currentUser, {displayName: newUserName.trim()});
      // The useAuth hook will detect the user change, and the useEffect below will redirect.
      setIsNamePromptOpen(false);
    } catch (error) {
      console.error('Error updating profile: ', error);
      setError('Could not save your name. Please try again.');
    } finally {
      setIsSavingName(false);
    }
  };

  useEffect(() => {
    // If user is loaded
    if (!loading && user) {
      // and has a display name, redirect to home.
      if (user.displayName) {
        router.push('/');
      } else {
        // otherwise, prompt for a name.
        setIsNamePromptOpen(true);
      }
    }
  }, [user, loading, router]);

  // Skeleton loading screen while checking auth state or redirecting
  if (loading || (user && user.displayName)) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Skeleton className="h-64 w-full max-w-md" />
      </div>
    );
  }

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mb-4 flex justify-center">
              <Image
                src="/favicon.ico"
                alt="CodeEx Logo"
                width={48}
                height={48}
              />
            </div>
            <CardTitle className="text-2xl font-bold">
              Welcome to ALPHA AI
            </CardTitle>
            <CardDescription>
              Sign in to access your intelligent assistant
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <form onSubmit={handleEmailSignIn} className="space-y-4">
                <div className="space-y-2">
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
                <div className="relative space-y-2">
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

                <div className="flex items-center space-x-2">
                  <Checkbox id="remember-me" />
                  <Label htmlFor="remember-me" className="text-sm font-normal">
                    Remember me
                  </Label>
                </div>

                <div className="flex justify-center">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6LfjdXIrAAAAAMI25ZP5Mfx8d0mAT3bw25V1gSPD"
                    onChange={handleCaptchaChange}
                  />
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <div className="flex gap-2 pt-2">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={!captchaToken}
                  >
                    Sign In
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    className="w-full"
                    onClick={handleEmailSignUp}
                    disabled={!captchaToken}
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
                    Or sign in with Google
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
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-xs text-muted-foreground">
              CodeEx powered by Heoster.
            </p>
          </CardFooter>
        </Card>
      </div>

      <Dialog open={isNamePromptOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Welcome to ALPHA AI!</DialogTitle>
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
