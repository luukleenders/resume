'use client';

import { useCallback, useState } from 'react';
import { Download, LockKeyhole, LockKeyholeOpen } from 'lucide-react';

import { EmailPopup } from '@components/EmailPopup';
import { InfoListItem } from '@components/InfoList';
import { useAppStore } from '@provider';

export function Personal() {
  const [isOpen, setIsOpen] = useState(false);
  const { personal, isLocked, email, pdfUrl, setFullAccess, setIsLocked } = useAppStore(
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
        setFullAccess(data.fullAccess);
        setIsLocked(false);
      } else {
        setIsOpen(true);
      }
    } catch (error) {
      console.error(error);
    }
  }, [isLocked, email, setFullAccess, setIsLocked, setIsOpen]);

  return (
    <div>
      <div className='relative flex flex-row items-center justify-between'>
        <h2 className='title'>Personal</h2>

        <div className='relative -top-1 flex flex-row items-center gap-4'>
          {pdfUrl && (
            <a href={pdfUrl} download='LuukLeenders-resume_en_2025.pdf'>
              <Download stroke='#0f172b' />
            </a>
          )}

          <button onClick={handleLock} className='cursor-pointer'>
            {isLocked ? <LockKeyhole stroke='#0f172b' /> : <LockKeyholeOpen stroke='#0f172b' />}
          </button>
        </div>
      </div>

      {personal.map((item) => (
        <InfoListItem
          key={item.key}
          label={item.key}
          value={Array.isArray(item.value) ? item.value.join(', ') : item.value}
          isPrivate={item.private}
        />
      ))}

      <EmailPopup isOpen={isOpen} onClose={handleClose} />
    </div>
  );
}
