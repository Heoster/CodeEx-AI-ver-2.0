'use client';

import {
  ArrowRight,
  MessageSquare,
  ScanLine,
  Terminal,
  Mic,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: <MessageSquare />,
    title: 'Dynamic AI Conversations',
    description:
      'Engage in natural, context-aware dialogues. Our AI remembers your conversation history and adapts its tone and technical level based on your preferences.',
    imageSrc: 'https://placehold.co/600x400.png',
    imageHint: 'AI chat conversation',
  },
  {
    icon: <ScanLine />,
    title: 'Visual Problem Solver',
    description:
      'Go beyond text. Upload an image of a handwritten math equation, and our AI will recognize, solve, and provide a step-by-step solution.',
    imageSrc: 'https://placehold.co/600x400.png',
    imageHint: 'math equation chalkboard',
  },
  {
    icon: <Terminal />,
    title: 'Integrated Command System',
    description:
      'Take control with powerful slash commands. Instantly get answers with `/solve` or get concise summaries of long texts with `/summarize`.',
    imageSrc: 'https://placehold.co/600x400.png',
    imageHint: 'command line interface',
  },
  {
    icon: <Mic />,
    title: 'Voice-Enabled Interaction',
    description:
      'Interact hands-free with full voice support. Use your microphone to talk to the AI and enable speech output to hear its responses aloud.',
    imageSrc: 'https://placehold.co/600x400.png',
    imageHint: 'sound waves',
  },
];

export default function AiAgentPlatformPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-neutral-300">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/favicon.ico"
              alt="CODEEX AI Logo"
              width={28}
              height={28}
            />
            <span className="text-xl font-bold text-white">CODEEX AI</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/pricing"
              className="text-sm font-medium text-neutral-300 hover:text-white"
            >
              Pricing
            </Link>
            <Link
              href="/documentation"
              className="text-sm font-medium text-neutral-300 hover:text-white"
            >
              Docs
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-neutral-300 hover:text-white"
            >
              Blog
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button
                variant="outline"
                className="border-neutral-700 bg-transparent text-white hover:bg-neutral-800 hover:text-white"
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
        <section className="relative overflow-hidden border-b border-white/10 py-20 md:py-32">
          <div
            className="absolute inset-0 bg-background"
            style={{
              backgroundImage:
                'radial-gradient(ellipse 80% 50% at 50% -20%,rgba(120,119,198,0.3), transparent), radial-gradient(ellipse 80% 50% at 50% 120%,rgba(39, 108, 223, 0.3), transparent)',
              animation: 'aurora 4s linear infinite',
            }}
          ></div>
          <div className="container relative mx-auto max-w-7xl px-4 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-7xl">
              Explore the Power of
              <br />
              Conversational AI
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-400">
              Engage in intelligent conversations, solve complex problems, and
              experience the future of AI interaction, built on Next.js and
              Genkit.
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
                  className="border-neutral-700 bg-transparent text-white hover:bg-neutral-800 hover:text-white"
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
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                A Hands-On AI Experience
              </h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-neutral-400">
                This isn't just a demo. It's a fully-functional application
                showcasing real-world AI capabilities you can use right now.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
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
                    <h3 className="text-lg font-semibold text-white">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-sm text-neutral-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-white/10 bg-background py-20 text-center">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Ready to Dive In?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-400">
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
      <footer className="border-t border-white/10 bg-background">
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
                <span className="text-xl font-bold text-white">CODEEX AI</span>
              </Link>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/#features"
                    className="text-neutral-400 hover:text-white"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-neutral-400 hover:text-white"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-neutral-400 hover:text-white"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/blog"
                    className="text-neutral-400 hover:text-white"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/documentation"
                    className="text-neutral-400 hover:text-white"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-neutral-400 hover:text-white"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/careers"
                    className="text-neutral-400 hover:text-white"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-neutral-400 hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-neutral-400 hover:text-white">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-neutral-400 hover:text-white">
                    LinkedIn
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-neutral-500">
            &copy; {new Date().getFullYear()} CODEEX AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
