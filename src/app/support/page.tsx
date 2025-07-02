'use client';

import { ArrowLeft, Code } from 'lucide-react';
import Link from 'next/link';
import SpeechInputComponent from '@/components/SpeechInputComponent';
import { useVoiceCommands } from '@/hooks/use-voice-commands';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SupportPage() {
  const { voiceCommands } = useVoiceCommands();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold hover:underline">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="flex-1 text-center text-xl font-bold">Voice Command Test</h1>
        </div>
      </header>
      <main className="container mx-auto max-w-4xl px-4 py-8 md:px-6 md:py-12">
        <div className="space-y-8">
            <div className="space-y-4 rounded-lg border bg-card p-8 text-center">
                <h2 className="text-3xl font-bold tracking-tight">Test Voice Commands</h2>
                <p className="text-lg text-muted-foreground">
                Click the button below and speak one of the available commands to test the voice recognition feature.
                </p>
                <SpeechInputComponent />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Available Commands</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        {voiceCommands.map((cmd, index) => (
                            <li key={index} className="flex items-center gap-4 rounded-md bg-muted p-3">
                                <Code className="h-5 w-5 text-muted-foreground" />
                                <span className="font-mono text-sm">
                                    {cmd.command.toString().replace(/^\/|\/$/g, '')}
                                </span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
