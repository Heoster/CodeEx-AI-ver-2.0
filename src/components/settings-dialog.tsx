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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {Label} from '@/components/ui/label';
import type {ReactNode} from 'react';
import type {Settings, Model} from '@/lib/types';

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
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Content Settings</DialogTitle>
          <DialogDescription>
            Customize the AI's output to your preference.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="model" className="text-right">
              Model
            </Label>
            <Select
              value={settings.model}
              onValueChange={(value: Model) =>
                onSettingsChange({...settings, model: value})
              }
            >
              <SelectTrigger id="model" className="col-span-3">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gemini-1.5-flash">
                  Gemini 1.5 Flash
                </SelectItem>
                <SelectItem value="gemini-1.5-pro">Gemini 1.5 Pro</SelectItem>
                <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                <SelectItem value="gemini-1.0-pro">Gemini 1.0 Pro</SelectItem>
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
