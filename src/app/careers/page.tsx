'use client';

import { ArrowLeft, MapPin, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const jobOpenings = [
  {
    title: "Senior AI Engineer",
    location: "Remote",
    department: "Engineering",
    description: "We are looking for an experienced AI engineer to help us build and scale our core language models. You will be working on cutting-edge research and implementing it into our production systems."
  },
  {
    title: "Frontend Developer (React/Next.js)",
    location: "New York, NY",
    department: "Engineering",
    description: "Join our frontend team to build intuitive and beautiful user interfaces. You should have a deep understanding of React, Next.js, and modern web development practices."
  },
  {
    title: "Product Manager - AI Platforms",
    location: "Remote",
    department: "Product",
    description: "Define the future of our AI platform. You will work closely with engineers, designers, and customers to identify new opportunities and deliver world-class products."
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold hover:underline">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="flex-1 text-center text-xl font-bold">Careers</h1>
        </div>
      </header>
      <main className="container mx-auto max-w-4xl px-4 py-8 md:px-6 md:py-12">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Join Our Team</h2>
            <p className="text-lg text-muted-foreground">
              We're on a mission to build the future of AI, and we're looking for talented people to join us. If you're passionate about technology and want to make an impact, check out our open positions below.
            </p>
          </div>

          <div className="space-y-6">
             <h3 className="text-2xl font-semibold">Open Positions</h3>
             <div className="space-y-4">
                {jobOpenings.map((job, index) => (
                    <Card key={index} className="transition-shadow hover:shadow-md">
                        <CardHeader className="grid items-start gap-4 space-y-0 md:grid-cols-3 md:space-x-4">
                            <div className="space-y-1 md:col-span-2">
                                <CardTitle>{job.title}</CardTitle>
                                <CardDescription>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                                        <span className="flex items-center gap-1"><Briefcase size={14} /> {job.department}</span>
                                        <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                                    </div>
                                </CardDescription>
                            </div>
                            <div className="flex items-center space-x-1 pt-4 md:pt-0 md:justify-end">
                                <Button>Apply Now</Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{job.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
          </div>

           <div className="space-y-4 rounded-lg border bg-card p-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight">Don't See a Role for You?</h2>
            <p className="mx-auto max-w-xl text-muted-foreground">
              We're always looking for talented individuals. If you believe you'd be a great fit for our team, send your resume and a cover letter to our hiring team.
            </p>
             <a href="mailto:the.heoster@mail.com">
                <Button variant="secondary" className="mt-2">
                  Contact Us
                </Button>
              </a>
          </div>

        </div>
      </main>
    </div>
  );
}
