'use client';

import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export type IconProps = React.HTMLAttributes<SVGElement>;

import { Plus } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CardContent, CardHeader, CardFooter } from '@/components/ui/card';

export default function InfoWindow() {
  return (
    <div className='fixed top-0 left-0 transform -translate-y-1/2 z-50 px-4 py-14'>
      <Card className='relative w-[350px] overflow-hidden h-full'>
        <CardHeader className='flex flex-row items-center'>
          <div className='flex items-center space-x-4'>
            <Avatar>
              <AvatarImage src='/avatars/01.png' alt='Image' />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div>
              <p className='text-sm font-medium leading-none'>Sofia Davis</p>
              <p className='text-sm text-muted-foreground'>m@example.com</p>
            </div>
          </div>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size='icon'
                  variant='outline'
                  className='ml-auto rounded-full'>
                  <Plus />
                  <span className='sr-only'>New message</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent sideOffset={10}>New message</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
