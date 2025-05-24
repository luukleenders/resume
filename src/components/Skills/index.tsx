'use client';

import { InfoList, InfoListItem } from '@components/InfoList';
import { useAppStore } from '@provider';

export function Skills() {
  const { skills } = useAppStore((state) => state);

  return (
    <InfoList title='Skills'>
      {skills.map((skill) => (
        <InfoListItem key={skill.category} label={skill.category} value={skill.items.join(', ')} />
      ))}
    </InfoList>
  );
}
