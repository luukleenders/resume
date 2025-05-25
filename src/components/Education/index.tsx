'use client';

import { InfoListItem } from '@components/InfoList';
import { useAppStore } from '@provider';

export function Education() {
  const { education } = useAppStore((state) => state);

  return (
    <section>
      <h2 className='title'>Education</h2>

      <div className='flex flex-col gap-1'>
        {education.map((item) => (
          <InfoListItem
            key={item.label}
            label={item.label}
            footnote={item.footnote}
            metaLabel={item.metaLabel}
            metaValue={item.metaValue}
          />
        ))}
      </div>
    </section>
  );
}
