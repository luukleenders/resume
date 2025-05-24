'use client';

import { InfoListItem } from '@components/InfoList';
import { useAppStore } from '@provider';

export function Skills() {
  const { skills } = useAppStore((state) => state);

  return (
    <div>
      <h2 className='title'>Skills</h2>

      {skills.map((skill) => (
        <InfoListItem key={skill.category} label={skill.category} value={skill.items.join(', ')} />
      ))}
    </div>
  );
}
