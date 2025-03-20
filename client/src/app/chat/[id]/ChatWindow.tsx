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
import { BorderBeam } from '@/components/magicui/border-beam';

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

import { useStore } from '@/lib/store';
import { Check, Plus, Send } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CardContent, CardHeader, CardFooter } from '@/components/ui/card';

export default function CardsChat() {
  const [open, setOpen] = React.useState(false);
  const { color1, color2 } = useStore();

  const [messages, setMessages] = React.useState([
    {
      role: 'agent',
      content: 'Hi, how can I help you today?',
    },
    {
      role: 'user',
      content: "Hey, I'm having trouble with my sales report.",
    },
  ]);
  const [input, setInput] = React.useState('');
  const inputLength = input.trim().length;
  // <div className='fixed top-1/2 right-0 transform -translate-y-1/2 z-50 px-4 py-4'>
  //   <div className='bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm w-[350px] h-[80vh]'></div>
  //   {/* <div className='flex flex-col items-center justify-center'>
  //     <Card className='relative w-[350px] h-[650px] overflow-hidden'></Card>
  //   </div> */}
  // </div>
  return (
    <div className='fixed top-1/2 right-0 transform -translate-y-1/2 z-50 px-4 py-12'>
      <Card className='relative w-[350px] overflow-hidden'>
        {/* <CardHeader className='flex flex-row items-center'>
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
                  className='ml-auto rounded-full'
                  onClick={() => setOpen(true)}>
                  <Plus />
                  <span className='sr-only'>New message</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent sideOffset={10}>New message</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader> */}
        <CardContent>
          <div className='space-y-4 h-[80vh]'>
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm',
                  message.role === 'user'
                    ? 'ml-auto bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}>
                {message.content}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (inputLength === 0) return;
              setMessages([
                ...messages,
                {
                  role: 'user',
                  content: input,
                },
              ]);
              setInput('');
            }}
            className='flex w-full items-center space-x-2'>
            <Input
              id='message'
              placeholder='Type your message...'
              className='flex-1'
              autoComplete='off'
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <Button type='submit' size='icon' disabled={inputLength === 0}>
              <Send />
              <span className='sr-only'>Send</span>
            </Button>
          </form>
        </CardFooter>
        <BorderBeam
          duration={6}
          size={400}
          // className={`from-transparent via-[${color1}] to-transparent`}
          className={`from-transparent via-[hsl(0, 100%, 50%)] to-transparent`}
        />
        <BorderBeam
          duration={6}
          delay={3}
          size={400}
          className={`from-transparent via-[${color2}] to-transparent`}
        />
      </Card>
    </div>
  );
}
