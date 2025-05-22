'use client';

import { InfoList, InfoListItem } from '@components/InfoList';
import { useQuery } from '@tanstack/react-query';
import { personalInfoOptions } from './queries';

export function PersonalInfo() {
  const { data } = useQuery(personalInfoOptions);

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
