
'use client';

import { useState } from 'react';
import emailjs from 'emailjs-com';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getAppCheck, getToken } from "firebase/app-check";
import { app } from '@/lib/firebase';

const SERVICE_ID = 'service_g6zgjpd';
const TEMPLATE_ID = 'template_tjri68k';
// Ensure you have these in your .env file: NEXT_PUBLIC_EMAILJS_USER_ID='YOUR_USER_ID'
const USER_ID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID || '';

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!USER_ID) {
      toast({
        title: 'Configuration Error',
        description: 'This form is not configured correctly. Please contact support.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsSubmitting(true);

    try {
        const appCheck = getAppCheck(app);
        // Get the App Check token. This request is protected by App Check.
        const { token } = await getToken(appCheck, /* forceRefresh= */ false);

        // This provides a baseline level of bot protection. For a fully secure implementation,
        // you would send this token to your own backend for verification. EmailJS is a client-side
        // service and does not perform this verification.
        const templateParams = {
            ...formData,
            'g-recaptcha-response': token,
        };

        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID);
        
        toast({
          title: 'Success!',
          description: 'Your message has been sent successfully.',
        });
        setFormData({ user_name: '', user_email: '', message: '' });

    } catch (error: any) {
        console.error('Failed to send email:', error);
        const errorMessage = error.text || 'Failed to send message. Please ensure your App Check and EmailJS configurations are correct.';
        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        });
    } finally {
        setIsSubmitting(false);
    }
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
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? 'Sending...' : 'Send Review'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
