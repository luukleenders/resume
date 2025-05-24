'use client';

import classNames from 'classnames';

import type { Experience } from '@db/types';

import { ExperienceItem } from './ExperienceItem';

export function WorkExperience({ className, data }: { className?: string; data: Experience[] }) {
  return (
    <div className={classNames('flex flex-col px-4 lg:px-8', className)}>
      <h2 className='mb-2 text-2xl font-bold text-slate-900'>Work Experience</h2>

      {data.map((item) => (
        <ExperienceItem key={item.company} {...item} />
      ))}

      <div className='min-h-12' />
    </div>
  );
}
