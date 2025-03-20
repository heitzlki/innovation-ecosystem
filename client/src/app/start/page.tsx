'use client';
// import { ScratchToReveal } from '@/components/magicui/scratch-to-reveal';
// import { RainbowButton } from '@/components/magicui/rainbow-button';
import { Button } from '../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { cn } from '../../lib/utils';

import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';

import { Checkbox } from '../../components/ui/checkbox';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { MagicCard } from '../../components/magicui/magic-card';
import { useTheme } from 'next-themes';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
// import { toast } from '@/components/hooks/use-toast';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { BorderBeam } from '../../components/magicui/border-beam';

// import { NumberTicker } from '@/components/magicui/number-ticker';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '../../components/ui/input-otp';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';

const formSchema = z.object({
  // email: z.string().email({ message: 'Invalid email address' }),
  // event: z.string().min(1, { message: 'Event is required' }),
  // key: z.string().length(6, { message: 'Key must be exactly 6 digits' }),
  role: z.string().min(1, { message: 'Role is required' }),
  problem: z.string().min(1, { message: 'Problem is required' }),
  // terms: z.boolean().refine((val) => val === true, {
  //   message: 'You must accept the terms and conditions',
  // }),
});

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Start() {
  const { theme } = useTheme();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: '',
      problem: '',
      // terms: false,
    },
  });

  const [submitted, setSubmitted] = useState(false);

  function onSubmit(data: z.infer<typeof formSchema>) {
    setSubmitted(true);
    router.push('/chat/ey38he3udh3iuye29w');
    toast('You submitted the following values:', {
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className='flex justify-center items-center min-h-screen flex-col '
      suppressHydrationWarning>
      <div className='flex justify-center items-center flex-col w-1/2'>
        <Card className='absolute w-xl overflow-hidden'>
          <CardHeader>
            <CardTitle>Start</CardTitle>
            <CardDescription>
              We need some information to get started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-8'>
                <FormField
                  control={form.control}
                  name='role'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Role</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='I am CEO of company XYZ...'
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='problem'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Problem</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="I canno't create any sales..."
                          className='resize-none h-56'
                          {...field}
                        />
                      </FormControl>
                      {/* <FormDescription>This is the event name.</FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* <FormField
                  control={form.control}
                  name='terms'
                  render={({ field }) => (
                    <FormItem>
                      <div className='flex items-center space-x-2'>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel htmlFor='terms'>
                          Accept terms and conditions
                        </FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                <Button className={'w-full'} type='submit'>
                  Submit
                </Button>

                {/* <RainbowButton type='submit'>Submit</RainbowButton> */}
              </form>
            </Form>
          </CardContent>
          {/* <CardFooter></CardFooter> */}
          <BorderBeam duration={8} size={100} />
        </Card>
      </div>
    </div>
  );
}
