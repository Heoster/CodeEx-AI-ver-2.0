'use client';

import { BrainCircuit, Zap, Server } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/favicon.ico" alt="CODEEX AI Logo" width={32} height={32} />
            <span className="text-xl font-bold">CODEEX AI</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="#features" className="text-sm font-medium text-slate-300 hover:text-white">
              Features
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-slate-300 hover:text-white">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-sm font-medium text-slate-300 hover:text-white">
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" className="border-slate-700 bg-transparent hover:bg-slate-800 hover:text-white">
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
        <section className="relative border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 py-20 md:py-32">
          <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 text-center md:grid-cols-2 md:px-6 md:text-left">
            <div className="flex flex-col justify-center space-y-6">
              <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
                Enterprise-Grade AI,
                <br />
                Minus the Black Box
              </h1>
              <p className="max-w-xl text-lg text-slate-400">
                Unlock the full potential of generative AI with CODEEX. Our platform provides powerful, transparent, and customizable solutions to build advanced conversational AI experiences.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
                <Link href="/login">
                  <Button size="lg" className="w-full bg-blue-600 text-white hover:bg-blue-700 sm:w-auto">
                    Get Started Now
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="w-full border-slate-700 bg-transparent hover:bg-slate-800 hover:text-white sm:w-auto">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/codex-ai-hero.png"
                width={600}
                height={400}
                alt="CODEEX AI Hero Image"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-slate-900">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Harness the Full Potential of Generative AI</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-400">
                Our platform is designed for scalability, security, and seamless integration.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border border-slate-800 bg-slate-950 p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-md bg-blue-900/50 p-2 text-blue-400"><BrainCircuit size={24} /></div>
                  <h3 className="text-xl font-semibold">Advanced AI Models</h3>
                </div>
                <p className="mt-4 text-slate-400">Leverage the latest in large language models with fine-tuning capabilities for your specific needs.</p>
              </div>
               <div className="rounded-lg border border-slate-800 bg-slate-950 p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-md bg-blue-900/50 p-2 text-blue-400"><Zap size={24} /></div>
                  <h3 className="text-xl font-semibold">Real-time Responses</h3>
                </div>
                <p className="mt-4 text-slate-400">Deliver lightning-fast, human-like conversations that keep users engaged.</p>
              </div>
               <div className="rounded-lg border border-slate-800 bg-slate-950 p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-md bg-blue-900/50 p-2 text-blue-400"><Server size={24} /></div>
                  <h3 className="text-xl font-semibold">Scalable Infrastructure</h3>
                </div>
                <p className="mt-4 text-slate-400">Built to handle millions of conversations without compromising on performance.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonial Section */}
        <section id="testimonials" className="bg-slate-950 py-16 md:py-24">
            <div className="container mx-auto max-w-3xl px-4 text-center md:px-6">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Trusted by the World's Leading Teams</h2>
                <div className="mt-12">
                    <div className="rounded-lg border border-slate-800 bg-slate-900 p-8">
                        <blockquote className="text-lg italic text-slate-300">
                           "CODEEX AI has transformed our customer engagement. The platform's flexibility and power allowed us to build a virtual assistant that exceeded all our expectations."
                        </blockquote>
                        <div className="mt-6 flex items-center justify-center gap-4">
                            <Image src="https://placehold.co/48x48.png" width={48} height={48} alt="User Testimonial" data-ai-hint="person face" className="rounded-full"/>
                            <div>
                                <p className="font-semibold">Jane Doe</p>
                                <p className="text-sm text-slate-500">Head of Innovation, TechCorp</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950">
        <div className="container mx-auto max-w-7xl px-4 py-8 md:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <h4 className="font-semibold">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#features" className="text-slate-400 hover:text-white">Features</Link></li>
                <li><Link href="/pricing" className="text-slate-400 hover:text-white">Pricing</Link></li>
                <li><Link href="/integrations" className="text-slate-400 hover:text-white">Integrations</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-slate-400 hover:text-white">About Us</Link></li>
                <li><Link href="/careers" className="text-slate-400 hover:text-white">Careers</Link></li>
                <li><Link href="/privacy" className="text-slate-400 hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/blog" className="text-slate-400 hover:text-white">Blog</Link></li>
                <li><Link href="/documentation" className="text-slate-400 hover:text-white">Documentation</Link></li>
                <li><Link href="/contact" className="text-slate-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-slate-400 hover:text-white">Twitter</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-white">LinkedIn</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
            &copy; {new Date().getFullYear()} CODEEX AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
