'use client';

import { InfoList, InfoListItem } from '@components/InfoList';
import { useDataStore } from '@store';
import { useEffect } from 'react';
import type { Personal } from '@db/types';

type PersonalInfoProps = {
  initialData: Personal[];
};

export function PersonalInfo({ initialData }: PersonalInfoProps) {
  const { personalData, setPersonalData } = useDataStore();

  useEffect(() => {
    if (personalData.length === 0) {
      setPersonalData(initialData);
    }
  }, [initialData, personalData.length, setPersonalData]);

  return (
    <InfoList title='Personal'>
      {personalData.length > 0 &&
        personalData.map((item) => (
          <InfoListItem
            key={item.key}
            label={item.key}
            value={item.value}
            isPrivate={item.private}
          />
        ))}
    </InfoList>
  );
}
