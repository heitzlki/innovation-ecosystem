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
  color1: '#00E5FF',
  color2: '#00FF99',
  setColor1: (color: string) => set({ color1: color }),
  setColor2: (color: string) => set({ color2: color }),
  setRoadmap: () =>
    set((state: { roadmap: boolean }) => ({ roadmap: !state.roadmap })),
}));
