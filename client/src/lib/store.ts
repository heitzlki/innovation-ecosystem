import { create } from 'zustand';

interface ClientState {
  roadmap: boolean;
  color1: string;
  color2: string;
  setRoadmap: () => void;
  setColor1: (color: string) => void;
  setColor2: (color: string) => void;
}

export const useStore = create<ClientState>((set, get) => ({
  roadmap: false,
  color1: 'hsl(186, 100%, 50%)',
  color2: 'hsl(156, 100%, 50%)',
  setColor1: (color: string) => set({ color1: color }),
  setColor2: (color: string) => set({ color2: color }),
  setRoadmap: () =>
    set((state: { roadmap: boolean }) => ({ roadmap: !state.roadmap })),
}));
