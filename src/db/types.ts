import { InferSelectModel } from 'drizzle-orm';
import { education, experiences, personal, skills } from './schema';

export type Personal = Omit<InferSelectModel<typeof personal>, 'createdAt' | 'updatedAt'>;
export type Education = Omit<InferSelectModel<typeof education>, 'createdAt' | 'updatedAt'>;
export type Experience = Omit<InferSelectModel<typeof experiences>, 'createdAt' | 'updatedAt'>;
export type Skill = Omit<InferSelectModel<typeof skills>, 'createdAt' | 'updatedAt'>;
