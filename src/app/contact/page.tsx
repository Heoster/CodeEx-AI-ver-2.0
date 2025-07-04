'use client';

import { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const SERVICE_ID = 'service_g6zgjpd';
const TEMPLATE_ID = 'template_tjri68k';
// Ensure you have these in your .env file: NEXT_PUBLIC_EMAILJS_USER_ID='YOUR_USER_ID'
const USER_ID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID || '';
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY || '';

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRecaptchaReady, setIsRecaptchaReady] = useState(false);

  useEffect(() => {
    // The reCAPTCHA script is loaded asynchronously by Firebase App Check.
    // We poll for it to be ready before enabling the form submission.
    const interval = setInterval(() => {
        if ((window as any).grecaptcha && (window as any).grecaptcha.ready) {
            (window as any).grecaptcha.ready(() => {
                setIsRecaptchaReady(true);
            });
            clearInterval(interval);
        }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!USER_ID || !RECAPTCHA_SITE_KEY) {
      toast({
        title: 'Configuration Error',
        description: 'This form is not configured correctly. Please contact support.',
        variant: 'destructive',
      });
      return;
    }
    
    if (!isRecaptchaReady) {
      toast({
        title: 'Security Check Not Ready',
        description: 'Please wait a moment for the security check to load and try again.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    
    (window as any).grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'submit_contact' }).then((token: string) => {
        // In a real application, this token would be sent to a backend for verification.
        // Since EmailJS is a client-side service, we pass the token along.
        // This provides a baseline level of bot protection.
        const templateParams = {
            ...formData,
            'g-recaptcha-response': token,
        };

        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID)
          .then(() => {
            toast({
              title: 'Success!',
              description: 'Your message has been sent successfully.',
            });
            setFormData({ user_name: '', user_email: '', message: '' });
          })
          .catch((error) => {
            console.error('Failed to send email:', error);
            const errorMessage = error.text || 'Failed to send message. Please check your EmailJS service/template IDs and CORS settings in your EmailJS account.';
            toast({
              title: 'Error',
              description: errorMessage,
              variant: 'destructive',
            });
          })
          .finally(() => {
            setIsSubmitting(false);
          });
    }).catch((error: any) => {
        console.error("reCAPTCHA Error:", error);
        toast({
            title: 'Security Check Failed',
            description: 'Could not complete the reCAPTCHA challenge. Please refresh and try again.',
            variant: 'destructive',
        });
        setIsSubmitting(false);
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold hover:underline">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="flex-1 text-center text-xl font-bold">Contact Us</h1>
        </div>
      </header>
      <main className="container mx-auto max-w-2xl px-4 py-8 md:px-6 md:py-12">
        <Card>
          <CardHeader>
            <CardTitle>Send Us a Review</CardTitle>
            <CardDescription>
              We'd love to hear your feedback. Fill out the form below to get in touch.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="user_name">Your Name</Label>
                <Input
                  id="user_name"
                  name="user_name"
                  type="text"
                  placeholder="Your Name"
                  value={formData.user_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="user_email">Your Email</Label>
                <Input
                  id="user_email"
                  name="user_email"
                  type="email"
                  placeholder="Your Email"
                  value={formData.user_email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Your Review</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your Review"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                />
              </div>
              <Button type="submit" disabled={isSubmitting || !isRecaptchaReady} className="w-full">
                {isSubmitting ? 'Sending...' : 'Send Review'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
