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

export type IconProps = React.HTMLAttributes<SVGElement>;

const Icons = {};

const DATA = {
  navbar: [
    { href: '#', icon: HomeIcon, label: 'Home' },
    { href: '#', icon: PencilIcon, label: 'New' },
    { href: '#', icon: UserIcon, label: 'Settings' },
  ],
};

export default function DockBar() {
  return (
    <div className='fixed w-full top-0 z-50 px-4 py-4'>
      <div className='flex flex-col items-center justify-center'>
        <TooltipProvider>
          <Dock direction='middle' className='mt-0'>
            {DATA.navbar.map((item) => (
              <DockIcon key={item.label}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      aria-label={item.label}
                      className={cn(
                        buttonVariants({ variant: 'ghost', size: 'icon' }),
                        'size-12 rounded-full'
                      )}>
                      <item.icon className='size-4' />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            ))}
            {/* <Separator orientation='vertical' className='h-full' /> */}

            {/* <Separator orientation='vertical' className='h-full py-2' />` */}
            <DockIcon>
              <Tooltip>
                <TooltipTrigger asChild>
                  <ModeToggle />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Theme</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          </Dock>
        </TooltipProvider>
      </div>
    </div>
  );
}
