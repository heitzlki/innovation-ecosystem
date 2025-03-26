'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export type IconProps = React.HTMLAttributes<SVGElement>;

import { useStore } from '@/lib/store';
import { Send } from 'lucide-react';

import { CardContent, CardFooter } from '@/components/ui/card';
import { BASE_URL } from '@/app/api';

export default function CardsChat() {
  const [isLoading, setIsLoading] = React.useState(false);
  const { graphData } = useStore();

  // Initialize messages based on startData if available
  const [messages, setMessages] = React.useState(() => {
    // Default messages if no startData is available
    const defaultMessages = [
      {
        role: 'assistant',
        content: 'Hi, how can I help you today?',
      },
    ];

    if (graphData) {
      const welcomeMessage = `Welcome, I'm your personal Innovation Assistant. In the middle you can see possible areas of inovation relate
      to your problems. Feel free to explore the graph. Once your ready, we can get started developing a roadmap towards more innovation.`;

      return [
        {
          role: 'assistant',
          content: welcomeMessage,
        },
      ];
    }

    return defaultMessages;
  });
  const [input, setInput] = React.useState('');
  const inputLength = input.trim().length;

  return (
    <div className='fixed top-1/2 right-0 transform -translate-y-1/2 z-50 px-4 py-14'>
      <Card className='relative w-[350px] overflow-hidden h-full 2xl:w-[500px]'>
        <CardContent>
          <div
            className='space-y-4 h-[80vh] overflow-y-auto no-scrollbar'
            ref={(el) => {
              if (el) {
                el.scrollTop = el.scrollHeight;
              }
            }}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ',
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
            onSubmit={async (event) => {
              event.preventDefault();
              if (inputLength === 0) return;

              // Add user message to the UI immediately
              const userMessage = {
                role: 'user',
                content: input,
              };

              const all_messages = [...messages, userMessage];
              setMessages(all_messages);
              console.log(all_messages);
              setInput('');
              setIsLoading(true);

              try {
                // Call the message endpoint
                const url = new URL(
                  `${BASE_URL}/message`,
                  window.location.origin
                );
                const response = await fetch(url, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    last_messages: all_messages,
                    start_data: graphData,
                  }),
                });

                if (!response.ok) {
                  throw new Error('Failed to get response');
                }

                // Get the response message
                const data = await response.json();

                console.log('data:', data);

                // Add the response message to the UI
                setMessages((prevMessages) => [
                  ...prevMessages,
                  {
                    role: 'assistant',
                    content:
                      //@ts-expect-error type error
                      data.response ||
                      "I'm sorry, I couldn't process your request.",
                  },
                ]);
              } catch (error) {
                console.error('Error fetching message response:', error);
                // Add an error message
                setMessages((prevMessages) => [
                  ...prevMessages,
                  {
                    role: 'assistant',
                    content:
                      "I'm sorry, there was an error processing your request. Please try again.",
                  },
                ]);
              } finally {
                setIsLoading(false);
              }
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
            <Button
              type='submit'
              size='icon'
              disabled={inputLength === 0 || isLoading}>
              {isLoading ? (
                <div className='h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent' />
              ) : (
                <Send />
              )}
              <span className='sr-only'>{isLoading ? 'Loading' : 'Send'}</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
