import type { PropsWithChildren } from 'react';

type ExperienceItemProps = {
  company: string;
  position: string;
  location: string;
  period: string;
  url: string;
  techstack: string[];
  bullets: string[];
};

export function Experience({ children }: PropsWithChildren) {
  return (
    <div>
      <h2 className='mb-2 text-2xl font-bold text-slate-900'>Work Experience</h2>
      {children}
    </div>
  );
}

export function ExperienceItem({
  company,
  position,
  location,
  period,
  url,
  techstack,
  bullets,
}: ExperienceItemProps) {
  return (
    <div className='relative mb-4'>
      <div className='-mb-1 text-xs font-bold text-slate-400'>
        &#9673; {period} |{' '}
        <span className='font-base'>
          {location} - {url}
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
