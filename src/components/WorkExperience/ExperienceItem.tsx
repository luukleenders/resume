'use client';

import { SquareArrowOutUpRight } from 'lucide-react';
import { useState } from 'react';

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
  const [isLink] = useState<boolean>(url?.includes('https') ?? false);

  return (
    <div className='relative mb-4'>
      <div className='-mb-1 text-xs font-bold text-slate-400'>
        &#9673; {period} |{' '}
        <span className='font-base'>
          {location} -{' '}
          {isLink ? (
            <a
              href={url}
              target='_blank'
              rel='noopener noreferrer'
              className='relative inline-block w-fit after:-bottom-px after:left-0 after:block after:h-px after:w-full after:bg-slate-400 after:opacity-0 after:transition-opacity after:content-[""] hover:after:opacity-100'
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

      <div className='-mb-1 text-2xl font-semibold text-slate-900'>
        {position} @ {company}
      </div>

      <div className='text-base text-slate-900'>
        <span className='font-semibold'>Tech Stack:</span> {techstack.join(', ')}
      </div>

      <ul className='list-disc pl-4 text-base text-slate-900'>
        {bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </div>
  );
}
