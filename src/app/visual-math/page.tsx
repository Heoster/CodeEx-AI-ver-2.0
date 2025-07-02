'use client';

import { useState, useRef, type ChangeEvent } from 'react';
import { ArrowLeft, Upload, Wand2, Image as ImageIcon, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { BlockMath } from 'react-katex';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { solveEquationFromImage } from '@/app/actions';

type SolutionState = {
  recognizedEquation: string;
  solutionSteps: string;
  isSolvable: boolean;
} | null;

export default function VisualMathPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [solution, setSolution] = useState<SolutionState>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setSolution(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeClick = async () => {
    if (!imagePreview) {
      setError('Please select an image first.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setSolution(null);

    const result = await solveEquationFromImage({ photoDataUri: imagePreview });
    if ('error' in result) {
      setError(result.error);
    } else {
      setSolution(result);
    }
    setIsLoading(false);
  };
  
  const triggerFileSelect = () => fileInputRef.current?.click();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/chat" className="flex items-center gap-2 text-lg font-semibold hover:underline">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Chat</span>
          </Link>
          <h1 className="flex-1 text-center text-xl font-bold">Visual Math Solver</h1>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-4 py-8 md:px-6 md:py-12">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon /> Upload Equation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                className="relative flex h-64 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/50 bg-muted/50 transition-colors hover:border-primary hover:bg-muted"
                onClick={triggerFileSelect}
              >
                {imagePreview ? (
                  <Image src={imagePreview} alt="Equation preview" fill className="rounded-lg object-contain" />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <Upload className="mx-auto h-12 w-12" />
                    <p>Click to upload an image</p>
                    <p className="text-xs">PNG, JPG, etc.</p>
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              <Button onClick={handleAnalyzeClick} disabled={isLoading || !imagePreview} className="w-full">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                {isLoading ? 'Analyzing...' : 'Solve with AI'}
              </Button>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card>
            <CardHeader>
              <CardTitle>Solution</CardTitle>
            </CardHeader>
            <CardContent className="min-h-[20.5rem] space-y-4">
              {isLoading && (
                <div className="flex h-full items-center justify-center">
                  <Loader2 className="h-16 w-16 animate-spin text-muted-foreground" />
                </div>
              )}
              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {solution && (
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-2 font-semibold">Recognized Equation:</h3>
                    {solution.isSolvable ? (
                        /**
                         * The `BlockMath` component from `react-katex` is used to render mathematical equations.
                         * It takes a string of LaTeX as input and displays it as a formatted math block.
                         * This is used to show the user the equation that was recognized from the image.
                         */
                        <BlockMath math={solution.recognizedEquation} />
                    ) : (
                        <p className="text-muted-foreground">Could not recognize a valid equation.</p>
                    )}
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold">Step-by-step Solution:</h3>
                    <div className="overflow-x-auto p-2 rounded-md bg-muted">
                        {/**
                         * The `BlockMath` component from `react-katex` is used to render mathematical equations.
                         * It takes a string of LaTeX as input and displays it as a formatted math block.
                         * This is used to show the user the step-by-step solution to the equation.
                         */}
                        <BlockMath math={solution.solutionSteps} />
                    </div>
                  </div>
                </div>
              )}
              {!isLoading && !solution && !error && (
                <div className="flex h-full items-center justify-center text-center text-muted-foreground">
                  <p>Upload an image of an equation and click "Solve with AI" to see the solution here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
