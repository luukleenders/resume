import { create } from 'zustand';

type DataStore = {
  isLocked: boolean;
  isMobile: boolean;
  isOpen: boolean;
  setIsLocked: (isLocked: boolean) => void;
  setIsMobile: (isMobile: boolean) => void;
  setIsOpen: (isOpen: boolean) => void;
};

export const useDataStore = create<DataStore>((set) => ({
  isLocked: true,
  isMobile: false,
  isOpen: true,
  setIsLocked: (isLocked: boolean) => set({ isLocked }),
  setIsMobile: (isMobile: boolean) => set({ isMobile }),
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
}));
