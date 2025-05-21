import './envConfig';

import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.PGHOST!,
    database: process.env.PGDATABASE!,
    user: process.env.PGUSER!,
    password: process.env.PGPASSWORD!,
  },
});
