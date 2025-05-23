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
  const { setEmail, setIsLocked } = useDataStore();

  useEffect(() => {
    setEmail(session?.value ?? '');
    setIsLocked(!session);
  }, [session, setEmail, setIsLocked]);

  return null;
}
