'use client';

import DockBar from './DockBar';
import ChatWindow from './ChatWindow';
import Graph from './Graph';
import Roadmap from './Roadmap';

export default function Chat({ params }: { params: Promise<{ id: string }> }) {
  return (
    <div
      // className='min-h-screen bg-background transition-colors duration-300'
      suppressHydrationWarning>
      <DockBar />
      <ChatWindow />
      <Graph />
      <Roadmap />
    </div>
  );
}
