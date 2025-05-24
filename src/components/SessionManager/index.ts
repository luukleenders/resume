'use client';

import { useEffect } from 'react';

import type { Session } from '@db/types';
import { useAppStore } from '@provider';

export function SessionManager({ session }: { session: Session }) {
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
