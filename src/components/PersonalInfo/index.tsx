'use client';

import { InfoList, InfoListItem } from '@components/InfoList';
import { Personal } from '@db/types';

export function PersonalInfo({ data }: { data: Personal[] }) {
  return (
    <InfoList title='Personal'>
      {data?.map((item) => (
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
