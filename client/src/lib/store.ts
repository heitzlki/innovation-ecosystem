import { Area } from '@/types';
import { create } from 'zustand';

interface ClientState {
  roadmap: boolean;
  color1: string;
  color2: string;
  graphData: Area[];
  setRoadmap: () => void;
  setGraphData: (graphData: Area[]) => void;
  setColor1: (color: string) => void;
  setColor2: (color: string) => void;
}

export const useStore = create<ClientState>((set, get) => ({
  roadmap: false,
  color1: 'hsl(186,100%,50%)',
  color2: 'hsl(156,100%,50%)',
  graphData: [],
  setColor1: (color: string) => set({ color1: color }),
  setColor2: (color: string) => set({ color2: color }),
  setGraphData: (graphData: Area[]) => set({ graphData }),
  setRoadmap: () =>
    set((state: { roadmap: boolean }) => ({ roadmap: !state.roadmap })),
}));
