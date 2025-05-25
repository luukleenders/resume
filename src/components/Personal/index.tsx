'use client';

import { useCallback, useEffect, useState } from 'react';
import { Download, LockKeyhole, LockKeyholeOpen } from 'lucide-react';
import { useTheme } from 'next-themes';

import { EmailPopup } from '@components/EmailPopup';
import { InfoListItem } from '@components/InfoList';
import { getData } from '@db/getData';
import type { Personal as PersonalType } from '@db/types';
import { useAppStore } from '@provider';

export function Personal() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  const { personal, isLocked, email, setFullAccess, setIsLocked, setPersonal } = useAppStore(
    (state) => state
  );

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleLock = useCallback(async () => {
    if (!isLocked) {
      setIsLocked(true);
      return;
    }

    if (!email) {
      setIsOpen(true);
      return;
    }

    try {
      const response = await fetch('/api/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to verify email');
      }

      if (data.isWhitelisted) {
        const session = { email, fullAccess: data.fullAccess };
        const personal = await getData<PersonalType[]>('personal', session);

        setPersonal(personal);
        setFullAccess(data.fullAccess);
        setIsLocked(false);
      } else {
        setIsOpen(true);
      }
    } catch (error) {
      console.error(error);
    }
  }, [isLocked, email, setFullAccess, setIsLocked, setIsOpen, setPersonal]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section>
      <div className='relative flex flex-row items-center justify-between'>
        <h2 className='title'>Personal</h2>

        {mounted && (
          <div className='relative -top-1 flex flex-row items-center gap-4'>
            <a
              href='/LuukLeenders-Resume_en_2025.pdf'
              aria-label='Download resume'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Download stroke={theme === 'dark' ? '#f8fafc' : '#0f172b'} />
            </a>

            <button
              onClick={handleLock}
              className='cursor-pointer'
              aria-label='Toggle lock'
              aria-pressed={isLocked}
              aria-controls='lock'
            >
              {isLocked ? (
                <LockKeyhole stroke={theme === 'dark' ? '#f8fafc' : '#0f172b'} />
              ) : (
                <LockKeyholeOpen stroke={theme === 'dark' ? '#f8fafc' : '#0f172b'} />
              )}
            </button>
          </div>
        )}
      </div>

      <div className='flex flex-col gap-1'>
        {personal.map((item) => (
          <InfoListItem
            key={item.key}
            label={item.key}
            value={Array.isArray(item.value) ? item.value.join(', ') : item.value}
            isPrivate={item.private}
          />
        ))}
      </div>

      <EmailPopup isOpen={isOpen} onClose={handleClose} />
    </section>
  );
}
