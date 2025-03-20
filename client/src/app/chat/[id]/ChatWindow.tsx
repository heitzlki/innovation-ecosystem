'use client';

import {
  CalendarIcon,
  HomeIcon,
  MailIcon,
  PencilIcon,
  User,
  UserIcon,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { ModeToggle } from '@/components/mode-toggle';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Dock, DockIcon } from '@/components/magicui/dock';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export type IconProps = React.HTMLAttributes<SVGElement>;

export default function ChatWindow() {
  return (
    <div className='fixed top-1/2 right-0 transform -translate-y-1/2 z-50 px-4 py-4'>
      <div className='flex flex-col items-center justify-center'>
        <Card className='relative w-[350px] h-[650px] overflow-hidden'></Card>
      </div>
    </div>
  );
}
