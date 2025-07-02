'use client';

import {
  ArrowRight,
  Calculator,
  Users,
  BookOpen,
  PlusCircle,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <Card className="transform border-neutral-800 bg-neutral-900/50 transition-transform duration-300 hover:scale-105 hover:border-blue-500">
    <CardHeader>
      <div className="flex items-center gap-4">
        <div className="rounded-md bg-blue-900/50 p-3 text-blue-400">
          {icon}
        </div>
        <CardTitle className="text-xl font-semibold text-white">{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-neutral-400">{description}</p>
    </CardContent>
  </Card>
);

export default function CalculationForumPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-neutral-300">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Calculator className="h-7 w-7 text-blue-400" />
            <span className="text-xl font-bold text-white">Calculation Forum</span>
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
                Join Now
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
              The Collaborative Calculation Forum
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-neutral-400">
              Stuck on a problem? Post it here. Get step-by-step solutions from our advanced AI and a community of experts. From algebra to astrophysics, we've got you covered.
            </p>
            <div className="mt-8">
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  Post Your First Problem <PlusCircle className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="mt-12">
                 <Image
                    src="https://placehold.co/1000x500.png"
                    width={1000}
                    height={500}
                    alt="Calculation Forum Interface"
                    data-ai-hint="forum interface math"
                    className="rounded-xl border border-neutral-700 shadow-2xl shadow-blue-900/20"
                />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-black py-16 md:py-24">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Everything You Need to Solve Anything.
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-lg text-neutral-400">
                Our platform combines cutting-edge AI with the power of community to create an unparalleled problem-solving experience.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Calculator size={28} />}
                title="AI-Powered Solutions"
                description="Get instant, detailed, step-by-step solutions for a wide range of mathematical and scientific problems."
              />
              <FeatureCard
                icon={<Users size={28} />}
                title="Community Discussions"
                description="Engage with peers, experts, and enthusiasts. Discuss different approaches and deepen your understanding."
              />
              <FeatureCard
                icon={<BookOpen size={28} />}
                title="Knowledge Library"
                description="Browse a vast, ever-growing repository of solved problems, tutorials, and explanations."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="border-y border-neutral-800 bg-neutral-950/50 py-16 md:py-24">
            <div className="container mx-auto max-w-5xl px-4 md:px-6">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                    Get Answers in 3 Simple Steps
                    </h2>
                </div>
                <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                    <div className="text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-900/50 font-bold text-blue-300 text-xl border border-blue-700">1</div>
                        <h3 className="mb-2 text-xl font-semibold text-white">Post Your Question</h3>
                        <p className="text-neutral-400">Type it out, or just snap a picture of a handwritten problem. Our AI will handle the rest.</p>
                    </div>
                     <div className="text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-900/50 font-bold text-blue-300 text-xl border border-blue-700">2</div>
                        <h3 className="mb-2 text-xl font-semibold text-white">Receive Solutions</h3>
                        <p className="text-neutral-400">Instantly get an AI-generated step-by-step solution, and wait for the community to chime in.</p>
                    </div>
                     <div className="text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-900/50 font-bold text-blue-300 text-xl border border-blue-700">3</div>
                        <h3 className="mb-2 text-xl font-semibold text-white">Master the Concept</h3>
                        <p className="text-neutral-400">Review the different approaches, ask follow-up questions, and mark the best answer.</p>
                    </div>
                </div>
            </div>
        </section>


        {/* Final CTA */}
        <section className="bg-black py-20">
          <div className="container mx-auto max-w-7xl px-4 text-center md:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Ready to Conquer Your Toughest Problems?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-400">
              Join thousands of students, professionals, and lifelong learners. Sign up for free and unlock your potential.
            </p>
            <div className="mt-8">
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  Start Solving for Free <ArrowRight className="ml-2 h-5 w-5" />
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
                    href="/visual-math"
                    className="text-neutral-400 hover:text-white"
                  >
                    Visual Solver
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
            &copy; {new Date().getFullYear()} Calculation Forum. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
