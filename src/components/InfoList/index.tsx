import classNames from 'classnames';
import type { PropsWithChildren } from 'react';

type InfoListProps = PropsWithChildren<{
  className?: string;
  title: string;
}>;

type InfoListItemProps = {
  label: string;
  value?: string;
  footnote?: string;
  meta?: {
    label: string;
    value: string;
  };
};

export function InfoList({ children, title }: InfoListProps) {
  return (
    <div className='mb-4'>
      <h2 className='mb-1 text-2xl font-bold text-slate-900'>{title}</h2>
      {children}
    </div>
  );
}

export function InfoListItem({ label, value, meta, footnote }: InfoListItemProps) {
  const labelClassName = classNames('text-base font-semibold text-slate-900', {
    '-mb-1': !meta || (meta && footnote),
  });

  return (
    <div className='relative mb-1'>
      {meta && (
        <p className='relative -bottom-1 text-xs text-slate-500'>
          <span className='font-semibold text-slate-900'>{meta.label} | </span>
          {meta.value}
        </p>
      )}
      <p className={labelClassName}>{label}</p>
      {value && <p className='text-base text-slate-500'>{value}</p>}
      {footnote && <p className='text-xs text-slate-500'>{footnote}</p>}
    </div>
  );
}
