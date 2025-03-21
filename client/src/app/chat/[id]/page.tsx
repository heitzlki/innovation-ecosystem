'use client';

import { useState, useEffect } from 'react';
import DockBar from './DockBar';
import ChatWindow from './ChatWindow';
import Graph from './Graph';
import Roadmap from './Roadmap';
import { DrawerDemo } from './ActivityBar';
import { Drawer } from 'vaul';

export default function Chat({ params }: { params: Promise<{ id: string }> }) {
  const [startData, setStartData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Retrieve data from localStorage
    const storedData = localStorage.getItem('startData');

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setStartData(parsedData);
      } catch (error) {
        console.error('Error parsing stored data:', error);
      }
    }

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-lg font-medium'>Loading...</div>
      </div>
    );
  }

  return (
    <div suppressHydrationWarning>
      <DockBar />
      <ChatWindow startData={startData} />
      <Graph startData={startData} />
      <DrawerDemo />
    </div>
  );
}
