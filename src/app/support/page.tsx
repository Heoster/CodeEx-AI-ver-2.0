'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold hover:underline">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="flex-1 text-center text-xl font-bold">Support</h1>
        </div>
      </header>
      <main className="container mx-auto max-w-4xl px-4 py-8 md:px-6 md:py-12">
        <div className="flex min-h-[40vh] flex-col items-center justify-center space-y-4 rounded-lg border bg-card p-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight">How Can We Help?</h2>
            <p className="text-lg text-muted-foreground">
             For any questions, issues, or feedback, please reach out to our support team.
            </p>
            <a href="mailto:the.heoster@mail.com">
              <Button className="mt-4">
                Contact Support
              </Button>
            </a>
        </div>
      </main>
    </div>
  );
}
