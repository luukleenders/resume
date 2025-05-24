'use client';

import { useEffect } from 'react';

import type { Session } from '@db/types';
import { useAppStore } from '@provider';

interface SessionManagerProps {
  session: Session;
}

export function SessionManager({ session }: SessionManagerProps) {
  const { setEmail, setFullAccess, setIsLocked, setPdfUrl } = useAppStore((state) => state);
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

  useEffect(() => {
    const fetchPdfUrl = async () => {
      const response = await fetch(`/api/pdf?includeEmail=${!!email}&includePhone=${fullAccess}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      setPdfUrl(url);
    };

    fetchPdfUrl();
  }, [email, fullAccess, setPdfUrl]);

  return null;
}
