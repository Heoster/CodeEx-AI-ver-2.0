'use client';

import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {Label} from '@/components/ui/label';
import type {ReactNode} from 'react';
import type {Settings, Model} from '@/lib/types';
import {Switch} from '@/components/ui/switch';
import {Separator} from '@/components/ui/separator';
import {useTheme} from '@/hooks/use-theme';
import Link from 'next/link';

interface SettingsDialogProps {
  children: ReactNode;
  settings: Settings;
  onSettingsChange: (settings: Settings) => void;
}

export function SettingsDialog({
  children,
  settings,
  onSettingsChange,
}: SettingsDialogProps) {
  const {theme, setTheme, themes} = useTheme();
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Customize the AI's output and appearance.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <h3 className="text-sm font-medium">Content</h3>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="model" className="text-right">
              Model
            </Label>
            <Select
              value={settings.model}
              onValueChange={(value: 'auto' | Model) =>
                onSettingsChange({...settings, model: value})
              }
            >
              <SelectTrigger id="model" className="col-span-3">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Google</SelectLabel>
                  <SelectItem value="auto">Auto (Default)</SelectItem>
                  <SelectItem value="gemini-1.5-pro">Gemini 1.5 Pro</SelectItem>
                  <SelectItem value="gemini-1.5-flash">
                    Gemini 1.5 Flash
                  </SelectItem>
                  <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                  <SelectItem value="gemini-pro-vision">
                    Gemini Pro Vision
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tone" className="text-right">
              Tone
            </Label>
            <Select
              value={settings.tone}
              onValueChange={(value: Settings['tone']) =>
                onSettingsChange({...settings, tone: value})
              }
            >
              <SelectTrigger id="tone" className="col-span-3">
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="helpful">Helpful</SelectItem>
                <SelectItem value="formal">Formal</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="technical" className="text-right">
              Technical Level
            </Label>
            <Select
              value={settings.technicalLevel}
              onValueChange={(value: Settings['technicalLevel']) =>
                onSettingsChange({
                  ...settings,
                  technicalLevel: value,
                })
              }
            >
              <SelectTrigger id="technical" className="col-span-3">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Separator />
          <h3 className="text-sm font-medium">Appearance & Accessibility</h3>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="theme" className="text-right">
              Theme
            </Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger id="theme" className="col-span-3">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                {themes.map(t => (
                  <SelectItem key={t} value={t}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="speech" className="text-right">
              Speech Output
            </Label>
            <Switch
              id="speech"
              checked={settings.enableSpeech}
              onCheckedChange={checked =>
                onSettingsChange({...settings, enableSpeech: checked})
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="voice" className="text-right">
              Voice
            </Label>
            <Select
              value={settings.voice}
              onValueChange={(value: Settings['voice']) =>
                onSettingsChange({...settings, voice: value})
              }
              disabled={!settings.enableSpeech}
            >
              <SelectTrigger id="voice" className="col-span-3">
                <SelectValue placeholder="Select voice" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Algenib">Algenib (Female)</SelectItem>
                <SelectItem value="Achernar">Achernar (Female)</SelectItem>
                <SelectItem value="Enceladus">Enceladus (Male)</SelectItem>
                <SelectItem value="Heka">Heka (Male)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Separator />
        <div className="space-y-4 pt-4">
          <div className="space-y-2 text-center">
            <p className="text-sm text-muted-foreground">
              For support or inquiries, please email us at{' '}
              <a
                href="mailto:the.heoster@mail.com"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                the.heoster@mail.com
              </a>
              .
            </p>
            <p className="text-sm text-muted-foreground">
              Read our{' '}
              <Link
                href="/privacy"
                className="font-medium text-primary underline-offset-4 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
