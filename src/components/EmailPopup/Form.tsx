import { useEffect, useRef, useState } from 'react';
import { Button } from '@headlessui/react';

import { getData } from '@db/getData';
import type { Personal } from '@db/types';
import { useAppStore } from '@provider';

type FormProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function Form({ isOpen, onClose }: FormProps) {
  const { email, setEmail, setFullAccess, setIsLocked, setPersonal } = useAppStore(
    (state) => state
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const emailRef = useRef<HTMLInputElement>(null);

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter an email address');
      return;
    }

    setIsLoading(true);
    setError('');

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
        const personal = await getData<Personal[]>('personal', {
          email: true,
          phone: data.fullAccess,
        });

        setEmail(email);
        setFullAccess(data.fullAccess);
        setPersonal(personal);
        setIsLocked(false);
        onClose();
      } else {
        setEmail('');
        setIsLocked(true);
        setError('Email not found in whitelist');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen && emailRef.current) return;

    const countdown = setTimeout(() => {
      if (emailRef.current) {
        emailRef.current.focus();
      }
    }, 100);

    return () => clearTimeout(countdown);
  }, [isOpen, emailRef]);

  return (
    <form onSubmit={handleVerify}>
      <div className='relative'>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='mb-4 w-full rounded-md border border-none bg-white p-2 text-slate-900'
          disabled={isLoading}
          ref={emailRef}
        />
        {error && <p className='absolute -bottom-1 left-0 text-xs text-red-500'>{error}</p>}
      </div>

      <div className='flex gap-2 pt-4'>
        <Button
          type='submit'
          disabled={isLoading}
          className='inline-flex cursor-pointer items-center gap-2 rounded-md bg-slate-700 px-3 py-1.5 text-sm/6 font-semibold text-slate-100 shadow-inner shadow-white/10 focus:not-data-focus:outline-none disabled:opacity-50 data-focus:outline data-focus:outline-white data-hover:bg-slate-600 data-open:bg-slate-700'
        >
          {isLoading ? 'Hold on...' : 'Submit'}
        </Button>
        <Button
          onClick={onClose}
          disabled={isLoading}
          className='inline-flex cursor-pointer items-center gap-2 rounded-md bg-slate-200 px-3 py-1.5 text-sm/6 font-semibold text-slate-700 shadow-inner shadow-white/10 focus:not-data-focus:outline-none disabled:opacity-50 data-focus:outline data-focus:outline-white data-hover:bg-slate-200 data-open:bg-slate-200'
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
