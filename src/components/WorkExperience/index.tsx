'use client';

import type { Experience } from '@db/types';

import { ExperienceItem } from './ExperienceItem';

export function WorkExperience({ data }: { data: Experience[] }) {
  return (
    <div className='z-10 -mt-[150px] flex flex-col overflow-y-auto px-4 pt-[150px] [scrollbar-width:none] lg:px-8 [&::-webkit-scrollbar]:hidden'>
      <h2 className='mb-2 text-2xl font-bold text-slate-900'>Work Experience</h2>

      {data.map((item) => (
        <ExperienceItem key={item.company} {...item} />
      ))}

      <div className='min-h-12' />
    </div>
  );
}
