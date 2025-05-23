'use client';

import { InfoList, InfoListItem } from '@components/InfoList';
import { Personal } from '@db/types';
import { useDataStore } from '@store';

export function PersonalInfo({ data }: { data: Personal[] }) {
  const { personal } = useDataStore();

  return (
    <InfoList title='Personal'>
      {personal.length === 0
        ? data?.map((item) => (
            <InfoListItem
              key={item.key}
              label={item.key}
              value={Array.isArray(item.value) ? item.value.join(', ') : item.value}
              isPrivate={item.private}
            />
          ))
        : personal.map((item) => (
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
