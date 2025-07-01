'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold hover:underline">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="flex-1 text-center text-xl font-bold">Documentation</h1>
        </div>
      </header>
      <main className="container mx-auto max-w-4xl px-4 py-8 md:px-6 md:py-12">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">CODEEX AI Features</h2>
            <p className="text-lg text-muted-foreground">
              Explore the powerful features that make CODEEX AI an intelligent and versatile assistant.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border bg-card p-6">
            <h3 className="text-2xl font-semibold">Conversational AI</h3>
            <p className="text-muted-foreground">
              Engage in natural, context-aware conversations. The AI can remember previous parts of your conversation to provide relevant and helpful responses. You can customize the AI's personality by adjusting its tone and technical level in the settings.
            </p>
            <div className="rounded-md bg-muted p-4 text-sm">
              <p><strong>Example:</strong> "What are the main benefits of Next.js?"</p>
            </div>
          </div>

          <div className="space-y-4 rounded-lg border bg-card p-6">
            <h3 className="text-2xl font-semibold">Quiz & Calculation Solver</h3>
            <p className="text-muted-foreground">
              Need to solve a complex calculation or a tricky quiz question? Use the <code className="font-mono rounded bg-muted px-1 py-0.5">/solve</code> command to get a quick and accurate solution.
            </p>
            <div className="rounded-md bg-muted p-4 text-sm space-y-2">
              <p><strong>Command:</strong> <code className="font-mono rounded bg-muted px-1 py-0.5">/solve [your question]</code></p>
              <p><strong>Example:</strong> <code className="font-mono rounded bg-muted px-1 py-0.5">/solve What is the capital of Australia?</code></p>
              <p><strong>Example:</strong> <code className="font-mono rounded bg-muted px-1 py-0.5">/solve 25 * (10 + 5) / 5</code></p>
            </div>
          </div>

          <div className="space-y-4 rounded-lg border bg-card p-6">
            <h3 className="text-2xl font-semibold">Information Summarizer</h3>
            <p className="text-muted-foreground">
              Quickly get the gist of a long piece of text. Use the <code className="font-mono rounded bg-muted px-1 py-0.5">/summarize</code> command followed by the text you want to condense into a concise summary.
            </p>
            <div className="rounded-md bg-muted p-4 text-sm space-y-2">
              <p><strong>Command:</strong> <code className="font-mono rounded bg-muted px-1 py-0.5">/summarize [text to summarize]</code></p>
              <p><strong>Example:</strong> <code className="font-mono rounded bg-muted px-1 py-0.5">/summarize Photosynthesis is a process used by plants and other organisms to convert light energy into chemical energy...</code></p>
            </div>
          </div>
          
          <div className="space-y-4 rounded-lg border bg-card p-6">
            <h3 className="text-2xl font-semibold">Voice Commands & Speech Output</h3>
            <p className="text-muted-foreground">
              Interact with the AI hands-free. Click the microphone icon to activate voice chat and speak your commands. You can also enable speech output in the settings to have the AI's responses read aloud to you in one of several available voices.
            </p>
             <div className="rounded-md bg-muted p-4 text-sm space-y-2">
               <p><strong>To use:</strong> Click the microphone icon in the chat input bar.</p>
               <p><strong>To enable speech output:</strong> Go to Settings &gt; Speech Output.</p>
             </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}
