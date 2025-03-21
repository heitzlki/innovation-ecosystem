'use client';
import { X } from 'lucide-react';
import { useStore } from '@/lib/store';
import * as React from 'react';
import { Minus, Plus } from 'lucide-react';
import { Bar, BarChart, ResponsiveContainer } from 'recharts';
import {
  ReactFlow,
  Controls,
  Background,
  BackgroundVariant,
} from '@xyflow/react';

import AnnotationNode from './_nodes/AnnotationNode';
import InfoNode from './_nodes/InfoNode';

import FloatingEdge from './_edges/FloatingEdge';
import CenterNode from './_nodes/CenterNode';

const nodeTypes = {
  annotation: AnnotationNode,
  custom: InfoNode,
  center: CenterNode,
  roadmap: RoadmapNode,
};

const edgeTypes = {
  floating: FloatingEdge,
  // button: ButtonEdge,
};

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
import RoadmapNode from './_nodes/RoadmapNode';

const edges = [{ id: '1-2', source: '1', target: '2', animated: true }];

const nodes = [
  {
    id: '1',
    type: 'roadmap',
    data: {
      color: '#8BFFAC',
      title:
        'Contact Joachim Schneider from OST about machine servicing optimisation',
    },
    position: { x: 0, y: 0 },
  },
  {
    id: '2',
    type: 'roadmap',
    data: { color: '#FD84FF', title: 'You are a Problem' },
    position: { x: 200, y: 0 },
  },
  {
    id: `${3}`,
    type: 'roadmap',
    draggable: true,
    selectable: false,
    data: { color: '#FD84FF', title: 'Marketing' },
    position: { x: 400, y: 0 },
  },
];

export default function Roadmap() {
  const { roadmap, setRoadmap } = useStore();

  return (
    <Drawer open={roadmap} onOpenChange={setRoadmap}>
      <DrawerContent data-vaul-no-drag>
        <div>
          <DrawerHeader>
            <DrawerTitle className='text-center w-full text-2xl'>
              Innovation Roadmap
            </DrawerTitle>
            <DrawerDescription className='text-center w-full'>
              Next proposed steps
            </DrawerDescription>
            <DrawerClose asChild>
              <button className='absolute top-4 right-4 rounded-full p-2 hover:bg-gray-200 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-400'>
                <X className='h-5 w-5' />
              </button>
            </DrawerClose>
          </DrawerHeader>
          <div style={{ width: '100vw', height: '60vh' }} className='bottom-0'>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              proOptions={{ hideAttribution: true }}
              fitView>
              {/* <Controls showInteractive={false} /> */}
              <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
