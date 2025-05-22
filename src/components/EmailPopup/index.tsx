import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { useDataStore } from '@store';
import { useEffect, useRef, useState } from 'react';

type EmailPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function EmailPopup({ isOpen, onClose }: EmailPopupProps) {
  const { setIsLocked, refetchData } = useDataStore();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const emailRef = useRef<HTMLInputElement>(null);

  const handleVerify = async () => {
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
        await refetchData();
        setIsLocked(false);
        onClose();
      } else {
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
    <Dialog open={isOpen} as='div' className='relative z-50 focus:outline-none' onClose={onClose}>
      <DialogBackdrop onClick={onClose} className='fixed inset-0 bg-black/30' />

      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4'>
          <DialogPanel
            transition
            className='w-full max-w-md rounded-xl bg-slate-100 px-6 py-4 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0'
          >
            <DialogTitle as='h3' className='mb-1 text-base/7 font-semibold text-slate-900'>
              Fill in your email to get mine.
            </DialogTitle>

            <div className='space-y-2'>
              <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full rounded-md border border-none bg-white p-2 text-slate-900'
                disabled={isLoading}
                ref={emailRef}
              />
              {error && <p className='text-sm text-red-500'>{error}</p>}
            </div>

            <div className='flex gap-2 pt-4'>
              <Button
                onClick={handleVerify}
                disabled={isLoading}
                className='inline-flex cursor-pointer items-center gap-2 rounded-md bg-slate-700 px-3 py-1.5 text-sm/6 font-semibold text-slate-100 shadow-inner shadow-white/10 focus:not-data-focus:outline-none disabled:opacity-50 data-focus:outline data-focus:outline-white data-hover:bg-slate-600 data-open:bg-slate-700'
              >
                {isLoading ? 'Verifying...' : 'Verify'}
              </Button>
              <Button
                onClick={onClose}
                disabled={isLoading}
                className='inline-flex cursor-pointer items-center gap-2 rounded-md bg-slate-200 px-3 py-1.5 text-sm/6 font-semibold text-slate-700 shadow-inner shadow-white/10 focus:not-data-focus:outline-none disabled:opacity-50 data-focus:outline data-focus:outline-white data-hover:bg-slate-200 data-open:bg-slate-200'
              >
                Cancel
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
