'use client';

import {
  ArrowRight,
  Bot,
  Code,
  LayoutGrid,
  MessageSquare,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: <MessageSquare />,
    title: 'Advanced Chat Interface',
    description:
      'Engage users with a dynamic and responsive chat UI, complete with voice commands and customizable settings.',
    imageSrc: 'https://placehold.co/600x400.png',
    imageHint: 'chat interface',
  },
  {
    icon: <Code />,
    title: 'Powerful Genkit Flows',
    description:
      'Define complex AI logic with server-side Genkit flows for everything from data generation to tool use.',
    imageSrc: 'https://placehold.co/600x400.png',
    imageHint: 'code editor',
  },
  {
    icon: <LayoutGrid />,
    title: 'Multimodal Capabilities',
    description:
      'Go beyond text. Let users interact by uploading images for analysis, like solving handwritten equations.',
    imageSrc: 'https://placehold.co/600x400.png',
    imageHint: 'image analysis',
  },
  {
    icon: <Users />,
    title: 'Secure User Authentication',
    description:
      'Integrated with Firebase Auth to provide secure, scalable, and easy-to-manage user authentication.',
    imageSrc: 'https://placehold.co/600x400.png',
    imageHint: 'authentication login',
  },
];

export default function AiAgentPlatformPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-neutral-300">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Bot className="h-7 w-7 text-primary" />
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
                'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
              backgroundSize: '2rem 2rem',
              maskImage:
                'radial-gradient(ellipse at center, white 20%, transparent 60%)',
            }}
          ></div>
          <div className="container relative mx-auto max-w-7xl px-4 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-7xl">
              The Complete
              <br />
              AI Agent Platform
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-400">
              Build, deploy, and manage AI agents at scale. Leverage our
              powerful tools and infrastructure to create next-generation
              applications.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Start Building <ArrowRight className="ml-2" />
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
            <div className="mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                From problem to production-ready in record time
              </h2>
              <p className="mt-4 max-w-3xl text-lg text-neutral-400">
                A comprehensive suite of tools to handle any AI development
                challenge.
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
                  <h3 className="text-lg font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-neutral-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Engine Section */}
        <section className="relative overflow-hidden border-y border-white/10 py-20 text-center">
          <h1 className="text-8xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white to-neutral-500 md:text-9xl">
            Engine
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-neutral-400">
            Our core engine is built for performance and scale, allowing you to
            run complex agents with minimal latency.
          </p>
        </section>

        {/* By Developers Section */}
        <section className="bg-background py-16 md:py-24">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                By developers, for developers.
              </h2>
              <p className="mt-4 max-w-3xl text-lg text-neutral-400">
                We provide the building blocks you love, so you can focus on
                creating.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
              <Card className="border-purple-500/50 bg-[#1e1b2e] p-6 lg:col-span-1">
                <CardContent className="flex flex-col gap-4 p-0">
                  <h3 className="font-semibold text-white">
                    Seamless Integration
                  </h3>
                  <p className="text-sm text-neutral-400">
                    Works with the tools and frameworks you already use,
                    including Next.js, React, and Tailwind CSS.
                  </p>
                  <div className="aspect-video w-full rounded-md border border-white/10 bg-black/30 p-4">
                    <Image
                      src="https://placehold.co/400x200.png"
                      data-ai-hint="code snippet"
                      alt="code"
                      width={400}
                      height={200}
                      className="rounded"
                    />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-teal-500/50 bg-[#112528] p-6 lg:col-span-2">
                <CardContent className="flex flex-col gap-4 p-0">
                  <h3 className="font-semibold text-white">
                    Extensible & Customizable
                  </h3>
                  <p className="text-sm text-neutral-400">
                    Easily extend functionality with custom tools and fine-tune
                    models to fit your specific needs.
                  </p>
                  <div className="aspect-video w-full rounded-md border border-white/10 bg-black/30 p-4">
                    <Image
                      src="https://placehold.co/600x300.png"
                      data-ai-hint="dashboard settings"
                      alt="dashboard"
                      width={600}
                      height={300}
                      className="rounded"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats and Testimonials Section */}
        <section className="border-y border-white/10 bg-neutral-900/70 py-16 md:py-24">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <p className="font-semibold text-primary">
                  Trusted by businesses and startups
                </p>
                <h2 className="text-3xl font-bold text-white">
                  Building the future of AI, together.
                </h2>
                <p className="text-neutral-400">
                  Our platform powers thousands of applications, from
                  small-scale projects to enterprise-level solutions.
                </p>
                <div className="flex gap-8 pt-4">
                  <div>
                    <p className="text-4xl font-bold text-white">48M+</p>
                    <p className="text-neutral-400">API Calls Monthly</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-white">181K+</p>
                    <p className="text-neutral-400">Active Developers</p>
                  </div>
                </div>
              </div>
              <Card className="border-blue-500/50 bg-background p-6">
                <CardContent className="p-0">
                  <p className="text-lg text-white">
                    "This is the most comprehensive and developer-friendly AI
                    platform I've ever used. We were able to ship our agent in a
                    fraction of the time."
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    <Image
                      src="https://placehold.co/40x40.png"
                      data-ai-hint="person avatar"
                      alt="User avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-white">Jane Doe</p>
                      <p className="text-sm text-neutral-400">
                        Lead Engineer, TechCorp
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-background py-20 text-center">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Join the largest AI building community.
            </h2>
            <div className="mt-8">
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Build better with CODEEX AI{' '}
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
                <Bot className="h-7 w-7 text-primary" />
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
