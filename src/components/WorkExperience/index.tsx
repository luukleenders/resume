'use client';

import classNames from 'classnames';

import { useAppStore } from '@provider';

import { ExperienceItem } from './ExperienceItem';

export function WorkExperience({ className }: { className?: string }) {
  const { experience } = useAppStore((state) => state);

  return (
    <div className={classNames('flex flex-col px-4 lg:px-8', className)}>
      <h2 className='mb-2 text-2xl font-bold text-slate-900'>Work Experience</h2>

      {experience.map((item) => (
        <ExperienceItem key={item.company} {...item} />
      ))}

      <div className='min-h-12' />
    </div>
  );
}
