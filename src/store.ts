import { create } from 'zustand';

type DataStore = {
  isMobile: boolean;
  isOpen: boolean;
  setIsMobile: (isMobile: boolean) => void;
  setIsOpen: (isOpen: boolean) => void;
};

export const useDataStore = create<DataStore>((set) => ({
  isMobile: false,
  isOpen: true,
  setIsMobile: (isMobile: boolean) => set({ isMobile }),
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
}));
