import { create } from 'zustand';

import type { Personal } from '@db/types';

type DataStore = {
  email: string;
  isLocked: boolean;
  isMobile: boolean;
  isOpen: boolean;
  personal: Personal[];
  setEmail: (email: string) => void;
  setIsLocked: (isLocked: boolean) => void;
  setIsMobile: (isMobile: boolean) => void;
  setIsOpen: (isOpen: boolean) => void;
  setPersonal: (personal: Personal[]) => void;
};

export const useDataStore = create<DataStore>((set) => ({
  email: '',
  isLocked: true,
  isMobile: false,
  isOpen: true,
  personal: [],
  setEmail: (email: string) => set({ email }),
  setIsLocked: (isLocked: boolean) => set({ isLocked }),
  setIsMobile: (isMobile: boolean) => set({ isMobile }),
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
  setPersonal: (personal: Personal[]) => set({ personal }),
}));
