'use client';

import { InfoListItem } from '@components/InfoList';
import { useAppStore } from '@provider';

export function Skills() {
  const { skills } = useAppStore((state) => state);

  return (
    <section>
      <h2 className='title'>Skills</h2>

      <div className='flex flex-col gap-1'>
        {skills.map((skill) => (
          <InfoListItem
            key={skill.category}
            label={skill.category}
            value={skill.items.join(', ')}
          />
        ))}
      </div>
    </section>
  );
}
