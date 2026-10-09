import 'dotenv/config';
import {drizzle} from 'drizzle-orm/postgres-js'
import * as schema from './schema.js'

if(!process.env.DATABASE_URL){
  throw new Error('DATABASE_URL environment variable is missing in api/.env');
}

const db = drizzle(process.env.DATABASE_URL);