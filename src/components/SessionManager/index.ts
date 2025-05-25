'use client';

import { useEffect } from 'react';

import type { Session } from '@db/types';
import { useAppStore } from '@provider';

interface SessionManagerProps {
  session: Session;
}

export function SessionManager({ session }: SessionManagerProps) {
  const { setEmail, setFullAccess, setIsLocked } = useAppStore((state) => state);
  const { email, fullAccess } = session;

  useEffect(() => {
    if (email) {
      setEmail(email);
      setIsLocked(false);
    }

    if (fullAccess) {
      setFullAccess(fullAccess);
    }
  }, [email, fullAccess, setEmail, setFullAccess, setIsLocked]);

  return null;
}
