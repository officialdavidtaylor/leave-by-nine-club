import assert from 'assert';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql/node';

assert(process.env.VITE_DB_FILE_NAME, 'VITE_DB_FILE_NAME is undefined');

export const db = drizzle(process.env.VITE_DB_FILE_NAME);
