'use client';

import { useMemo } from 'react';
import classNames from 'classnames';
import { SquareArrowOutUpRight } from 'lucide-react';

import { useAppStore } from '@provider';

type InfoListItemProps = {
  label: string;
  value?: string;
  footnote?: string | null;
  metaLabel?: string | null;
  metaValue?: string | null;
  isPrivate?: boolean;
};

export function InfoListItem({
  label,
  value,
  metaLabel,
  metaValue,
  footnote,
  isPrivate,
}: InfoListItemProps) {
  const { fullAccess, isLocked } = useAppStore((state) => state);
  const isLink = useMemo<boolean>(() => value?.includes('https') ?? false, [value]);

  const labelClassName = classNames('text-base font-semibold text-slate-900 dark:text-slate-50', {
    '-mb-1': !metaLabel || (metaLabel && footnote),
  });

  const privateClassName = classNames(
    'overflow-visible text-base text-slate-500 transition-all dark:text-slate-400',
    {
      'blur-sm': (isPrivate && isLocked) || (label === 'Phone' && !fullAccess),
      'blur-none': !isPrivate || !isLocked,
    }
  );

  return (
    <div className='relative mb-1'>
      {metaLabel && metaValue && (
        <p className='relative -bottom-1 text-xs text-slate-500 dark:text-slate-400'>
          <span className='font-semibold text-slate-900 dark:text-slate-50'>{metaLabel} | </span>
          {metaValue}
        </p>
      )}

      <p className={labelClassName}>{label}</p>

      {!isLink && label !== 'E-mail' && label !== 'Phone' && (
        <p className={privateClassName}>{value}</p>
      )}

      {label === 'E-mail' &&
        (!isLocked ? (
          <a href={`mailto:${value}`} className={privateClassName}>
            {value}
          </a>
        ) : (
          <p className={privateClassName}>{value}</p>
        ))}

      {label === 'Phone' &&
        (fullAccess ? (
          <a href={`tel:${value}`} className={privateClassName}>
            {value}
          </a>
        ) : (
          <p className={privateClassName}>{value}</p>
        ))}

      {isLink && (
        <a
          href={value}
          target='_blank'
          rel='noopener noreferrer'
          className='relative block w-fit text-base text-slate-500 after:-bottom-px after:left-0 after:block after:h-px after:w-full after:bg-slate-500 after:opacity-0 after:transition-opacity after:content-[""] hover:after:opacity-100 dark:text-slate-400 dark:after:bg-slate-400'
        >
          {value?.replace('https://', '')}
          <SquareArrowOutUpRight width={12} height={12} className='absolute top-[7px] -right-4' />
        </a>
      )}

      {footnote && <p className='text-xs text-slate-500 dark:text-slate-400'>{footnote}</p>}
    </div>
  );
}
