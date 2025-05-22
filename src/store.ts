import { create } from 'zustand';

type DataStore = {
  isLocked: boolean;
  isMobile: boolean;
  isOpen: boolean;
  setIsLocked: (isLocked: boolean) => void;
  setIsMobile: (isMobile: boolean) => void;
  setIsOpen: (isOpen: boolean) => void;
};

// Check if we have a session cookie
const hasSession = typeof document !== 'undefined' && document.cookie.includes('session=');

console.log('hasSession', hasSession);

export const useDataStore = create<DataStore>((set) => ({
  isLocked: !hasSession,
  isMobile: false,
  isOpen: true,
  setIsLocked: (isLocked: boolean) => set({ isLocked }),
  setIsMobile: (isMobile: boolean) => set({ isMobile }),
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
}));
