
'use client';

import {
  ArrowRight,
  MessageSquare,
  ScanLine,
  Terminal,
  Mic,
  Library,
  History,
  Shield,
  Search,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { InstallPWAButton } from '@/components/install-pwa-button';

const features = [
  {
    icon: <MessageSquare />,
    title: 'Dynamic AI Conversations',
    description:
      'Engage in natural, context-aware dialogues. Our AI remembers your conversation history and adapts its tone and technical level based on your preferences.',
    imageSrc: '/eng.png',
    imageHint: 'chat bubbles interface',
  },
  {
    icon: <Library />,
    title: 'Multi-Chat Management',
    description:
      'Organize your thoughts. Create and manage multiple chat sessions simultaneously, keeping your different projects and topics neatly separated.',
    imageSrc: '/Multi-Chat.png',
    imageHint: 'project management dashboard',
  },
  {
    icon: <History />,
    title: 'Persistent Chat History',
    description:
      'Never lose a thought. Your conversations are automatically saved to your device, allowing you to pick up right where you left off, anytime.',
    imageSrc: '/Hist.png',
    imageHint: 'cloud storage sync',
  },
  {
    icon: <ScanLine />,
    title: 'Visual Problem Solver',
    description:
      'Go beyond text. Upload an image of a handwritten math equation, and our AI will recognize, solve, and provide a step-by-step solution.',
    imageSrc: '/an.png',
    imageHint: 'math equation blackboard',
  },
  {
    icon: <Terminal />,
    title: 'Integrated Command System',
    description:
      'Take control with powerful slash commands. Instantly get answers with `/solve` or get concise summaries of long texts with `/summarize`.',
    imageSrc: '/com.png',
    imageHint: 'code terminal screen',
  },
  {
    icon: <Search />,
    title: 'Real-Time Web Search',
    description:
      'Get up-to-the-minute answers. Use the `/search` command to have the AI browse the web and provide grounded responses with citations.',
    imageSrc: '/search.png',
    imageHint: 'search engine results',
  },
  {
    icon: <Mic />,
    title: 'Voice-Enabled Interaction',
    description:
      'Interact hands-free with full voice support. Use your microphone to talk to the AI and enable speech output to hear its responses aloud.',
    imageSrc: '/web.png',
    imageHint: 'soundwave interface',
  },
  {
    icon: <Shield />,
    title: 'Secure Authentication',
    description:
      'Leverage Firebase for secure and reliable user authentication, supporting both email/password and Google sign-in methods.',
    imageSrc: '/security.png',
    imageHint: 'secure login shield',
  },
];

export default function AiAgentPlatformPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    // We can only check localStorage on the client, and we should wait for auth to be ready.
    if (typeof window === 'undefined' || loading) {
      return;
    }

    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');

    if (user && hasVisitedBefore) {
      // If the user is logged in and has visited before, redirect to the chat page.
      router.push('/chat');
    } else if (!hasVisitedBefore) {
      // On the very first visit, set the flag so next time they'll be redirected.
      localStorage.setItem('hasVisitedBefore', 'true');
    }
  }, [user, loading, router]);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/favicon.ico"
              alt="CODEEX AI Logo"
              width={28}
              height={28}
            />
            <span className="text-xl font-bold text-foreground">CODEEX AI</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/pricing"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Pricing
            </Link>
            <Link
              href="/documentation"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Docs
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Blog
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <InstallPWAButton variant="outline" />
            <Link href="/login">
              <Button
                variant="outline"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/login">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border py-20 md:py-32">
          <div
            className="absolute inset-0 bg-background"
            style={{
              backgroundImage:
                'radial-gradient(ellipse 80% 50% at 50% -20%,rgba(120,119,198,0.3), transparent), radial-gradient(ellipse 80% 50% at 50% 120%,rgba(39, 108, 223, 0.3), transparent)',
              animation: 'aurora 4s linear infinite',
            }}
          ></div>
          <div className="container relative mx-auto max-w-7xl px-4 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-7xl">
              Explore the Power of
              <br />
              Conversational AI
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Engage in intelligent conversations, solve complex problems, and
              experience the future of AI interaction, built by HEOSTER only for you.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Start Chatting Now <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link href="/documentation">
                <Button
                  size="lg"
                  variant="outline"
                >
                  Read Docs
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-background py-16 md:py-24">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                A Hands-On AI Experience
              </h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                This isn't just a demo. It's a fully-functional application
                showcasing real-world AI capabilities you can use right now.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col gap-4">
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border">
                    <Image
                      src={feature.imageSrc}
                      alt={feature.title}
                      fill
                      className="object-cover"
                      data-ai-hint={feature.imageHint}
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-border bg-background py-20 text-center">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Ready to Dive In?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Create an account to save your chat history and start exploring
              all the features.
            </p>
            <div className="mt-8">
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Get Started with CODEEX AI{' '}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background">
        <div className="container mx-auto max-w-7xl px-4 py-12 md:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/favicon.ico"
                  alt="CODEEX AI Logo"
                  width={28}
                  height={28}
                />
                <span className="text-xl font-bold text-foreground">CODEEX AI</span>
              </Link>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/#features"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/blog"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/documentation"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/careers"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="https://github.com/Heoster" className="text-muted-foreground hover:text-foreground">
                    Github
                  </Link>
                </li>
                <li>
                  <Link href="https://www.instagram.com/codex._.heoster/" className="text-muted-foreground hover:text-foreground">
                    Instagram
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} CODEEX AI. All rights reserved.</p>
            <p className="mt-1">CodeEx powered by Heoster.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
