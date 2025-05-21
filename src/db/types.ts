import { InferSelectModel } from 'drizzle-orm';
import { education, experiences, personal, skills } from './schema';

export type Personal = InferSelectModel<typeof personal>;
export type Education = InferSelectModel<typeof education>;
export type Experience = InferSelectModel<typeof experiences>;
export type Skill = InferSelectModel<typeof skills>;
