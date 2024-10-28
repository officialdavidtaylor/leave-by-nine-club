import assert from 'assert';
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

assert(process.env.VITE_DB_FILE_NAME, 'DB_FILE_NAME is undefined');

export default defineConfig({
  out: './db/drizzle',
  schema: './db/schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.VITE_DB_FILE_NAME,
  },
});
