'use client';

import {
  ArrowRight,
  Bot,
  BrainCircuit,
  CheckCircle,
  Code,
  FileText,
  MessageSquare,
  Rocket,
  Users,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const FeatureCard = ({
  icon,
  title,
  description,
  imageSrc,
  imageHint,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  imageSrc: string;
  imageHint: string;
}) => (
  <Card className="transform border-neutral-800 bg-neutral-900/50 transition-transform duration-300 hover:scale-105 hover:border-blue-500">
    <CardContent className="p-6">
      <div className="flex items-center gap-4">
        <div className="rounded-md bg-blue-900/50 p-2 text-blue-400">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <p className="mt-4 text-neutral-400">{description}</p>
      <div className="mt-6">
        <Image
          src={imageSrc}
          width={500}
          height={300}
          alt={title}
          data-ai-hint={imageHint}
          className="rounded-lg border border-neutral-700"
        />
      </div>
    </CardContent>
  </Card>
);

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-neutral-300">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-black/80 backdrop-blur-sm">
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
              href="/#features"
              className="text-sm font-medium text-neutral-300 hover:text-white"
            >
              Features
            </Link>
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
              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-neutral-800 bg-grid-slate-900/[0.05] py-20 md:py-32">
          <div
            className="absolute inset-0 bg-black"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
              backgroundSize: '2rem 2rem',
            }}
          ></div>
          <div className="container relative mx-auto max-w-7xl px-4 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
              The Complete AI Agent Platform
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-400">
              Build, deploy, and manage enterprise-grade AI agents with unparalleled
              flexibility and power. Your vision, our engine.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/login">
                <Button
                  size="lg"
                  className="w-full bg-blue-600 text-white hover:bg-blue-700 sm:w-auto"
                >
                  Start Building Now
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-neutral-700 bg-transparent text-white hover:bg-neutral-800 hover:text-white sm:w-auto"
                >
                  Book a Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-black py-16 md:py-24">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                For every professional, any use case.
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-lg text-neutral-400">
                Integrate intelligent assistance across your entire workflow, from
                customer support to internal tooling.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <FeatureCard
                icon={<MessageSquare size={24} />}
                title="Advanced Conversational AI"
                description="Engage users with natural, context-aware dialogue."
                imageSrc="https://placehold.co/500x300.png"
                imageHint="chat interface"
              />
              <FeatureCard
                icon={<BrainCircuit size={24} />}
                title="Visual Math Solver"
                description="Solve complex equations from handwritten notes."
                imageSrc="https://placehold.co/500x300.png"
                imageHint="math equation"
              />
              <FeatureCard
                icon={<FileText size={24} />}
                title="Document Summarization"
                description="Condense long texts into concise summaries instantly."
                imageSrc="https://placehold.co/500x300.png"
                imageHint="text document"
              />
              <FeatureCard
                icon={<Code size={24} />}
                title="Developer-First APIs"
                description="Easily integrate our powerful AI into your own tools."
                imageSrc="https://placehold.co/500x300.png"
                imageHint="code editor"
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y border-neutral-800 bg-neutral-950/50">
          <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 text-center md:grid-cols-2 md:px-6">
            <div>
              <p className="text-5xl font-bold text-white">48,046,058</p>
              <p className="mt-2 text-sm uppercase tracking-wider text-neutral-400">
                Queries Processed
              </p>
            </div>
            <div>
              <p className="text-5xl font-bold text-white">181.4K</p>
              <p className="mt-2 text-sm uppercase tracking-wider text-neutral-400">
                Developers Building
              </p>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section id="testimonials" className="bg-black py-16 md:py-24">
          <div className="container mx-auto max-w-4xl px-4 text-center md:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Trusted by the world's most innovative teams
            </h2>
            <div className="mt-12">
              <Card className="border-neutral-800 bg-neutral-950 p-8">
                <blockquote className="text-lg italic text-neutral-300">
                  "CODEEX AI has transformed our customer engagement. The
                  platform's flexibility and power allowed us to build a virtual
                  assistant that exceeded all our expectations."
                </blockquote>
                <div className="mt-6 flex items-center justify-center gap-4">
                  <Image
                    src="https://placehold.co/48x48.png"
                    width={48}
                    height={48}
                    alt="User Testimonial"
                    data-ai-hint="person face"
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-white">Jane Doe</p>
                    <p className="text-sm text-neutral-500">
                      Head of Innovation, TechCorp
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-neutral-800 bg-neutral-950/50 py-20">
          <div className="container mx-auto max-w-7xl px-4 text-center md:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Build better with CODEEX AI
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-400">
              Join the largest agent-building community and start creating
              next-generation AI assistants today.
            </p>
            <div className="mt-8">
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  Start Building for Free <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-800 bg-black">
        <div className="container mx-auto max-w-7xl px-4 py-8 md:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
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
                  <Link href="/pricing" className="text-neutral-400 hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/integrations"
                    className="text-neutral-400 hover:text-white"
                  >
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-neutral-400 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-neutral-400 hover:text-white">
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
              <h4 className="font-semibold text-white">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/blog" className="text-neutral-400 hover:text-white">
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
                  <Link href="/contact" className="text-neutral-400 hover:text-white">
                    Contact
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
          <div className="mt-8 border-t border-neutral-800 pt-8 text-center text-sm text-neutral-500">
            &copy; {new Date().getFullYear()} CODEEX AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
