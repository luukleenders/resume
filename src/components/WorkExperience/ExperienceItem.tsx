'use client';

import { useMemo } from 'react';
import { SquareArrowOutUpRight } from 'lucide-react';

type ExperienceItemProps = {
  company: string;
  position: string;
  location: string;
  period: string;
  url: string;
  techstack: string[];
  bullets: string[];
};

export function ExperienceItem({
  company,
  position,
  location,
  period,
  url,
  techstack,
  bullets,
}: ExperienceItemProps) {
  const isLink = useMemo<boolean>(() => url?.includes('https') ?? false, [url]);

  return (
    <div className='relative mb-4'>
      <div className='-mb-1 text-xs font-semibold text-slate-400 dark:text-slate-500'>
        &#9673; {period} |{' '}
        <span className='font-base'>
          {location} -{' '}
          {isLink ? (
            <a
              href={url}
              target='_blank'
              rel='noopener noreferrer'
              className='relative inline-block w-fit after:-bottom-px after:left-0 after:block after:h-px after:w-full after:bg-slate-400 after:opacity-0 after:transition-opacity after:content-[""] hover:after:opacity-100 dark:after:bg-slate-500'
            >
              {url.replace('https://', '')}
              <SquareArrowOutUpRight
                width={10}
                height={10}
                className='absolute top-[2.5px] -right-[14px]'
              />
            </a>
          ) : (
            url
          )}
        </span>
      </div>

      <div className='mt-1 -mb-1 text-2xl leading-none font-semibold text-slate-900 dark:text-slate-50'>
        {position} @ {company}
      </div>

      <div className='text-base font-light text-slate-900 dark:text-slate-50'>
        <span className='font-semibold'>Tech Stack:</span> {techstack.join(', ')}
      </div>

      <ul className='list-disc pl-4 text-base font-light text-slate-900 dark:text-slate-50'>
        {bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </div>
  );
}
