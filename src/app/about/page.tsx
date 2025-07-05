import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold hover:underline">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="flex-1 text-center text-xl font-bold">About Us</h1>
        </div>
      </header>
      <main className="container mx-auto max-w-4xl px-4 py-8 md:px-6 md:py-12">
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">Our Mission</h2>
            <p className="text-center text-lg text-muted-foreground">
              At CODEEX AI, our mission is to democratize access to powerful, enterprise-grade generative AI. We believe in building transparent, customizable, and scalable solutions that empower developers and businesses to create the next generation of intelligent applications.
            </p>
          </div>
          
          <div className="flex justify-center">
            <Image
                src="https://placehold.co/800x400.png"
                width={800}
                height={400}
                alt="Our Team at work"
                data-ai-hint="team business meeting"
                className="rounded-lg shadow-lg"
              />
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Who We Are</h2>
            <p className="leading-relaxed text-muted-foreground">
              CODEEX AI was founded by a team of passionate technologists and AI researchers from Heoster, who saw the potential for generative AI to transform industries but recognized the barriers to adoption. We are a group of innovators, thinkers, and builders dedicated to making sophisticated AI tools accessible and easy to use for everyone.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Our Values</h2>
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <li className="space-y-2 rounded-lg border bg-card p-4">
                <h3 className="font-semibold">Innovation</h3>
                <p className="text-muted-foreground">We are constantly pushing the boundaries of what's possible with AI, exploring new models and techniques to deliver cutting-edge solutions.</p>
              </li>
              <li className="space-y-2 rounded-lg border bg-card p-4">
                <h3 className="font-semibold">Transparency</h3>
                <p className="text-muted-foreground">We believe in demystifying AI. Our platform is designed to be transparent, giving you control and insight into how the models work.</p>
              </li>
              <li className="space-y-2 rounded-lg border bg-card p-4">
                <h3 className="font-semibold">Customer-Centricity</h3>
                <p className="text-muted-foreground">Our users are at the heart of everything we do. We are committed to building a platform that meets your needs and helps you succeed.</p>
              </li>
               <li className="space-y-2 rounded-lg border bg-card p-4">
                <h3 className="font-semibold">Scalability & Security</h3>
                <p className="text-muted-foreground">We provide a robust and secure infrastructure that you can trust to handle your most demanding applications.</p>
              </li>
            </ul>
          </div>

           <div className="space-y-4 rounded-lg border bg-card p-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Join Us on Our Journey</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              We're just getting started. If you're excited about the future of AI and want to be part of a team that's making a real impact, we'd love to hear from you.
            </p>
             <Link href="/careers">
                <Button className="mt-4">
                  View Open Positions
                </Button>
              </Link>
          </div>

        </div>
      </main>
    </div>
  );
}