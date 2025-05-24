'use client';

import { createContext, type ReactNode, useContext, useRef } from 'react';
import { useStore } from 'zustand';

import type { Education, Personal } from '@db/types';
import type { Experience } from '@db/types';
import type { Skill } from '@db/types';
import { type AppStore, createAppStore, initAppStore } from '@store';

export type AppStoreApi = ReturnType<typeof createAppStore>;

export const AppStoreContext = createContext<AppStoreApi | undefined>(undefined);

export interface AppStoreProviderProps {
  children: ReactNode;
  skills: Skill[];
  education: Education[];
  experience: Experience[];
  personal: Personal[];
  session?: {
    name: string;
    value: string;
  };
}

export function AppStoreProvider({
  children,
  skills,
  education,
  experience,
  personal,
  session,
}: AppStoreProviderProps) {
  const storeRef = useRef<AppStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createAppStore(
      initAppStore(skills, education, experience, personal, session)
    );
  }

  return <AppStoreContext.Provider value={storeRef.current}>{children}</AppStoreContext.Provider>;
}

export const useAppStore = <T,>(selector: (store: AppStore) => T): T => {
  const appStoreContext = useContext(AppStoreContext);

  if (!appStoreContext) {
    throw new Error(`useAppStore must be used within AppStoreProvider`);
  }

  return useStore(appStoreContext, selector);
};
