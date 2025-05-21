import classNames from 'classnames';
import { useEffect, useState, type PropsWithChildren } from 'react';

type InfoListProps = PropsWithChildren<{
  className?: string;
  title: string;
}>;

type InfoListItemProps = {
  label: string;
  value?: string | string[];
  footnote?: string | null;
  metaLabel?: string | null;
  metaValue?: string | null;
};

export function InfoList({ children, title }: InfoListProps) {
  return (
    <div className='mb-4'>
      <h2 className='mb-1 text-2xl font-bold text-slate-900'>{title}</h2>
      {children}
    </div>
  );
}

export function InfoListItem({ label, value, metaLabel, metaValue, footnote }: InfoListItemProps) {
  const [text, setText] = useState<string>('');

  const labelClassName = classNames('text-base font-semibold text-slate-900', {
    '-mb-1': !metaLabel || (metaLabel && footnote),
  });

  useEffect(() => {
    if (Array.isArray(value)) {
      setText(value.join(', '));
    } else if (value) {
      setText(value);
    }
  }, [value]);

  return (
    <div className='relative mb-1'>
      {metaLabel && metaValue && (
        <p className='relative -bottom-1 text-xs text-slate-500'>
          <span className='font-semibold text-slate-900'>{metaLabel} | </span>
          {metaValue}
        </p>
      )}
      <p className={labelClassName}>{label}</p>
      {text && <p className='text-base text-slate-500'>{text}</p>}
      {footnote && <p className='text-xs text-slate-500'>{footnote}</p>}
    </div>
  );
}
