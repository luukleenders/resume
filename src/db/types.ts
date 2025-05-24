import type { InferSelectModel } from 'drizzle-orm';

import type { education, experiences, metadata, personal, skills, whitelist } from './schema';

export type Education = Omit<InferSelectModel<typeof education>, 'createdAt' | 'updatedAt'>;
export type Experience = Omit<InferSelectModel<typeof experiences>, 'createdAt' | 'updatedAt'>;
export type Metadata = Omit<InferSelectModel<typeof metadata>, 'createdAt' | 'updatedAt'>;
export type Personal = Omit<InferSelectModel<typeof personal>, 'createdAt' | 'updatedAt'>;
export type Skill = Omit<InferSelectModel<typeof skills>, 'createdAt' | 'updatedAt'>;
export type Whitelist = Omit<InferSelectModel<typeof whitelist>, 'createdAt' | 'updatedAt'>;

export type Session = {
  email: string;
  fullAccess: boolean;
};
