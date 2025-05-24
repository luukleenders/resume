import { createStore } from 'zustand';

import type { Education, Experience, Personal, Skill } from '@db/types';

export type AppState = {
  email: string;
  isLocked: boolean;
  isMobile: boolean;
  isOpen: boolean;
  personal: Personal[];
  skills: Skill[];
  education: Education[];
  experience: Experience[];
};

export type AppActions = {
  setEmail: (email: string) => void;
  setIsLocked: (isLocked: boolean) => void;
  setIsMobile: (isMobile: boolean) => void;
  setIsOpen: (isOpen: boolean) => void;
  setPersonal: (personal: Personal[]) => void;
};

export type AppStore = AppState & AppActions;

export const initAppStore = (
  skills: Skill[],
  education: Education[],
  experience: Experience[],
  personal: Personal[],
  session?: { name: string; value: string }
): AppState => {
  return {
    email: session?.value ?? '',
    isLocked: !session,
    isMobile: true,
    isOpen: false,
    personal,
    skills,
    education,
    experience,
  };
};

export const defaultInitState: AppState = {
  email: '',
  isLocked: true,
  isMobile: true,
  isOpen: false,
  personal: [],
  skills: [],
  education: [],
  experience: [],
};

export const createAppStore = (initState: AppState = defaultInitState) => {
  return createStore<AppStore>()((set) => ({
    ...initState,
    setEmail: (email: string) => set({ email }),
    setIsLocked: (isLocked: boolean) => set({ isLocked }),
    setIsMobile: (isMobile: boolean) => set({ isMobile }),
    setIsOpen: (isOpen: boolean) => set({ isOpen }),
    setPersonal: (personal: Personal[]) => set({ personal }),
  }));
};
