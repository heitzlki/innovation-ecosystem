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
3;
import { DualRangeSlider } from '@/components/custom/DualRangeSlider';
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
import { Slider } from '@/components/ui/slider';

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
import { useStore } from '@/lib/store';

const formSchema = z.object({
  // email: z.string().email({ message: 'Invalid email address' }),
  // event: z.string().min(1, { message: 'Event is required' }),
  // key: z.string().length(6, { message: 'Key must be exactly 6 digits' }),
  role: z.string().min(1, { message: 'Role is required' }),
  problem: z.string().min(1, { message: 'Problem is required' }),
  confidence: z.number().int().min(1).max(10),
  clue: z.number().int().min(1).max(10),
  motivation: z.number().int().min(1).max(10),
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
      confidence: 5,
      clue: 5,
      motivation: 5,
      // terms: false,
    },
  });

  const [submitted, setSubmitted] = useState(false);

  const [colorSlider, setColorSlider] = useState<number[]>([50, 50, 50]);

  const { color1, color2, setColor1, setColor2 } = useStore();

  const changeColorSlider = (index: number, value: number) => {
    const newColorSlider = [...colorSlider];
    newColorSlider[index] = value;
    setColorSlider(newColorSlider);

    // const color1 = `hsl(${colorSlider[0]}, 100%, 50%)`;
    // const color2 = `hsl(${colorSlider[1]}, 100%, 50%)`;
    // setColor1(color1);
    // setColor2(color2);

    // Ensure values are clamped between 0 and 100
    const clamp = (value: number) => Math.max(0, Math.min(100, value));

    const value1 = clamp(colorSlider[0]);
    const value2 = clamp(colorSlider[1]);
    const value3 = clamp(colorSlider[2]);

    // Map values to HSL components
    const hue1 = (value1 / 100) * 360; // Map to 0-360
    const saturation1 = 100; // Full saturation
    const lightness1 = 50; // Mid lightness

    const hue2 = (value2 / 100) * 360; // Map to 0-360
    const saturation2 = 100; // Full saturation
    const lightness2 = (value3 / 100) * 50 + 25; // Map to 25-75 for better contrast

    // Generate HSL color strings
    const color1 = `hsl(${hue1}, ${saturation1}%, ${lightness1}%)`;
    const color2 = `hsl(${hue2}, ${saturation2}%, ${lightness2}%)`;

    // Set colors
    setColor1(color1);
    setColor2(color2);

    console.log(color1, color2);
  };

  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setSubmitted(true);
      setIsLoading(true);

      // Construct URL with query parameters
      const url = new URL('http://127.0.0.1:8000/init', window.location.origin);
      url.searchParams.append('role', data.role);
      url.searchParams.append('problem', data.problem);

      // Make GET request to server
      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error('Server response was not ok');
      }

      // Parse response data
      const responseData = await response.json();

      // Store response data in localStorage to access it on the next page
      localStorage.setItem('startData', JSON.stringify(responseData));

      // Navigate to next page
      router.push('/chat/ey38he3udh3iuye29w');
    } catch (error) {
      console.error('Error:', error);
      toast('Error submitting your data', {
        description: 'Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
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
                className='space-y-12'>
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
                          className='resize-none h-36'
                          {...field}
                        />
                      </FormControl>
                      {/* <FormDescription>This is the event name.</FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='clue'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        How much do you know about your problem?
                      </FormLabel>
                      <FormControl>
                        {/* <Slider defaultValue={[33]} max={100} step={1} /> */}
                        <DualRangeSlider
                          label
                          lableContenPos={'left'}
                          value={[colorSlider[0]]}
                          onValueChange={(widthPercentage) =>
                            widthPercentage != null &&
                            // setWidthPercentage1(widthPercentage[0])
                            changeColorSlider(0, widthPercentage[0])
                          }
                          min={0}
                          max={100}
                          step={1}
                        />
                      </FormControl>
                      {/* <FormDescription>This is the event name.</FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='motivation'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        How motivated are you to implement possible solutions?
                      </FormLabel>
                      <FormControl>
                        <DualRangeSlider
                          label
                          lableContenPos={'left'}
                          value={[colorSlider[1]]}
                          onValueChange={(widthPercentage) =>
                            widthPercentage != null &&
                            changeColorSlider(1, widthPercentage[0])
                          }
                          min={0}
                          max={100}
                          step={1}
                        />
                      </FormControl>
                      {/* <FormDescription>This is the event name.</FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='confidence'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        How confident do you feel with the current situation?{' '}
                      </FormLabel>
                      <FormControl>
                        <DualRangeSlider
                          label
                          lableContenPos={'left'}
                          value={[colorSlider[2]]}
                          onValueChange={(widthPercentage) =>
                            widthPercentage != null &&
                            changeColorSlider(2, widthPercentage[0])
                          }
                          min={0}
                          max={100}
                          step={1}
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
                <Button className={'w-full'} type='submit' disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Submit'}
                </Button>

                {/* <RainbowButton type='submit'>Submit</RainbowButton> */}
              </form>
            </Form>
          </CardContent>
          {/* <CardFooter></CardFooter> */}
          <BorderBeam
            duration={8}
            size={100}
            colorFrom={color1}
            colorTo={color2}
          />
        </Card>
      </div>
    </div>
  );
}
