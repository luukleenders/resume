'use client';

import classNames from 'classnames';

import { useAppStore } from '@provider';

import { ExperienceItem } from './ExperienceItem';

export function WorkExperience({ className }: { className?: string }) {
  const { experience } = useAppStore((state) => state);

  return (
    <section className={classNames('flex flex-col px-4 lg:px-8', className)}>
      <h2 className='title'>Work Experience</h2>

      <div className='flex flex-col gap-4'>
        {experience.map((item) => (
          <ExperienceItem key={item.company} {...item} />
        ))}
      </div>

      <div className='min-h-12' />
    </section>
  );
}
