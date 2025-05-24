'use client';

import { InfoList, InfoListItem } from '@components/InfoList';
import { useAppStore } from '@provider';

export function Personal() {
  const { personal } = useAppStore((state) => state);

  return (
    <InfoList title='Personal'>
      {personal.map((item) => (
        <InfoListItem
          key={item.key}
          label={item.key}
          value={Array.isArray(item.value) ? item.value.join(', ') : item.value}
          isPrivate={item.private}
        />
      ))}
    </InfoList>
  );
}
