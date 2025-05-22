import { create } from 'zustand';
import type { Personal } from '@db/types';

type DataStore = {
  isLocked: boolean;
  isMobile: boolean;
  isOpen: boolean;
  personalData: Personal[];
  setIsLocked: (isLocked: boolean) => void;
  setIsMobile: (isMobile: boolean) => void;
  setIsOpen: (isOpen: boolean) => void;
  setPersonalData: (data: Personal[]) => void;
  refetchData: () => Promise<void>;
};

export const useDataStore = create<DataStore>((set) => ({
  isLocked: true,
  isMobile: false,
  isOpen: true,
  personalData: [],
  setIsLocked: (isLocked: boolean) => set({ isLocked }),
  setIsMobile: (isMobile: boolean) => set({ isMobile }),
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
  setPersonalData: (data: Personal[]) => set({ personalData: data }),
  refetchData: async () => {
    try {
      const response = await fetch('/api/personal?includePrivate=true');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      set({ personalData: data });
    } catch (error) {
      console.error('Error refetching data:', error);
    }
  },
}));
