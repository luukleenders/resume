import { createStore } from 'zustand';

import type { Education, Experience, Personal, Skill } from '@db/types';

export type AppState = {
  email: string;
  fullAccess: boolean;
  hasInteracted: boolean;
  isLocked: boolean;
  isMobile: boolean;
  isOpen: boolean;
  theme: 'light' | 'dark' | 'system';
  personal: Personal[];
  skills: Skill[];
  education: Education[];
  experience: Experience[];
};

export type AppActions = {
  setEmail: (email: string) => void;
  setFullAccess: (fullAccess: boolean) => void;
  setHasInteracted: (hasInteracted: boolean) => void;
  setIsLocked: (isLocked: boolean) => void;
  setIsMobile: (isMobile: boolean) => void;
  setIsOpen: (isOpen: boolean) => void;
  setPersonal: (personal: Personal[]) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
};

export type AppStore = AppState & AppActions;

export const defaultInitState: AppState = {
  email: '',
  fullAccess: false,
  hasInteracted: false,
  isLocked: true,
  isMobile: true,
  isOpen: false,
  theme: 'system',
  personal: [],
  skills: [],
  education: [],
  experience: [],
};

export const initAppStore = (
  education: Education[],
  experience: Experience[],
  personal: Personal[],
  skills: Skill[]
): AppState => {
  return {
    ...defaultInitState,
    education,
    experience,
    personal,
    skills,
  };
};

export const createAppStore = (initState: AppState = defaultInitState) => {
  return createStore<AppStore>()((set) => ({
    ...initState,
    setEmail: (email: string) => set({ email }),
    setFullAccess: (fullAccess: boolean) => set({ fullAccess }),
    setHasInteracted: (hasInteracted: boolean) => set({ hasInteracted }),
    setIsLocked: (isLocked: boolean) => set({ isLocked }),
    setIsMobile: (isMobile: boolean) => set({ isMobile }),
    setIsOpen: (isOpen: boolean) => set({ isOpen }),
    setPersonal: (personal: Personal[]) => set({ personal }),
    setTheme: (theme: 'light' | 'dark' | 'system') => set({ theme }),
  }));
};
