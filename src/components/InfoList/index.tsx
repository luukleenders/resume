'use client';

import { type PropsWithChildren, useCallback, useMemo, useState } from 'react';
import classNames from 'classnames';
import { LockKeyhole, LockKeyholeOpen, SquareArrowOutUpRight } from 'lucide-react';

import { EmailPopup } from '@components/EmailPopup';
import { useDataStore } from '@store';

type InfoListProps = PropsWithChildren<{
  className?: string;
  title: string;
}>;

type InfoListItemProps = {
  label: string;
  value?: string;
  footnote?: string | null;
  metaLabel?: string | null;
  metaValue?: string | null;
  isPrivate?: boolean;
};

export function InfoList({ children, title }: InfoListProps) {
  const { isLocked, email, setIsLocked } = useDataStore();
  const [isOpen, setIsOpen] = useState(false);

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
        setIsLocked(false);
      } else {
        setIsOpen(true);
      }
    } catch (error) {
      console.error(error);
    }
  }, [isLocked, email, setIsLocked, setIsOpen]);

  return (
    <div className='mb-4 px-4 lg:px-8'>
      <div className='relative flex flex-row items-center justify-between'>
        <h2 className='mb-1 text-2xl font-bold text-slate-900'>{title}</h2>

        {title === 'Personal' && (
          <button onClick={handleLock} className='relative -top-1 cursor-pointer fill-slate-600'>
            {isLocked ? <LockKeyhole /> : <LockKeyholeOpen />}
          </button>
        )}
      </div>
      {children}
      <EmailPopup isOpen={isOpen} onClose={handleClose} />
    </div>
  );
}

export function InfoListItem({
  label,
  value,
  metaLabel,
  metaValue,
  footnote,
  isPrivate,
}: InfoListItemProps) {
  const { isLocked } = useDataStore();
  const isLink = useMemo<boolean>(() => value?.includes('https') ?? false, [value]);

  const labelClassName = classNames('text-base font-semibold text-slate-900', {
    '-mb-1': !metaLabel || (metaLabel && footnote),
  });

  const privateClassName = classNames('text-base text-slate-500 transition-all', {
    'blur-sm': isPrivate && isLocked,
    'blur-none': !isPrivate || !isLocked,
  });

  return (
    <div className='relative mb-1'>
      {metaLabel && metaValue && (
        <p className='relative -bottom-1 text-xs text-slate-500'>
          <span className='font-semibold text-slate-900'>{metaLabel} | </span>
          {metaValue}
        </p>
      )}

      <p className={labelClassName}>{label}</p>

      {!isLink ? (
        <p className={privateClassName}>
          {isPrivate && !value ? 'Lorem ipsum dolor sit amet' : value}
        </p>
      ) : (
        <a
          href={value}
          target='_blank'
          rel='noopener noreferrer'
          className='relative block w-fit text-base text-slate-500 after:-bottom-px after:left-0 after:block after:h-px after:w-full after:bg-slate-500 after:opacity-0 after:transition-opacity after:content-[""] hover:after:opacity-100'
        >
          {value?.replace('https://', '')}
          <SquareArrowOutUpRight width={12} height={12} className='absolute top-[7px] -right-4' />
        </a>
      )}

      {footnote && <p className='text-xs text-slate-500'>{footnote}</p>}
    </div>
  );
}
