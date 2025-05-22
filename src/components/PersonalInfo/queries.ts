import { queryOptions } from '@tanstack/react-query';

import { Personal } from '@db/types';
import { useDataStore } from '@store';

export const personalInfoOptions = queryOptions({
  queryKey: ['personalInfo'],
  queryFn: async () => {
    const { isLocked } = useDataStore.getState();
    const response = await fetch(`/api/personal?includePrivate=${!isLocked}`);

    if (!response.ok) {
      throw new Error('Failed to fetch personal info');
    }

    return response.json() as Promise<Personal[]>;
  },
});
