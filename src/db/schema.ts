import { boolean, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const experiences = pgTable('experiences', {
  id: serial('id').primaryKey(),
  company: varchar('company', { length: 255 }).notNull(),
  position: varchar('position', { length: 255 }).notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  period: varchar('period', { length: 255 }).notNull(),
  url: varchar('url', { length: 255 }).notNull(),
  techstack: text('techstack').array().notNull(),
  bullets: text('bullets').array().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const education = pgTable('education', {
  id: serial('id').primaryKey(),
  label: varchar('label', { length: 255 }).notNull(),
  footnote: text('footnote'),
  metaLabel: varchar('meta_label', { length: 255 }),
  metaValue: text('meta_value'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const skills = pgTable('skills', {
  id: serial('id').primaryKey(),
  category: varchar('category', { length: 255 }).notNull(),
  items: text('items').array().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const personal = pgTable('personal', {
  id: serial('id').primaryKey(),
  key: varchar('key', { length: 255 }).notNull(),
  value: text('value').notNull(),
  private: boolean('private').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const whitelist = pgTable('whitelist', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  hasAccess: boolean('has_access').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const metadata = pgTable('metadata', {
  id: serial('id').primaryKey(),
  key: varchar('key', { length: 255 }).notNull(),
  value: varchar('value', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const downloads = pgTable('downloads', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
