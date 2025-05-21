import classNames from 'classnames';
import { SquareArrowOutUpRight } from 'lucide-react';
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
  const [isLink, setIsLink] = useState<boolean>(false);

  const labelClassName = classNames('text-base font-semibold text-slate-900', {
    '-mb-1': !metaLabel || (metaLabel && footnote),
  });

  useEffect(() => {
    if (Array.isArray(value)) {
      setText(value.join(', '));
    } else if (value) {
      setText(value);
    }

    if (value && value.includes('https')) {
      setIsLink(true);
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
      {text && !isLink && <p className='text-base text-slate-500'>{text}</p>}
      {text && isLink && (
        <a
          href={text}
          target='_blank'
          rel='noopener noreferrer'
          className='relative block w-fit text-base text-slate-500 after:-bottom-px after:left-0 after:block after:h-px after:w-full after:bg-slate-500 after:opacity-0 after:transition-opacity after:content-[""] hover:after:opacity-100'
        >
          <SquareArrowOutUpRight width={12} height={12} className='absolute top-[7px] -left-4' />
          {text.replace('https://', '')}
        </a>
      )}
      {footnote && <p className='text-xs text-slate-500'>{footnote}</p>}
    </div>
  );
}
