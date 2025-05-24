'use client';

import { InfoList, InfoListItem } from '@components/InfoList';
import { useAppStore } from '@provider';

export function Education() {
  const { education } = useAppStore((state) => state);

  return (
    <InfoList title='Education'>
      {education.map((item) => (
        <InfoListItem
          key={item.label}
          label={item.label}
          footnote={item.footnote}
          metaLabel={item.metaLabel}
          metaValue={item.metaValue}
        />
      ))}
    </InfoList>
  );
}
