'use client';

import * as React from 'react';
import { Minus, Plus } from 'lucide-react';

import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import { ReactFlow, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const edges = [{ id: '1-2', source: '1', target: '2' }];

const nodes = [
  {
    id: '1',
    data: { label: 'Hello' },
    position: { x: 0, y: 0 },
    type: 'input',
  },
  {
    id: '2',
    data: { label: 'World' },
    position: { x: 100, y: 100 },
  },
];

export default function Roadmap() {
  const { roadmap, setRoadmap } = useStore();

  return (
    <Drawer open={roadmap} onOpenChange={setRoadmap}>
      <DrawerContent className='h-[70vh] overflow-hidden flex-col items-center justify-center'>
        <div className='mx-auto w-full max-w-sm'>
          <DrawerHeader>
            <DrawerTitle>Your Innovation Roadmap</DrawerTitle>
            <DrawerDescription>
              Keep track of your progress and define new goals!
            </DrawerDescription>
          </DrawerHeader>

          <div
            className='mx-auto w-full max-w-sm'
            style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow nodes={nodes} edges={edges}>
              <Background />
              <Controls />
            </ReactFlow>
          </div>
          {/* <div className='p-4 pb-0'>
            <div className='flex items-center justify-center space-x-2'>
              <Button
                variant='outline'
                size='icon'
                className='h-8 w-8 shrink-0 rounded-full'
                onClick={() => onClick(-10)}
                disabled={goal <= 200}>
                <Minus />
                <span className='sr-only'>Decrease</span>
              </Button>
              <div className='flex-1 text-center'>
                <div className='text-7xl font-bold tracking-tighter'>
                  {goal}
                </div>
                <div className='text-[0.70rem] uppercase text-muted-foreground'>
                  Calories/day
                </div>
              </div>
              <Button
                variant='outline'
                size='icon'
                className='h-8 w-8 shrink-0 rounded-full'
                onClick={() => onClick(10)}
                disabled={goal >= 400}>
                <Plus />
                <span className='sr-only'>Increase</span>
              </Button>
            </div>
            <div className='mt-3 h-[120px]'></div>
          </div> */}
          <DrawerFooter>
            {/* <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DrawerClose> */}
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
