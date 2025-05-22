import { InferSelectModel } from 'drizzle-orm';
import { education, experiences, personal, skills, whitelist } from './schema';

export type Education = Omit<InferSelectModel<typeof education>, 'createdAt' | 'updatedAt'>;
export type Experience = Omit<InferSelectModel<typeof experiences>, 'createdAt' | 'updatedAt'>;
export type Personal = Omit<InferSelectModel<typeof personal>, 'createdAt' | 'updatedAt'>;
export type Skill = Omit<InferSelectModel<typeof skills>, 'createdAt' | 'updatedAt'>;
export type Whitelist = Omit<InferSelectModel<typeof whitelist>, 'createdAt' | 'updatedAt'>;
