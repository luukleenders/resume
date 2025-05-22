'use client';

import { useEffect } from 'react';

import { useDataStore } from '@store';

interface SessionProps {
  session?: {
    name: string;
    value: string;
  };
}

export function SessionProvider({ session }: SessionProps) {
  const setIsLocked = useDataStore((state) => state.setIsLocked);

  useEffect(() => {
    setIsLocked(!session);
  }, [session, setIsLocked]);

  return null;
}
